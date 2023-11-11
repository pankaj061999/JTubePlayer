import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./style";
const PlayerMuteButton = ({ player }) => {
  const [showMuteText, setShowMuteText] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowMuteText(false);
    }, 2000);
  }, []);

  const handleClick = () => {
    player.muted(false);
    player.removeChild("CustomPlayerMuteButton");
  };

  return (
    <>
      <Box sx={styles.wrapper} onClick={handleClick}>
        <Box
          sx={{
            ...styles.muteButton,
            ...(!showMuteText && styles.mutedText),
          }}
        >
          <img src="/images/thumbs/controls/player-mute-button.svg" alt="mute" />
          {showMuteText && <Typography variant="body1">TAP TO UNMUTE</Typography>}
        </Box>
      </Box>
    </>
  );
};

export default PlayerMuteButton;
