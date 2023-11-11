import { Box } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import VideoJS from "../lib/VideoJs";
import styles from "./styles";

const defaultBannerProps = {
  controls: false,
  loop: true,
  preload: "auto",
  playsinline: true,
  responsive: true,
  fluid: true,
  loadingSpinner: false,
  aspectRatio: "16:9",
  plugins: {
    autoPlayPlugin: { startAfter: 10, autoPlayOptions: "muted", withInteractivity: true },
    analytics: {
      events: ["start"],
    },
  },
  html5: {
    vhs: {
      overrideNative: true,
      enableLowInitialPlaylist: true,
      useDevicePixelRatio: true,
    },
  },
};

const customComponents = ["CustomBannerController"];

const BannerPlayer = ({
  playerProps,
  handlePlayerPlaying,
  handlePlayerPause,
  handlePlayerDispose,
  handleBannerPlayButtonClicked,
  handleVideoStart,
}) => {
  const playerRef = useRef(null);

  const [videoJsOptions, setVideoJsOptions] = useState(null);

  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    if (playerProps) {
      const { poster, ...rest } = playerProps;
      setVideoJsOptions({ ...defaultBannerProps, ...rest });
    }
  }, [playerProps]);

  const handlePlayerReady = useCallback(
    (player) => {
      playerRef.current = player;

      handleBannerPlayButtonClicked &&
        player.on("bannerPlayBtnClick", () => handleBannerPlayButtonClicked(player));
    },
    [handleBannerPlayButtonClicked]
  );

  const handleBannerPlayerStart = (player) => {
    setIsPlayerReady(true);

    !!handleVideoStart && handleVideoStart(player);
  };

  return (
    <>
      {!!videoJsOptions && (
        <Box
          sx={{
            visibility: !isPlayerReady ? "hidden" : "visible",
            position: !isPlayerReady ? "absolute" : "relative",
          }}
        >
          <VideoJS
            playerType="BannerPlayer"
            options={videoJsOptions}
            customComponents={customComponents}
            onReady={handlePlayerReady}
            onPlayerPlaying={handlePlayerPlaying}
            onPlayerPause={handlePlayerPause}
            onPlayerDispose={handlePlayerDispose}
            onVideoStart={handleBannerPlayerStart}
          />
        </Box>
      )}
      {!isPlayerReady && (
        <Box sx={styles.placeholder}>
          <img
            src={playerProps?.poster}
            alt="video"
            loading="eager"
            fetchpriority="high"
            decoding="sync"
            width={953}
            height={536}
          />
        </Box>
      )}
    </>
  );
};

export default BannerPlayer;
