import videojs from "video.js";

import { createElement } from "../../../../../../utils/player";

const VjsPlayToggleComponent = videojs.getComponent("PlayToggle");

class CustomPlayToggle extends VjsPlayToggleComponent {
  constructor(player, options = {}) {
    super(player, options);
    this.init();
  }

  init() {
    const player = this.player();

    const isPlayerPaused = player.paused();

    if (isPlayerPaused) {
      this.addClass("fan-player-vjs-play-control-paused");
    } else {
      this.addClass("fan-player-vjs-play-control-playing");
    }
  }

  handlePause(event) {
    this.removeClass("fan-player-vjs-play-control-playing");
    super.handlePause(event);
    this.addClass("fan-player-vjs-play-control-paused");
  }

  handlePlay(event) {
    this.removeClass("fan-player-vjs-play-control-paused");
    super.handlePlay(event);
    this.addClass("fan-player-vjs-play-control-playing");
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

export default CustomPlayToggle;
