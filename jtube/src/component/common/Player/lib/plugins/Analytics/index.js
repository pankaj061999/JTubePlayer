import videojs from "video.js";

const Plugin = videojs.getPlugin("plugin");

class AnalyticsPlugin extends Plugin {
  constructor(player, options) {
    super(player, options);

    this.options = videojs.obj.merge({}, options);

    if (!player || player.isDisposed()) {
      return;
    }

    this.player.ready(this.handleEvents.bind(this));
    this.isVideoStarted = false;
  }

  handleEvents() {
    const eventNames = this.options.events;

    if (eventNames.includes("interval")) {
      const eventOptions = this.options["interval"];

      let lastEventTime = 0;

      this.player.on("timeupdate", (timeupdateEvent) => {
        const currentTime = Math.trunc(this.player.currentTime());

        if (currentTime != lastEventTime) {
          lastEventTime = currentTime;
          this.handleIntervalEvent(timeupdateEvent, eventOptions);
        }
      });
    }

    if (eventNames.includes("start")) {
      this.handleVideoStartEvent();
    }
  }

  handleVideoStartEvent() {
    this.player.on("playing", () => {
      if (!this.isVideoStarted) {
        this.player.one("timeupdate", (_) => {
          const elapsedTime = Math.round(this.player?.currentTime());

          if (elapsedTime === 0 && !this.player.paused()) {
            this.player.trigger("start", { currentTime: elapsedTime });
            this.isVideoStarted = true;
          }
        });
      }
    });
  }

  handleIntervalEvent(_, eventOptions) {
    const { secondsToCall, label } = eventOptions;

    const elapsedTime = Math.trunc(this.player.currentTime());

    if (elapsedTime !== 0 && elapsedTime % secondsToCall == 0) {
      if (eventOptions.strict) {
        const isPlayerPaused = this.player.paused();
        !isPlayerPaused && this.player.trigger("intervalEvent", { label, secondsToCall });
      } else {
        this.player.trigger("intervalEvent", { label, secondsToCall });
      }
    }
  }
}

export default AnalyticsPlugin;
