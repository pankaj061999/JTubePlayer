import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const QualityButton = ({ player }) => {
  const addQualityLevel = () => {
    const qualityList = player.qualityLevels();
    const levels = qualityList.levels_ || [];
    const levelItems = [];

    for (let i = 0; i < levels.length; ++i) {
      if (
        !levelItems.filter((_existingItem) => {
          return _existingItem.item && _existingItem.item.value === levels[i].height;
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

    levelItems.push({
      label: player.localize("Auto"),
      value: "auto",
      selected: true,
    });

    let x = levelItems;
  };

  const setQuality = (height) => {
    // const qualityList = this.player.qualityLevels();
    // // Set quality on plugin
    // this._currentQuality = height;
    // if (this.config.displayCurrentQuality) {
    //   this.setButtonInnerText(height === "auto" ? height : `${height}p`);
    // }
    // for (let i = 0; i < qualityList.length; ++i) {
    //   const quality = qualityList[i];
    //   quality.enabled = quality.height === height || height === "auto";
    // }
    // this._qualityButton.unpressButton();
  };

  return (
    <>
      <Box onClick={addQualityLevel}>Quality Button</Box>
    </>
  );
};

export default QualityButton;
