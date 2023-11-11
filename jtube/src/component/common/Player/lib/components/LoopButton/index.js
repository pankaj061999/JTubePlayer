import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const LoopButton = ({ player, mode = "icon" }) => {
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    if (player.loop) {
      setLoop(player.loop());
    }
  }, [player]);

  useEffect(() => {
    player.on("playing", function () {
      setLoop(player.loop());
    });

    return () => player.off("playing");
  }, [player]);

  const toggleLoop = () => {
    const loopStatus = player.loop();
    player.loop(!loopStatus);
    setLoop(!loopStatus);
  };

  return (
    <>
      {mode === "icon" ? (
        <Box
          id="button_rewind"
          component="img"
          src={loop ? "/images/thumbs/controls/repeat.svg" : "/images/thumbs/controls/loop.svg"}
          onClick={toggleLoop}
        />
      ) : (
        <Box sx={{ width: "100%", textAlign: "left" }} onClick={toggleLoop}>
          Loop
          {loop && <Box component="img" src="/images/fantv/tick.png" width="15px" />}
        </Box>
      )}
    </>
  );
};

export default LoopButton;
