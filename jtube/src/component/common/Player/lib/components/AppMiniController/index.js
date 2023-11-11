import { Box } from "@mui/material";

const AppMiniPlayerController = ({ player }) => {
  const handleAppMiniPlayerClose = () => {
    player.trigger("appMiniPlayerClose");
  };

  const handleAppMiniPlayerExitPIP = () => {
    player.trigger("appMiniPlayerExpand");
  };

  return (
    <>
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
          id="app-mini-player-exit-picture-in-picture"
          component="img"
          src="/images/thumbs/controls/exit-picture-in-picture.svg"
          onClick={handleAppMiniPlayerExitPIP}
        />
        <Box
          sx={{ cursor: "pointer" }}
          id="app-mini-player-close"
          component="img"
          src="/images/thumbs/controls/mini-player-close.svg"
          onClick={handleAppMiniPlayerClose}
        />
      </Box>
    </>
  );
};

export default AppMiniPlayerController;
