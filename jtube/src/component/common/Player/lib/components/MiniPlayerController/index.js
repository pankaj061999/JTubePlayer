import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const MiniPlayerController = ({ player }) => {
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);

  useEffect(() => {
    player.on("miniPlayer", function (_, data) {
      setIsMiniPlayer(data.isMiniPlayer);
    });

    return () => player.off("miniPlayer");
  }, [player]);

  const handleMiniPlayerClose = () => {
    player.trigger("miniPlayerClose");
  };

  const handleMiniPlayerExitPIP = () => {
    player.trigger("miniPlayerExitPIP");
  };

  return (
    <>
      {isMiniPlayer && (
        <Box
          sx={{
            position: "absolute",
            top: "0px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "5px",
          }}
        >
          <Box
            sx={{ cursor: "pointer" }}
            id="mini-player-exit-picture-in-picture"
            component="img"
            src="/images/thumbs/controls/exit-picture-in-picture.svg"
            onClick={handleMiniPlayerExitPIP}
          />
          <Box
            sx={{ cursor: "pointer" }}
            id="mini-player-close"
            component="img"
            src="/images/thumbs/controls/mini-player-close.svg"
            onClick={handleMiniPlayerClose}
          />
        </Box>
      )}
    </>
  );
};

export default MiniPlayerController;
