import { Box, Divider, List, ListItem } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import LoopButton from "../LoopButton";

const SettingPopupMenu = ({ player }) => {
  const [popupId, setPopupId] = useState("main-menu");
  const [playbackRates, setPlaybackRates] = useState([]);
  const [playbackRate, setPlaybackRate] = useState();
  const [qualityLevels, setQualityLevels] = useState([]);
  const [currentQuality, setCurrentQuality] = useState("Auto");

  useEffect(() => {
    if (player.playbackRate) {
      console.log("changing playback rate");
      setPlaybackRate(player.playbackRate());
    }
  }, [player]);

  useEffect(() => {
    if (player.playbackRates) {
      setPlaybackRates(player.playbackRates());
    }
  }, [player]);

  // useEffect(() => {
  //   player.qualityLevels().on("addqualitylevel", function () {
  //     setQualityLevels(getQualityLevels());
  //   });

  //   return () => player.qualityLevels().off("addqualitylevel");
  // }, [player, getQualityLevels]);

  const handlePlaybackChange = (rate) => {
    player.playbackRate(rate);
    setPlaybackRate(rate);
  };

  const getQualityLevels = useCallback(() => {
    const qualityList = player.qualityLevels();
    const levels = qualityList.levels_ || [];
    const levelItems = [];

    for (let i = 0; i < levels.length; ++i) {
      if (
        !levelItems.filter((_existingItem) => {
          return (
            _existingItem.item && _existingItem.item.value === levels[i].height
          );
        }).length
      ) {
        const levelItem = {
          label: levels[i].height + "p",
          value: levels[i].height,
          selected: false,
        };

        levelItems.push(levelItem);
      }
    }

    levelItems.sort((x, y) => y.value - x.value);

    levelItems.push({
      label: player.localize("Auto"),
      value: "auto",
      selected: true,
    });

    return levelItems;
  }, [player]);

  const setQuality = (height) => {
    const qualityList = player.qualityLevels();

    for (let i = 0; i < qualityList.length; ++i) {
      const quality = qualityList[i];

      quality.enabled = quality.height === height || height === "auto";
    }

    const selectedLevel = qualityLevels.find((level) => {
      return level.value == height;
    });

    setCurrentQuality(selectedLevel.label);
  };

  const getPopupMenu = () => {
    switch (popupId) {
      case "main-menu": {
        return (
          <List id="main-menu">
            {!!qualityLevels.length && (
              <ListItem onClick={() => setPopupId("quality-menu")}>
                {currentQuality}
                <Box
                  component="img"
                  src="/images/fantv/caret-right.png"
                  width="5px"
                />
              </ListItem>
            )}
            <ListItem>
              <LoopButton mode="text" player={player} />
            </ListItem>
            {/* <ListItem onClick={() => setPopupId("speed-menu")}>
              {playbackRate == 1 ? "Normal" : `${playbackRate}x`}
              <Box
                component="img"
                src="/images/fantv/caret-right.png"
                width="5px"
              />
            </ListItem> */}
          </List>
        );
      }
      // case "speed-menu": {
      //   return (
      //     <List id="speed-menu">
      //       <ListItem onClick={() => setPopupId("main-menu")}>
      //         <Box
      //           component="img"
      //           src="/images/fantv/caret-left.png"
      //           width="5px"
      //         />
      //         Speed
      //       </ListItem>
      //       <Divider />

      //       {playbackRates.map((rate, idx) => (
      //         <ListItem
      //           key={`${rate}_${idx}`}
      //           onClick={() => handlePlaybackChange(rate)}
      //         >
      //           {rate}x
      //           {playbackRate == rate && (
      //             <Box
      //               component="img"
      //               src="/images/fantv/tick.png"
      //               width="15px"
      //             />
      //           )}
      //         </ListItem>
      //       ))}
      //     </List>
      //   );
      // }
      case "quality-menu": {
        return (
          <List id="quality-menu">
            <ListItem onClick={() => setPopupId("main-menu")}>
              <Box
                component="img"
                src="/images/fantv/caret-left.png"
                width="5px"
              />
              Quality
            </ListItem>
            <Divider />
            {qualityLevels.map((quality, idx) => (
              <ListItem
                key={`${quality.label}_${idx}`}
                onClick={() => setQuality(quality.value)}
              >
                {quality.label}
                {currentQuality == quality.label && (
                  <Box
                    component="img"
                    src="/images/fantv/tick.png"
                    width="15px"
                  />
                )}
              </ListItem>
            ))}
          </List>
        );
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "block",
          "& ul": {
            padding: "0",
            position: "relative",
            display: "block",
            "& li": {
              position: "relative",
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              color: "initial",
              fontSize: "14px",
              textTransform: "initial",
              margin: "2.5px 0",
            },
          },
          "& ul#speed-menu li:first-child, & ul#quality-menu li:first-child": {
            justifyContent: "initial",
            "& img": {
              marginRight: "20px",
            },
          },
        }}
      >
        {getPopupMenu()}
      </Box>
    </>
  );
};

export default SettingPopupMenu;
