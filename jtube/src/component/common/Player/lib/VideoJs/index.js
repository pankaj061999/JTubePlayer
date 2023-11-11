import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import videojs from "video.js";
import {
  setAppMiniPlayerId,
  setBannerPlayer,
  setPlayerCurrentTime,
} from "../../../../../redux/slices/player";

import "video.js/dist/video-js.min.css";
import "videojs-contrib-quality-levels";
import "videojs-hotkeys";

import registerPlayerExternals from "./config";

registerPlayerExternals();

const getPlayerType = (playerType) => {
  switch (playerType) {
    case "FanPlayer":
      return "MainPlayer";

    case "BannerPlayer":
      return "BannerPlayer";

    case "PreviewMiniPlayer":
      return "PreviewMiniPlayer";

    case "AppMiniPlayer":
      return "MainPlayer";
  }
};

export const VideoJS = (props) => {
  const {
    playerType,
    options,
    onReady: handlePlayerReady,
    customComponents,
    onVideoStart: handleVideoStart,
    onPlayerPlay: handlePlayerPlay,
    onVideoEnded: handleVideoEnded,
    onPlayerPlaying: handlePlayerPlaying,
    onPlayerPause: handlePlayerPause,
    onPlayerDispose: handlePlayerDispose,
    onPlayerChapterComplete: handleChapterComplete,
    onPlayerIntervalEvent: handlePlayerIntervalEvent,
    onMiniPlayerClose: handleMiniPlayerClose,
    onMiniPlayerExitPIP: handleMiniPlayerExitPIP,
    onVideoForwardSkip: handleVideoForwardSkip,
    onVideoBackwardSkip: handleVideoBackwardSkip,
    onSignUpIntervention: handleSignUpIntervention,
    onPlayerNextVideo: handlePlayerNextVideo,
    onPlayerUpNextVideo: handlePlayerUpNextVideo,
    onAppMiniPlayerClose: handleAppMiniPlayerClose,
    onAppMiniPlayerExpand: handleAppMiniPlayerExpand,
  } = props;

  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const [player, setPlayer] = useState(null);

  const dispatch = useDispatch();

  const {
    fanTvPlayer: {
      isMiniPlayer,
      videoDetails: { videoId, watchId, data },
      playlists,
    },
    appMiniPlayer: { status: isAppMiniPlayerVisible, id: appMiniPlayerId },
  } = useSelector((state) => state.player);

  const { isLoggedIn, userData } = useSelector((state) => state.user);

  const handleVideoStartEffect = useCallback(() => {
    console.log(`${playerType} Video start event hook called in videojs`);

    handleVideoStart && handleVideoStart(player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, playerType, handleVideoStart, videoId, watchId]);

  const handlePlayerPlayEffect = useCallback(() => {
    console.log(`${playerType} Player Play event hook called in videojs`);

    handlePlayerPlay && handlePlayerPlay(player);
  }, [player, playerType, handlePlayerPlay]);

  const handleVideoEndedEffect = useCallback(() => {
    console.log(`${playerType} Video ended hook called in videojs`);

    handleVideoEnded && handleVideoEnded(player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleVideoEnded, player, playerType, videoId, watchId]);

  const handlePlayerPlayingEffect = useCallback(() => {
    const elapsedTime = Math.round(player?.currentTime());

    if (elapsedTime !== 0) {
      console.log(`${playerType} is playing hook called in videojs`);
    }

    handlePlayerPlaying && handlePlayerPlaying(player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlePlayerPlaying, player, playerType, videoId, watchId]);

  const handlePlayerPauseEffect = useCallback(() => {
    const elapsedTime = Math.round(player?.currentTime());
    const videoDuration = Math.round(player?.duration());

    if (elapsedTime !== 0 && elapsedTime !== videoDuration) {
      console.log(`${playerType} is paused hook called in videojs`);
    }

    handlePlayerPause && handlePlayerPause(player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlePlayerPause, player, playerType, videoId, watchId]);

  const handleChapterCompleteEffect = useCallback(
    (_, data) => {
      console.log(`${playerType} chapterComplete hook called in videojs`, data);

      handleChapterComplete && handleChapterComplete(player, data);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [player, handleChapterComplete, playerType, videoId, watchId]
  );

  const handlePlayerIntervalEventEffect = useCallback(
    (_, data) => {
      console.log(`${playerType} is intervalEvent hook called in videojs`);

      handlePlayerIntervalEvent && handlePlayerIntervalEvent(player);
    },
    [player, handlePlayerIntervalEvent, playerType, videoId, watchId]
  );

  const handlePlayerDisposeEffect = useCallback(() => {
    console.log(`${playerType} is disposed hook called in videojs`);
    handlePlayerDispose && handlePlayerDispose(player);
  }, [player, handlePlayerDispose, playerType]);

  const handleMiniPlayerCloseEffect = useCallback(() => {
    console.log(`${playerType} miniPlayerClose hook called in videojs`);
    handleMiniPlayerClose && handleMiniPlayerClose(player);
  }, [player, handleMiniPlayerClose, playerType]);

  const handleMiniPlayerExitPIPEffect = useCallback(() => {
    console.log(`${playerType} miniPlayerExitPIP hook called in videojs`);
    handleMiniPlayerExitPIP && handleMiniPlayerExitPIP(player);
  }, [player, handleMiniPlayerExitPIP, playerType]);

  const handleVideoForwardSkipEffect = useCallback(() => {
    console.log(`${playerType} videoForwardSkip hook called in videojs`);

    handleVideoForwardSkip && handleVideoForwardSkip(player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, handleVideoForwardSkip, playerType, videoId, watchId]);

  const handleVideoBackwardSkipEffect = useCallback(() => {
    console.log(`${playerType} videoBackwardSkip hook called in videojs`);

    handleVideoBackwardSkip && handleVideoBackwardSkip(player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, handleVideoBackwardSkip, playerType, videoId, watchId]);

  const handleSignUpInterventionEffect = useCallback(() => {
    if (playerType === "FanPlayer") {
      console.log(
        `${playerType} Player signUpIntervention event hook called in videojs`
      );
      handleSignUpIntervention && handleSignUpIntervention(player);
    }
  }, [player, playerType, handleSignUpIntervention]);

  const handlePlayerNextVideoEffect = useCallback(() => {
    console.log(`${playerType} playerNextVideo hook called in videojs`);

    handlePlayerNextVideo && handlePlayerNextVideo(player);
  }, [player, playerType, handlePlayerNextVideo, videoId, watchId]);

  const handlePlayerUpNextVideoEffect = useCallback(() => {
    console.log(`${playerType} PlayerUpNextVideo hook called in videojs`);

    handlePlayerUpNextVideo && handlePlayerUpNextVideo(player);
  }, [playerType, videoId, watchId, handlePlayerUpNextVideo, player]);

  const handleAppMiniPlayerCloseEffect = useCallback(() => {
    console.log(
      `${playerType} Player appMiniPlayerClose event hook called in videojs`
    );
    handleAppMiniPlayerClose && handleAppMiniPlayerClose(player);
  }, [player, playerType, handleAppMiniPlayerClose]);

  const handleAppMiniPlayerExpandEffect = useCallback(() => {
    console.log(
      `${playerType} Player appMiniPlayerExpand event hook called in videojs`
    );
    handleAppMiniPlayerExpand && handleAppMiniPlayerExpand(player);
  }, [player, playerType, handleAppMiniPlayerExpand]);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const id = `vjs_${(Math.random() + 1).toString(36).substring(2)}`;

      const player = (playerRef.current = videojs(
        videoElement,
        { id, ...options },
        () => {
          handlePlayerReady && handlePlayerReady(player);
        }
      ));

      playerType === "BannerPlayer" && dispatch(setBannerPlayer(player.id()));
      playerType === "AppMiniPlayer" &&
        dispatch(setAppMiniPlayerId(player.id()));

      if (["AppMiniPlayer", "FanPlayer"].includes(playerType)) {
        player.currentTime(options?.currentTime || 0);
      }

      if (isAppMiniPlayerVisible && playerType === "PreviewMiniPlayer") {
        const appMiniPlayer = videojs.getPlayer(appMiniPlayerId);
        const isPaused = appMiniPlayer.paused();
        if (isPaused) {
          player.muted(false);
        } else player.muted(true);
      }

      setPlayer(player);

      customComponents?.forEach((customComponent) => {
        player.addChild(customComponent);
      });
    }
  }, [
    playerType,
    options,
    videoRef,
    handlePlayerReady,
    customComponents,
    dispatch,
    isAppMiniPlayerVisible,
    appMiniPlayerId,
  ]);

  useEffect(() => {
    if (!playerRef.current) {
      const player = playerRef.current;
      player.src(options.sources);
      !!options?.poster && player.poster(options.poster);
    }

    return () => {
      if (player && !player.isDisposed()) {
        playerType === "BannerPlayer" && dispatch(setBannerPlayer(null));

        if (["FanPlayer", "AppMiniPlayer"].includes(playerType)) {
          dispatch(setPlayerCurrentTime(player.currentTime()));
        }

        player.dispose();
        playerRef.current = null;
      }
    };
  }, [options, dispatch, player, playerType]);

  useEffect(() => {
    if (player) {
      console.log("player effect running and events are turned on");

      player.on("start", handleVideoStartEffect);
      player.on("play", handlePlayerPlayEffect);
      player.on("ended", handleVideoEndedEffect);
      player.on("playing", handlePlayerPlayingEffect);
      player.on("pause", handlePlayerPauseEffect);
      player.on("chapterComplete", handleChapterCompleteEffect);
      player.on("intervalEvent", handlePlayerIntervalEventEffect);
      player.on("dispose", handlePlayerDisposeEffect);
      player.on("miniPlayerClose", handleMiniPlayerCloseEffect);
      player.on("miniPlayerExitPIP", handleMiniPlayerExitPIPEffect);
      player.on("forwardSkip", handleVideoForwardSkipEffect);
      player.on("backwardSkip", handleVideoBackwardSkipEffect);
      player.on("signUpIntervention", handleSignUpInterventionEffect);
      player.on("playNext", handlePlayerNextVideoEffect);
      player.on("appMiniPlayerClose", handleAppMiniPlayerCloseEffect);
      player.on("appMiniPlayerExpand", handleAppMiniPlayerExpandEffect);
      player.on("playUpNext", handlePlayerUpNextVideoEffect);
    }

    return () => {
      if (player && player.isDisposed()) {
        console.log("player is getting dispose and events are turned of");
        player.off("start");
        player.off("play");
        player.off("ended");
        player.off("playing");
        player.off("pause");
        player.off("dispose");
        player.off("chapterComplete");
        player.off("intervalEvent");
        player.off("miniPlayerClose");
        player.off("miniPlayerExitPIP");
        player.off("forwardSkip");
        player.off("backwardSkip");
        player.off("signUpIntervention");
        player.off("playNext");
        player.off("playUpNext");
        player.off("appMiniPlayerClose");
        player.off("appMiniPlayerExpand");
      }
    };
  }, [
    player,
    handleVideoEndedEffect,
    handlePlayerPlayingEffect,
    handlePlayerPauseEffect,
    handleVideoStartEffect,
    handlePlayerPlayEffect,
    handleChapterCompleteEffect,
    handlePlayerIntervalEventEffect,
    handlePlayerDisposeEffect,
    handleMiniPlayerCloseEffect,
    handleMiniPlayerExitPIPEffect,
    handleVideoForwardSkipEffect,
    handleVideoBackwardSkipEffect,
    handleSignUpInterventionEffect,
    handlePlayerNextVideoEffect,
    handlePlayerUpNextVideoEffect,
    handleAppMiniPlayerCloseEffect,
    handleAppMiniPlayerExpandEffect,
  ]);

  useEffect(() => {
    if (player && !!playlists.length) {
      if (playerType === "FanPlayer") {
        player.trigger("playlistsUpdated", { data: playlists });
      }
    }
  }, [player, playerType, playlists]);

  useEffect(() => {
    if (player) {
      if (playerType === "FanPlayer") {
        if (!isLoggedIn) {
          player.missedCoinIntervention({
            isLoggedIn,
            align: "bottom-right",
            duration: 60,
            storage: true,
            expiry: 24 * 60 * 60 * 1000,
          });
        }
        player.earnCoinIntervention({
          align: "bottom-right",
          storage: true,
          nextDay: 24 * 60 * 60 * 1000,
        });
      }
    }
  }, [player, isLoggedIn, playerType]);

  /**
   * @description This effect manages the mini player update on fan Player only
   */
  useEffect(() => {
    if (playerType === "FanPlayer" && player?.el_) {
      if (isMiniPlayer) {
        player.trigger("miniPlayer", { isMiniPlayer });
        player.addClass("fan-mini-player-visible");
      } else {
        player.trigger("miniPlayer", { isMiniPlayer });
        player.removeClass("fan-mini-player-visible");
      }
    }

    return () => {
      const allEls = [
        document.getElementById(`chapter_ftc_percentage_50`),
        document.getElementById(`chapter_ftc_percentage_95`),
      ];

      allEls.forEach((el) => {
        !!el && el.remove();
      });
    };
  }, [isMiniPlayer, player, playerType]);

  return <div data-vjs-player ref={videoRef} />;
};

export default VideoJS;
