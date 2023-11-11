import videojs from "video.js";

import { createElement } from "../../../../../../utils/player";

import CustomMuteToggle from "../CustomMuteToggle";

const VjsVolumePanelComponent = videojs.getComponent("VolumePanel");

class CustomVolumePanel extends VjsVolumePanelComponent {
  constructor(player, options = {}) {
    super(player, options);

    this.muteToggle = new CustomMuteToggle(player, options);

    player.on("volumechange", (e) => this.handleVolumeChange(e));
    player.one("playing", (e) => this.handleVolumeChange(e));

    this.init();
  }

  init() {
    this.handleVolumeChange();
  }

  handleVolumeChange() {
    const player = this.player();
    const muteStatus = player.muted() || player.volume() == 0;

    if (muteStatus) {
      this.removeClass("fan-player-vjs-mute-control-unmuted");
      this.addClass("fan-player-vjs-mute-control-muted");
    } else {
      this.removeClass("fan-player-vjs-mute-control-muted");
      this.addClass("fan-player-vjs-mute-control-unmuted");
    }
  }

  createEl() {
    let orientationClass = "vjs-volume-panel-horizontal";

    if (!this.options_.inline) {
      orientationClass = "vjs-volume-panel-vertical";
    }
    const el = createElement("div", {
      className: `vjs-volume-panel vjs-control ${orientationClass}`,
    });
    return el;
  }
}

VjsVolumePanelComponent.prototype.options_ = {
  children: ["muteToggle", "volumeControl"],
};

export default CustomVolumePanel;
