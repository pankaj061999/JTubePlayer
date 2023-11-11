import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
const PreviewMiniController = ({ player }) => {
  const [isVideoPlayStarted, setIsVideoPlayStarted] = useState(false);
  const [muted, setMuted] = useState();

  useEffect(() => {
    player.on("playing", function () {
      // console.log(
      //   "Preview mini Player is playing. Log is from controller====>"
      // );
      setMuted(player.muted());
      setIsVideoPlayStarted(true);
    });

    return () => player.off("playing");
  }, [player]);

  useEffect(() => {
    player.on("pause", function () {
      // console.log("Preview mini Player is pause . Log is from controller==>");
      setMuted(player.muted());
    });

    return () => player.off("pause");
  }, [player]);

  const toggleMute = (e) => {
    const muteStatus = player.muted();
    player.muted(!muteStatus);
    setMuted(!muteStatus);
    e.stopPropagation();
  };

  return (
    <>
      {isVideoPlayStarted && (
        <Box className="muteIcon" data-controller="fan-controller">
          <Box
            component="img"
            src={muted ? "/images/fantv/mute.png" : "/images/fantv/volume.png"}
            onClick={toggleMute}
          />
        </Box>
      )}
    </>
  );
};

export default PreviewMiniController;
