import { Box, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import styles from "./style";

const EarnCoinInterventionCard = ({ player }) => {
  const handleClose = useCallback(() => {
    player.trigger("earnCoinInterventionCardClose");
  }, [player]);

  useEffect(() => {
    const timer = setTimeout(() => handleClose(), 10000);
    return () => clearTimeout(timer);
  }, [handleClose]);

  return (
    <Box sx={styles.container} onClick={handleClose}>
      <Box
        component="img"
        src="/images/newHome/headercoin.svg"
        alt="FanTv coin"
        sx={styles.coinIcon}
      />
      <Box sx={styles.wrapper}>
        <Typography variant="title" sx={styles.titleText}>
          Congratulations!
        </Typography>
        <Typography variant="subtitle" sx={styles.subtitleText}>
          You have earned
        </Typography>
        <Typography variant="subtitle" sx={styles.text}>
          5 Coins
        </Typography>
      </Box>
    </Box>
  );
};

export default EarnCoinInterventionCard;
