import videojs from "video.js";

const Plugin = videojs.getPlugin("plugin");

class AutoPlayPlugin extends Plugin {
  constructor(player, options) {
    super(player, options);

    if (options.startAfter) {
      this.player.on("ready", () => {
        this.autoPlayAfterTime(options);
      });
    }
  }

  checkForInteractivity(player, autoPlayOptions) {
    const interactivityEvents = [
      "scroll",
      "click",
      "mousemove",
      "mouseover",
      "touchmove",
      "focus",
      "touch",
    ];

    const handler = () => {
      if (player.paused()) {
        player.autoplay(autoPlayOptions);
        interactivityEvents.forEach((eventName) => window.removeEventListener(eventName, handler));
      }
    };

    interactivityEvents.forEach((eventName) => {
      window.addEventListener(eventName, handler, { once: true, passive: true });
    });
  }

  autoPlayAfterTime(options) {
    const { startAfter, autoPlayOptions } = options;
    setTimeout(async () => {
      const player = this.player;

      if (!player || player.isDisposed()) {
        return;
      }

      if (options?.withInteractivity) {
        this.checkForInteractivity(player, autoPlayOptions);
      } else {
        player.autoplay(autoPlayOptions);
      }
    }, startAfter);
  }
}

export default AutoPlayPlugin;
