import window from "global/window";
import videojs from "video.js";

const defaults = {};

const Plugin = videojs.getPlugin("plugin");

class MutedOverlayPlugin extends Plugin {
  constructor(player, options) {
    super(player, options);

    this.player.one("playing", () => {
      this.handleMutedOverlay(this.player, videojs.obj.merge(defaults, options));
    });

    this.player.on("miniPlayer", (_, { isMiniPlayer }) => {
      if (isMiniPlayer) {
        player.removeChild("CustomPlayerMuteButton");
      } else {
        this.handleMutedOverlay(this.player, videojs.obj.merge(defaults, options));
      }
    });
  }

  handleMutedOverlay = (player, options) => {
    const muted = player.muted();

    if (muted) {
      if (videojs.browser.TOUCH_ENABLED) {
        const controlBarIdx = player.children_.indexOf(player.getChild("ControlBar"));

        player.touchOverlay = player.addChild(
          "CustomPlayerMuteButton",
          options.touchControls,
          controlBarIdx
        );
      }
    }
  };
}

export default MutedOverlayPlugin;
