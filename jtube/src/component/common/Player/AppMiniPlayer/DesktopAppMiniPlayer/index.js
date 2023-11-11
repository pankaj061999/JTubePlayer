import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppMiniPlayerCurrentTime, setAppMiniPlayerStatus } from "src/redux/slices/player";
import { getViews, timeSince } from "util/common";
import VideoJS from "../../lib/VideoJs";
import PlayerPlaceholder from "../../lib/components/PlayerPlaceholder";
import styles from "./styles";

const defaultFanPlayerProps = {
  controls: true,
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

const customComponents = ["CustomAppMiniPlayerController"];

const DesktopAppMiniPlayer = () => {
  const playerRef = useRef(null);

  const [videoJsOptions, setVideoJsOptions] = useState(null);
  const [player, setPlayer] = useState(null);
  const router = useRouter();

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

  const handleFlyCoinAnimation = useCallback((player, data) => {
    const header_FTC_el = document.getElementById("header_ftc");

    const { left: header_FTC_left, top: header_FTC_top } = header_FTC_el.getBoundingClientRect();

    const times = data.options.withCoinFlyAnimation.chapterType[data.percentage].times;

    const coinConfigs = Array(times).fill(
      data.options.withCoinFlyAnimation.chapterType[data.percentage]
    );

    let timer = 0;

    player.userActive(true);

    coinConfigs.forEach((item, idx) => {
      timer += item.stepAfter;

      const fly_coin_el = document.getElementById(
        `chapter_ftc_percentage_${data.percentage}_time${idx + 1}`
      );

      setTimeout(() => {
        fly_coin_el.classList.remove("vjs-hidden");

        const { left: fly_coin_el_left } = fly_coin_el.getBoundingClientRect();

        fly_coin_el.animate(
          [
            { left: `${fly_coin_el_left}px` },
            { left: `${header_FTC_left}px`, top: `${header_FTC_top}px` },
          ],
          {
            duration: 2500,
            easing: "ease-in-out",
          }
        );
      }, timer);

      setTimeout(() => {
        fly_coin_el.classList.add("vjs-hidden");
      }, 2500 + timer);
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
      // console.log("player is playing");
    });
  }, []);

  const handleMiniPlayerClose = useCallback(() => {
    dispatch(setAppMiniPlayerStatus(false));
  }, [dispatch]);

  const handleMiniPlayerExpand = useCallback(
    (player) => {
      dispatch(setAppMiniPlayerCurrentTime(player.currentTime()));

      const {
        data: { slug, slugKey },
        watchId,
      } = videoDetails;

      const watchUrl = `/watch/${slug}-${slugKey}?watchId=${watchId}`;

      router.push(watchUrl, undefined, { shallow: true });
    },
    [router, videoDetails, dispatch]
  );

  const handleChapterComplete = useCallback(
    (player, data) => {
      handleFlyCoinAnimation(player, data);
    },
    [handleFlyCoinAnimation]
  );

  return videoJsOptions ? (
    <Box id="app-mini-player" sx={styles.wrapper}>
      <Box>
        <VideoJS
          playerType="AppMiniPlayer"
          options={videoJsOptions}
          customComponents={customComponents}
          onReady={handlePlayerReady}
          onAppMiniPlayerClose={handleMiniPlayerClose}
          onAppMiniPlayerExpand={handleMiniPlayerExpand}
          onPlayerChapterComplete={handleChapterComplete}
        />
      </Box>
      <Box sx={styles.miniPlayerBottomContainer}>
        <Box sx={styles.minichannelStats}>
          <Typography component="small">{videoDetails?.data?.title}</Typography>
          <Box component="p">
            {getViews(videoDetails?.data?.stats?.views)} views |&nbsp;
            {timeSince(new Date(videoDetails?.data?.createdAt))}
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <PlayerPlaceholder customPlaceholderStyles={styles.placeholder} poster={playerProps?.poster} />
  );
};

export default DesktopAppMiniPlayer;
