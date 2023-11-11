const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    paddingInline: "5px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    background: "#FFF",
    borderTopLeftRadius: "25px",
    borderBottomLeftRadius: "25px",
    cursor: "pointer",
    alignItems: "center",
    padding: "10px",
  },
  titleText: {
    display: "block",
    fontSize: "26px",
    background: "linear-gradient(90.48deg, #E14084 3.73%, #3454FA 53.09%, #54B5BB 96.58%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    alignSelf: "center",
    fontWeight: "600",
    color: "#000",
    lineHeight: "34px",
    "@media(max-width:480px)": {
      fontSize: "18px",
    },
  },
  subtitleText: {
    display: "block",
    alignSelf: "center",
    fontSize: "24px",
    fontWeight: "600",
    color: "#000",
    lineHeight: "34px",
    "@media(max-width:480px)": {
      fontSize: "16px",
      lineHeight: "24px",
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
