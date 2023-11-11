import React, { useCallback, useEffect, useState } from "react";
import VideoJS from "../lib/VideoJs";

const defaultPreviewMiniPlayerProps = {
  loop: false,
  preload: "auto",
  fluid: true,
  muted: false,
  aspectRatio: "16:9",
  responsive: true,
  loadingSpinner: false,
  playsinline: true,
  plugins: {
    autoPlayPlugin: { startAfter: 2000, autoPlayOptions: "any" },
    analytics: {
      events: ["start"],
    },
  },
};

const customComponents = ["PreviewMiniController"];

const PreviewMiniPlayer = ({
  playerProps,
  handlePlayerPlaying,
  handlePlayerPause,
  handlePlayerDispose,
  handleVideoStart,
}) => {
  const playerRef = React.useRef(null);

  const [videoJsOptions, setVideoJsOptions] = useState(null);

  useEffect(() => {
    if (playerProps) {
      setVideoJsOptions({
        ...defaultPreviewMiniPlayerProps,
        ...playerProps,
      });
    }
  }, [playerProps]);

  const handlePlayerReady = useCallback((player) => {
    playerRef.current = player;
  }, []);

  return (
    videoJsOptions && (
      <VideoJS
        playerType="PreviewMiniPlayer"
        options={videoJsOptions}
        customComponents={customComponents}
        onReady={handlePlayerReady}
        onPlayerPlaying={handlePlayerPlaying}
        onPlayerPause={handlePlayerPause}
        onPlayerDispose={handlePlayerDispose}
        onVideoStart={handleVideoStart}
      />
    )
  );
};

export default PreviewMiniPlayer;
