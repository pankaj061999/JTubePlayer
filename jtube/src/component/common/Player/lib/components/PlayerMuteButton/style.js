const styles = {
  wrapper: { position: "absolute", top: 0, display: "block", width: "100%", height: " 100%" },
  muteButton: {
    display: "flex",
    background: "#fff",
    color: "#000",
    padding: "6px",
    width: "175px",
    justifyContent: "space-between",
    borderRadius: "2px",
    marginLeft: "15px",
    alignItems: "center",
    height: "48px",
    "@media(max-width:480px)": {
      height: "40px",
    },
    "& img": {
      width: "40px",
      "@media(max-width:480px)": {
        width: "25px",
      },
    },
    "& p": {
      fontSize: "14px",
      fontWeight: "500",
      marginRight: "5px",
    },
  },
  mutedText: {
    width: "52px",
    padding: "6px",
    transition: "width 0.6s",
    "@media(max-width:480px)": {
      width: "42px",
      height: "40px",
    },
  },
};

export default styles;
