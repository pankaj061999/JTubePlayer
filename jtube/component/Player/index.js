import React from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ videoId, poster }) => {
  const opts = {
    height: "360",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default YouTubePlayer;
