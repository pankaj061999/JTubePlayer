import { Box, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import styles from "./style";

const CoinInterventionCard = ({ player }) => {
  const handleClose = useCallback(() => {
    player.trigger("coinInterventionCardClose");
  }, [player]);

  useEffect(() => {
    const timer = setTimeout(() => handleClose(), 10000);
    return () => clearTimeout(timer);
  }, [handleClose]);

  return (
    <Box sx={styles.container} onClick={handleClose}>
      <Box sx={styles.wrapper}>
        <Box
          component="img"
          src="/images/newHome/headercoin.svg"
          alt="FanTiger coin"
          sx={styles.coinIcon}
        />
        <Typography sx={styles.text}>Sign up now to get 100 Coins</Typography>
      </Box>
    </Box>
  );
};

export default CoinInterventionCard;
