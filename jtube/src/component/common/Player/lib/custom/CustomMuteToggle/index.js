import videojs from "video.js";

import { createElement } from "../../../../../../utils/player";

const VjsMuteToggleComponent = videojs.getComponent("MuteToggle");

class CustomMuteToggle extends VjsMuteToggleComponent {
  constructor(player, options = {}) {
    super(player, options);
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

export default CustomMuteToggle;
