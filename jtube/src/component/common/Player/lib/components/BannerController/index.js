import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const BannerController = ({ player }) => {
  const [isVideoPlayStarted, setIsVideoPlayStarted] = useState(false);
  const [muted, setMuted] = useState();
  const [isPlaying, setIsPlaying] = useState();
  const [bannerTitleSmall, setBannerTitleSmall] = useState(true);
  useEffect(() => {
    player.on("playing", function () {
      setIsPlaying(true);
      setMuted(player.muted());
      setIsVideoPlayStarted(true);
    });

    return () => player.off("playing");
  }, [player]);

  useEffect(() => {
    player.on("pause", function () {
      setIsPlaying(false);
      setMuted(player.muted());
    });

    return () => player.off("pause");
  }, [player]);

  const toggleMute = (e) => {
    e.stopPropagation();
    const muteStatus = player.muted();
    player.muted(!muteStatus);
    setMuted(!muteStatus);
  };

  const togglePlay = () => {
    const isPlayerPaused = player.paused();

    if (!isPlayerPaused) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  const handleBannerPlayBtn = () => {
    player.trigger("bannerPlayBtnClick");
  };

  return (
    <Box
      sx={{
        "@media(max-width:480px)": {
          width: "100%",
        },
      }}
    >
      {isVideoPlayStarted && (
        <>
          {/* <Box
            sx={{
              textAlign: "center",
              position: "absolute",
              top: "38%",
              zIndex: "9",
              width: "100px",
              height: "100px",
              right: "100px",
              left: "auto",
              margin: "auto",

              "& > img:first-child": {
                position: "absolute",
                zIndex: "11",
                top: "0",
                opacity: "1",
                width: "80px",
              },

              "@media(max-width:1180px)": {
                transform: "translate(-50%, -50%)",
                top: "50%",
                zIndex: "99",
              },
              "@media(max-width:1024px)": {
                transform: "translate(-50%, -50%)",
                top: "50%",
                width: "100%",
                zIndex: "99",
              },
              "@media(max-width:480px)": {
                right: "20px",
                top: "77px",
                height: "auto",
                left: "auto",
                width: "52px",
                zIndex: "99",
              },
            }}
          >
            <Box
              component="img"
              src={
                !isPlaying
                  ? "/images/fantv/play-icon.png"
                  : "/images/fantv/pause-icon.png"
              }
              onClick={togglePlay}
            />
          </Box> */}
          <Box>
            <Box
              sx={{
                position: "absolute",
                right: "33px",
                bottom: "42%",
                zIndex: "11",
                cursor: "pointer",
                // mixBlendMode: "exclusion",
                "@media (max-width:1024px)": {
                  bottom: "20%",
                },

                "@media (max-width:480px)": {
                  top: "auto",
                  bottom: "20px",
                  right: "16px",
                  width: "18px",
                },
              }}
              component="img"
              src={
                muted ? "/images/fantv/mute.png" : "/images/fantv/volume.png"
              }
              onClick={toggleMute}
              alt="mute icon"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default BannerController;
