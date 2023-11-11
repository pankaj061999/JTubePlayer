const styles = {
  wrapper: {
    position: "fixed",
    bottom: "57px",
    right: "0px",
    zIndex: "100",
    width: "100%",
    background: "#110D20",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
  playerExpandWrapper: {
    width: "75%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  playerContainer: { width: "70%", pointerEvents: "none" },
  miniPlayerBottomContainer: {
    // background: "#0c091b",
    width: "56%",
    padding: "15px 15px",
  },
  miniChannelStats: {
    alignItems: "center",
    "& *": {
      margin: "0",
    },
    "& small": {
      fontSize: "14px",
      color: "#fff",
      fontWeight: "500",
      maxHeight: "4rem",
      lineHeight: "20px",
      display: "-webkit-box",
      "-webkit-line-clamp": "2",
      "-webkit-box-orient": "vertical",
      textOverflow: "ellipsis",
      whiteSpace: "normal",
      overflow: "hidden",
    },
    "& p": {
      fontSize: "14px",
      color: "custom.viewWatchPage",
    },
  },
  playerControls: {
    width: "25%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  playerControl: {
    padding: "23px 5px",
    "& img": {
      width: "17px",
      height: "17px",
    },
  },
};

export default styles;
