const styles = {
  wrapper: {
    position: "fixed",
    bottom: "0px",
    right: "0px",
    zIndex: "100",
    width: "400px",
    "& .video-js": {
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
    },
  },
  miniPlayerBottomContainer: {
    position: "relative",
    display: "block",
    backgroundColor: "custom.miniPlayerBottomContainerBg",
    padding: "16px",
  },
  minichannelStats: {
    position: "relative",
    alignItems: "center",
    "& *": {
      margin: "0",
    },
    "& small": {
      fontSize: "14px",
      color: "custom.white",
      fontWeight: "700",
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
};

export default styles;
