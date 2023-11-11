import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useUpNextTimer from "src/hooks/useUpNextTimer";
import { getThumbnailUrlHome } from "util/common";
import styles from "./style";

const UpNextCard = ({ player, options }) => {
  const { time } = options;
  const [upNext, setUpNext] = useState({});
  const [enableUpNext, setEnableUpNext] = useState(false);
  const { count, start } = useUpNextTimer();

  // const handleClose = useCallback(() => {
  //   // player.trigger("upNextCardClose");
  // }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => handleClose(), time * 1000);
  //   return () => clearTimeout(timer);
  // }, [handleClose, time]);

  useEffect(() => {
    player.on("showUpNext", () => {
      setEnableUpNext(true);
      start(time);
    });
    return () => player.off("showUpNext");
  }, [player, start, time]);

  useEffect(() => {
    player.on("playlistsUpdated", (_, data) => {
      setUpNext(data.data[0]);
    });
    return () => player.off("playlistsUpdated");
  }, [player]);

  const handleClick = () => {
    player.trigger("playUpNext");
  };

  return (
    <Box sx={{ display: enableUpNext ? "visible" : "none" }}>
      <Box sx={styles.upNextStyle}>Up Next {count > 0 && <>in {count}</>}</Box>
      <Box sx={styles.container} onClick={handleClick}>
        <Box
          component="img"
          src={getThumbnailUrlHome(upNext?.thumbnails)}
          alt="Up Next Song"
          sx={styles.coinIcon}
        />
        <Box sx={styles.wrapper}>
          <Typography variant="title" sx={styles.titleText}>
            {upNext?.title}
          </Typography>
          <Typography variant="title" sx={styles.subtitleText}>
            {upNext?.creator?.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UpNextCard;
