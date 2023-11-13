import React, { useRef, useEffect } from "react";
import videojs from "video.js";

import "video.js/dist/video-js.css";
// import "../../../styles/Home.module.css";

const CustomVideoPlayer = ({ src, poster }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    console.log("Initializing Video.js");
    const player = videojs(videoRef.current, {
      controls: true,
      sources: [{ src }],
      poster,
    });

    return () => {
      console.log("Disposing Video.js");
      if (player) {
        player.dispose();
      }
    };
  }, [src, poster]);

  return (
    <div data-vjs-player>
      <p>Pankaj</p>
      <video ref={videoRef} className="video-js" />
    </div>
  );
};

export default CustomVideoPlayer;
