const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    paddingInline: "5px",
    width: "110px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    background: "rgba(0,0,0,.7)",
    border: "1px solid rgba(255,255,255,.5)",
    cursor: "pointer",
    // alignItems: "center",
    // padding: "4px",
  },
  titleText: {
    display: "block",
    fontSize: "12px",
    paddingRight: "20px",
    paddingTop: "5px",
    fontWeight: "400",
    color: "#FFF",
    textAlign: "left",

    display: "-webkit-box !important",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",

    "@media(max-width:480px)": {
      fontSize: "12px",
    },
  },
  subtitleText: {
    display: "block",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "400",
    paddingTop: "8px",
    "@media(max-width:480px)": {
      fontSize: "10px",
    },
  },
  text: {
    display: "block",
    alignSelf: "center",
    fontSize: "24px",
    fontWeight: "700",
    color: "#000",
    lineHeight: "20px",
    "@media(max-width:480px)": {
      fontSize: "16px",
      lineHeight: "24px",
    },
  },
  upNextStyle: {
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "700",
    color: "#FFF",
    mixBlendMode: "difference",
  },
  coinIcon: {
    width: "60x",
    height: "60px",
    "@media(max-width:480px)": {
      width: "40x",
      height: "40px",
    },
  },
};
export default styles;
