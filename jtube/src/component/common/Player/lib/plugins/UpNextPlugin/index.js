import videojs from "video.js";

const Plugin = videojs.getPlugin("plugin");

const defaults = {
  align: "bottom-right",
  time: 5,
};

class UpNextPlugin extends Plugin {
  constructor(player, options) {
    super(player, options);

    this.settings = videojs.obj.merge(defaults, options);

    if (!player || player.isDisposed()) {
      return;
    }

    this.player.ready(() => {
      this.handleAddUpNextComponent(options);
    });

    this.player.on("timeupdate", () => {
      const remainingTime = Math.trunc(this.player.remainingTime());
      if (remainingTime == this.settings.time) {
        this.handleShowUpNext();
      }
    });
  }

  handleShowUpNext = () => {
    const player = this.player;
    if (!player) {
      return;
    }
    player.trigger("showUpNext", { upNext: true });
  };

  handleAddUpNextComponent = () => {
    const player = this.player;
    if (!player && player?.currentTime) {
      return;
    }

    let playerChild = null;

    playerChild = player.addChild("CustomUpNextCard", this.settings);
    player.el().insertBefore(playerChild.el(), player.controlBar.el());
    return playerChild;
  };
}

export default UpNextPlugin;
