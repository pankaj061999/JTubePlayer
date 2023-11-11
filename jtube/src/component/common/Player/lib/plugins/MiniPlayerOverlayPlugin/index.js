import window from "global/window";
import videojs from "video.js";
import "./components/MiniPlayerOverlay.js";

const defaults = {
  fullscreen: {
    enterOnRotate: true,
    exitOnRotate: true,
    lockOnRotate: true,
    iOS: false,
    disabled: false,
  },
  touchControls: {
    seekSeconds: 10,
    tapTimeout: 300,
    disableOnEnd: false,
    disabled: false,
  },
};

const screen = window.screen;

const Plugin = videojs.getPlugin("plugin");

class MiniPlayerOverlayPlugin extends Plugin {
  constructor(player, options) {
    super(player, options);

    this.player.on("miniPlayer", (_, { isMiniPlayer }) => {
      if (isMiniPlayer) {
        this.onMiniPlayerReady(this.player, videojs.obj.merge(defaults, options));
      } else {
        player.controlBar.show();
        player.removeChild("MiniPlayerOverlay");
      }
    });
  }

  getOrientation = () => {
    if (screen) {
      const orientationString = (
        (screen.orientation || {}).type ||
        screen.mozOrientation ||
        screen.msOrientation ||
        ""
      ).split("-")[0];

      if (orientationString === "landscape" || orientationString === "portrait") {
        return orientationString;
      }
    }

    // iOS only supports window.orientation
    if (typeof window.orientation === "number") {
      if (window.orientation === 0 || window.orientation === 180) {
        return "portrait";
      }
      return "landscape";
    }

    return "portrait";
  };

  onMiniPlayerReady = (player, options) => {
    if (!options.touchControls.disabled) {
      const controlBarIdx = player.children_.indexOf(player.getChild("ControlBar"));

      player.controlBar.hide();

      player.touchOverlay = player.addChild(
        "MiniPlayerOverlay",
        options.touchControls,
        controlBarIdx
      );
    }
  };
}

export default MiniPlayerOverlayPlugin;
