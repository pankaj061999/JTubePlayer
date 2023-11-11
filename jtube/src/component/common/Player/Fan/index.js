import { Box, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import {
  setMiniPlayer,
  setPlayerProps,
  setVideoDetails,
} from "src/redux/slices/player";
import VideoJS from "../lib/VideoJs";
import PlayerPlaceholder from "../lib/components/PlayerPlaceholder";
import styles from "./styles";

const hideChildrenForTradeView = "CustomNextButton";
const hidePluginForTradeView = "upNext";

const defaultFanPlayerProps = {
  controls: true,
  playsinline: true,
  muted: false,
  controlBar: {
    CustomPlayToggle: {
      replay: true,
    },
    CustomVolumePanel: {
      inline: false,
    },
    currentTimeDisplay: true,
    TimeDivider: true,
    DurationDisplay: true,
    settingsMenuButton: {
      entries: ["CustomLoopButton"],
    },
    children: [
      // "customPreviousButton",
      "CustomPlayToggle",
      "CustomNextButton",
      // "CustomForwardButton",
      "currentTimeDisplay",
      "durationDisplay",
      "progressControl",
      "liveDisplay",
      "remainingTimeDisplay",
      "customControlSpacer",
      "chaptersButton",
      "CustomVolumePanel",
      "CustomFullScreenToggle",
      "settingsMenuButton",
      "CustomQualityButton",
    ],
  },
  playbackRates: [0.5, 1, 1.5, 2],
  loop: false,
  preload: "auto",
  fluid: true,
  aspectRatio: "16:9",
  responsive: true,
  html5: {
    vhs: {
      overrideNative: true,
      enableLowInitialPlaylist: true,
      useBandwidthFromLocalStorage: true,
      useDevicePixelRatio: true,
    },
  },
  plugins: {
    autoPlayPlugin: { startAfter: 10, autoPlayOptions: "any" },
    miniPlayerOverlay: {},
    chapters: {
      chapterType: "progressbar",
      chapters: [
        // { label: "20%", percentage: "20", withoutCoin: true },
        { label: "50%", percentage: "50", withCoinFlyAnimation: true },
        { label: "85%", percentage: "85", withCoinFlyAnimation: true },
      ],
      progressType: "percentage",
      withCoinFlyAnimation: {
        chapterType: {
          50: {
            times: 2,
            stepAfter: 500,
          },
          85: {
            times: 3,
            stepAfter: 500,
          },
        },
      },
    },
    analytics: {
      events: ["ended", "interval", "start"],
      interval: { secondsToCall: 5, strict: true, label: "5" },
    },
    hotkeys: {
      volumeStep: 0.1,
      seekStep: 10,
      enableMute: true,
      enableVolumeScroll: true,
      enableHoverScroll: true,
      enableNumbers: false,
      enableModifiersForNumbers: false,
    },
    mutedOverlayPlugin: {},
    upNext: { time: 5 },
  },
};

const customComponents = ["CustomMiniPlayerController"];

const FanPlayer = ({
  playerProps,
  videoDetails,
  miniPlayerBottomSlotComponent,
  customStyles = { miniFanPlayer: {} },
  handlePlayerPlaying,
  handlePlayerPause,
  handlePlayerDispose,
  handleChapterComplete,
  handleVideoEnded,
  handlePlayerIntervalEvent,
  handleSignUpIntervention,
  handleVideoStart,
  handlePlayerNextVideo,
  handlePlayerUpNextVideo,
}) => {
  const playerRef = useRef(null);

  const [videoJsOptions, setVideoJsOptions] = useState(null);
  const [player, setPlayer] = useState(null);
  const [isBottomSlotVisible, setIsBottomSlotVisible] = useState(false);
  const [playerHeight, setPlayerHeight] = useState(null);
  const isMobile = useMediaQuery("(max-width:768px)");

  const dispatch = useDispatch();

  const {
    fanTvPlayer: { isMiniPlayer },
    appMiniPlayer: { currentTime },
  } = useSelector((state) => state.player);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (playerProps) {
      if (playerProps.muted) {
        const index = defaultFanPlayerProps.controlBar.children.indexOf(
          hideChildrenForTradeView
        );
        const copyFanPlayerProps = {
          ...defaultFanPlayerProps,
          controlBar: {
            ...defaultFanPlayerProps.controlBar,
            children: [...defaultFanPlayerProps.controlBar.children],
          },
          plugins: {
            ...defaultFanPlayerProps.plugins,
          },
        };
        delete copyFanPlayerProps.plugins[hidePluginForTradeView];
        copyFanPlayerProps.controlBar.children.splice(index, 1);
        setVideoJsOptions({
          ...copyFanPlayerProps,
          currentTime,
          ...playerProps,
        });
      } else {
        setVideoJsOptions({
          ...defaultFanPlayerProps,
          currentTime,
          ...playerProps,
        });
      }
    }
  }, [currentTime, playerProps]);

  useEffect(() => {
    if (videoDetails && playerProps) {
      dispatch(setVideoDetails(videoDetails));
      dispatch(setPlayerProps(playerProps));
    }
  }, [dispatch, videoDetails, playerProps]);

  useEffect(() => {
    if (!!playerRef.current && !!player) {
      const el = document.getElementById("fan-player");

      if (!isMobile) {
        if (!inView) {
          el.classList.add("fan-mini-player");
          setIsBottomSlotVisible(true);
          dispatch(setMiniPlayer(true));
        } else if (inView) {
          el.classList.remove("fan-mini-player");
          setIsBottomSlotVisible(false);
          dispatch(setMiniPlayer(false));
        }
      } else if (playerRef.current && player && player.paused()) {
        const el = document.getElementById("fan-player");
        el.classList.remove("fan-mini-player");
        setIsBottomSlotVisible(false);
        dispatch(setMiniPlayer(false));
      }
    }
  }, [inView, player, dispatch, isMobile]);

  const handlePlayerHeight = () => {
    const el = document.getElementById("fan-player");

    if (el) setPlayerHeight(el.clientHeight);
  };

  useEffect(() => {
    if (playerRef.current && player) {
      if (!isMiniPlayer) handlePlayerHeight();

      window.addEventListener("resize", () => {
        if (!isMiniPlayer) {
          handlePlayerHeight();
        }
      });
    }
    return () => window.removeEventListener("resize", () => {});
  }, [player, isMiniPlayer]);

  const handleMiniPlayerClose = useCallback(
    (player) => {
      const el = document.getElementById("fan-player");
      if (el) {
        el.classList.remove("fan-mini-player");
        setIsBottomSlotVisible(false);
        dispatch(setMiniPlayer(false));
        player.pause();
      }
    },
    [dispatch]
  );

  const handleMiniPlayerExitPIP = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handlePlayerReady = useCallback((playerInstance) => {
    playerRef.current = playerInstance;

    setPlayer(playerInstance);

    playerInstance.on("waiting", () => {
      // console.log("player is waiting.");
    });

    playerInstance.on("dispose", () => {
      console.log("player will dispose.");
      playerRef.current = null;
      setPlayer(null);
    });

    playerInstance.on("play", () => {
      console.log("player is playing");
    });
  }, []);

  return videoJsOptions ? (
    <Box ref={ref} sx={{ ...styles.wrapper, height: `${playerHeight}px` }}>
      <Box id="fan-player" sx={{ ...customStyles.miniFanPlayer }}>
        <VideoJS
          playerType="FanPlayer"
          options={videoJsOptions}
          customComponents={customComponents}
          onReady={handlePlayerReady}
          onPlayerPlaying={handlePlayerPlaying}
          onPlayerPause={handlePlayerPause}
          onPlayerDispose={handlePlayerDispose}
          onPlayerChapterComplete={handleChapterComplete}
          onVideoEnded={handleVideoEnded}
          onPlayerIntervalEvent={handlePlayerIntervalEvent}
          onMiniPlayerClose={handleMiniPlayerClose}
          onMiniPlayerExitPIP={handleMiniPlayerExitPIP}
          onSignUpIntervention={handleSignUpIntervention}
          onVideoStart={handleVideoStart}
          onPlayerNextVideo={handlePlayerNextVideo}
          onPlayerUpNextVideo={handlePlayerUpNextVideo}
        />
        {isBottomSlotVisible && miniPlayerBottomSlotComponent}
      </Box>
    </Box>
  ) : (
    <PlayerPlaceholder
      customPlaceholderStyles={styles.placeholder}
      poster={playerProps?.poster}
    />
  );
};

export default FanPlayer;
