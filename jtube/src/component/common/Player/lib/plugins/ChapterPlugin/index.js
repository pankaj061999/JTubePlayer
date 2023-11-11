import videojs from "video.js";
import ChapterMarkersProgressBarControl from "./components/ChapterMarkersProgressBarControl";

const Plugin = videojs.getPlugin("plugin");

class ChaptersPlugin extends Plugin {
  constructor(player, options) {
    super(player, options);

    if (!player || player.isDisposed()) {
      return;
    }

    this.player.ready(() => {
      this.player.addClass("vjs-captions-menu");
      this.handleProgressType(options);
    });

    this.player.one("loadedmetadata", function () {
      if (options.chapterType === undefined || options.chapters === undefined) {
        return;
      }

      if (options.chapters.length < 1) {
        return;
      }

      switch (options.chapterType.toLowerCase()) {
        case "dropdown":
          //   player.chapterDropdownControl = new ChapterDropdownControl(
          //     player,
          //     options
          //   );
          console.log("=====>chapter dropdown control");
          break;
        case "native":
        case "progressbar":
          player.chapterMarkersProgressBarControl = new ChapterMarkersProgressBarControl(
            player,
            options
          );
          break;
        case "classic":
        case "classicsmall":
        case "horizontal":
        default:
          console.log("=====>chapter horizontal control");
          break;
      }
    });
  }

  handleProgressType(options) {
    if (options.progressType == "time") {
      let lastEventTime = 0;

      this.player.on("timeupdate", (timeupdateEvent) => {
        const currentTime = Math.trunc(this.player.currentTime());

        if (currentTime != lastEventTime) {
          lastEventTime = currentTime;
          this.handleTimeUpdate(timeupdateEvent, options);
        }
      });
    } else if (options.progressType == "percentage") {
      let lastEventTime = 0;

      this.player.on("timeupdate", (timeupdateEvent) => {
        const currentTime = Math.trunc(this.player.currentTime());

        if (currentTime != lastEventTime) {
          lastEventTime = currentTime;
          this.handlePercentageUpdate(timeupdateEvent, options);
        }
      });
    }
  }

  handleTimeUpdate(timeupdateEvent, options) {
    const elapsedTime = Math.trunc(this.player.currentTime());

    const progressMarkerTimers = options.chapters.reduce((acc, cur) => {
      return { ...acc, [cur.time]: { status: true, data: cur } };
    }, {});

    if (progressMarkerTimers[elapsedTime]?.status) {
      progressMarkerTimers[elapsedTime].status = false;
      const data = progressMarkerTimers[elapsedTime]?.data;
      this.player?.trigger("chapterComplete", { ...data, options });
    }
  }

  handlePercentageUpdate(timeupdateEvent, options) {
    const elapsedTime = Math.trunc(this.player.currentTime());

    const videoDuration = this.player.duration();

    if (videoDuration === 0) {
      return;
    }

    const progressMarkerTimers = options.chapters.reduce((acc, cur) => {
      let duration =
        options.progressType === "time" ? cur.time : (videoDuration * cur.percentage) / 100;
      duration = Math.round(duration);
      return { ...acc, [duration]: { status: true, data: cur } };
    }, {});

    if (progressMarkerTimers[elapsedTime]?.status) {
      progressMarkerTimers[elapsedTime].status = false;
      const data = progressMarkerTimers[elapsedTime]?.data;
      this.player.trigger("chapterComplete", { ...data, options });
    }
  }
}

export default ChaptersPlugin;
