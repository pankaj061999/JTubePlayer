import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppMiniPlayerCurrentTime, setAppMiniPlayerStatus } from "src/redux/slices/player";
import VideoJS from "../../lib/VideoJs";
import PlayerPlaceholder from "../../lib/components/PlayerPlaceholder";
import styles from "./styles";

const defaultFanPlayerProps = {
  controls: false,
  playsinline: true,
  muted: false,
  currentTime: 10,
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
    // settingsMenuButton: {
    //   entries: ["CustomLoopButton"],
    // },
    children: [
      // "customPreviousButton",
      "CustomPlayToggle",
      //   "CustomNextButton",
      // "CustomForwardButton",
      "currentTimeDisplay",
      "durationDisplay",
      "progressControl",
      "liveDisplay",
      "remainingTimeDisplay",
      "customControlSpacer",
      "chaptersButton",
      "CustomVolumePanel",
      //   "CustomFullScreenToggle",
      //   "settingsMenuButton",
      //   "CustomQualityButton",
    ],
  },
  playbackRates: [0.5, 1, 1.5, 2],
  loop: true,
  preload: "metadata",
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
  },
};

const customComponents = [];

const MobileAppMiniPlayer = () => {
  const playerRef = useRef(null);

  const [videoJsOptions, setVideoJsOptions] = useState(null);
  const [player, setPlayer] = useState(null);
  const router = useRouter();

  const [isPlaying, setIsPlaying] = useState(true);

  const dispatch = useDispatch();

  const {
    fanTvPlayer: { videoDetails, playerProps, currentTime },
  } = useSelector((state) => state.player);

  useEffect(() => {
    if (playerProps) {
      setVideoJsOptions({
        ...defaultFanPlayerProps,
        currentTime,
        ...playerProps,
      });
    }
  }, [playerProps, currentTime]);

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
      // console.log("player is playing");
    });
  }, []);

  const handlePlayerClose = () => {
    dispatch(setAppMiniPlayerStatus(false));
  };

  const handlePlayerExpand = () => {
    dispatch(setAppMiniPlayerCurrentTime(player.currentTime()));

    const {
      data: { slug, slugKey },
      watchId,
    } = videoDetails;

    const watchUrl = `/watch/${slug}-${slugKey}?watchId=${watchId}`;

    router.push(watchUrl, undefined, { shallow: true });
  };

  const handlePlayerPlayToggle = () => {
    const isPlayerPaused = player.paused();

    if (isPlayerPaused) {
      player.play();
      setIsPlaying(true);
    } else {
      player.pause();
      setIsPlaying(false);
    }
  };

  return videoJsOptions ? (
    <Box id="mobile-app-mini-container" sx={styles.wrapper}>
      <Box sx={styles.playerExpandWrapper} onClick={handlePlayerExpand}>
        <Box id="mobile-app-mini-player" sx={styles.playerContainer}>
          <VideoJS
            playerType="AppMiniPlayer"
            options={videoJsOptions}
            customComponents={customComponents}
            onReady={handlePlayerReady}
          />
        </Box>
        <Box sx={styles.miniPlayerBottomContainer}>
          <Box sx={styles.miniChannelStats}>
            <Typography component="small">{videoDetails?.data?.title}</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={styles.playerControls}>
        <Box sx={styles.playerControl} onClick={handlePlayerPlayToggle}>
          <img
            src={
              !isPlaying ? "/images/thumbs/controls/play.svg" : "/images/thumbs/controls/pause.svg"
            }
            alt={!isPlaying ? "Play" : "Pause"}
          />
        </Box>
        <Box sx={styles.playerControl} onClick={handlePlayerClose}>
          <img src="/images/thumbs/controls/mobile-app-mini-player-close-btn.svg" alt="Close" />
        </Box>
      </Box>
    </Box>
  ) : (
    <PlayerPlaceholder customPlaceholderStyles={styles.placeholder} poster={playerProps?.poster} />
  );
};

export default MobileAppMiniPlayer;
