import videojs from "video.js";

import { createElement } from "../../../../../../utils/player";

const VjsFullScreenToggleComponent = videojs.getComponent("FullscreenToggle");

class CustomFullScreenToggle extends VjsFullScreenToggleComponent {
  constructor(player, options = {}) {
    super(player, options);

    this.initIcons();

    player.on("handleFullscreenChange", (e) => this.handleFullscreenChange(e));
  }

  initIcons() {
    const isFullScreen = this.player().isFullscreen();

    if (isFullScreen) {
      this.removeClass("fan-player-vjs-screen-control-full");
      this.addClass("fan-player-vjs-screen-control-mini");
    } else {
      this.removeClass("fan-player-vjs-screen-control-mini");
      this.addClass("fan-player-vjs-screen-control-full");
    }
  }

  handleFullscreenChange(e) {
    const isFullScreen = this.player().isFullscreen();

    if (isFullScreen) {
      this.removeClass("fan-player-vjs-screen-control-full");
      this.addClass("fan-player-vjs-screen-control-mini");
    } else {
      this.removeClass("fan-player-vjs-screen-control-mini");
      this.addClass("fan-player-vjs-screen-control-full");
    }

    super.handleFullscreenChange(e);
  }

  createEl(tag, props = {}, attributes = {}) {
    tag = "button";

    props = Object.assign(
      {
        className: super.buildCSSClass(),
      },
      props
    );

    attributes = Object.assign(
      {
        type: "button",
      },
      attributes
    );

    const el = createElement(tag, props, attributes);

    el.appendChild(
      createElement(
        "span",
        {
          className: "fan-player-vjs-icon-placeholder",
        },
        {
          "aria-hidden": true,
        }
      )
    );

    this.createControlTextEl(el);

    return el;
  }
}

export default CustomFullScreenToggle;
