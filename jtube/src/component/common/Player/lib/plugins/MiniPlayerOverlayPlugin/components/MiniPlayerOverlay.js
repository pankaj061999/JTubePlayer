import videojs from "video.js";

const Component = videojs.getComponent("Component");

const dom = videojs.dom || videojs;

class MiniPlayerOverlay extends Component {
  constructor(player, options) {
    super(player, options);

    this.seekSeconds = options.seekSeconds;
    this.tapTimeout = options.tapTimeout;

    this.addChild("CustomPlayToggle");

    if (this.player_.options_.inactivityTimeout === 0) {
      this.player_.options_.inactivityTimeout = 5000;
    }

    player.on(["playing", "userinactive"], (e) => {
      this.manageClassOfPlayToggleForTouchDevices(true);
    });

    player.on("mouseenter", () => {
      this.addClass("show-play-toggle");
      this.manageClassOfPlayToggleForTouchDevices(false);
    });

    player.on("mouseleave", () => {
      this.removeClass("show-play-toggle");
      this.manageClassOfPlayToggleForTouchDevices(false);
    });

    this.enable();
  }

  createEl() {
    const el = dom.createEl("div", {
      className: "fan-mini-player-vjs-touch-overlay",
      tabIndex: -1,
    });

    return el;
  }

  manageClassOfPlayToggleForTouchDevices(addClass) {
    if (videojs.browser.TOUCH_ENABLED) {
      if (addClass) {
        this.addClass("hide-play-toggle");
      } else {
        this.removeClass("hide-play-toggle");
      }
    }
  }

  handleTap(event) {
    // Don't handle taps on the play button
    if (event.target !== this.el_) {
      return;
    }

    event.preventDefault();

    this.firstTapCaptured = true;
    this.timeout = setTimeout(() => {
      this.firstTapCaptured = false;
      this.handleSingleTap(event);
    }, this.tapTimeout);
  }

  handleSingleTap(event) {
    this.toggleClass("show-play-toggle");
  }

  enable() {
    this.firstTapCaptured = false;
    this.on("touchend", this.handleTap);
  }

  disable() {
    this.off("touchend", this.handleTap);
  }
}

Component.registerComponent("MiniPlayerOverlay", MiniPlayerOverlay);

export default MiniPlayerOverlay;
