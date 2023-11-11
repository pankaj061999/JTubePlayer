// import throttle from "lodash/throttle";
import videojs from "video.js";

const Plugin = videojs.getPlugin("plugin");

const defaults = {
  align: "bottom-right",
  duration: 0,
  storage: false,
};

const pluginStorageKey = "plugin_earnCoinIntervention";

class EarnCoinInterventionPlugin extends Plugin {
  constructor(player, options) {
    super(player, options);

    this.settings = videojs.obj.merge(defaults, options);

    // this.player.on(
    //   "chapterComplete",
    //   throttle((_, chapterCompleteObj) => this.handleIntervalEvent(_, chapterCompleteObj), 1000)
    // );
  }

  handleIntervalEvent = (_, chapterCompleteObj) => {
    if (chapterCompleteObj?.percentage == 85) {
      if (this.isInterventionSet) {
        console.log("local intervention set is false should not run the logic");
        return;
      }

      const player = this.player;

      if (!player && player?.currentTime) {
        return;
      }

      if (this.settings.storage) {
        let config = localStorage.getItem(pluginStorageKey);
        let nextDay = this.settings.nextDay;

        if (!config) {
          config = JSON.stringify({
            storage: true,
            isInterventionSet: false,
            dayCount: 0,
            ...(nextDay && {
              nextDay: new Date(new Date().getTime() + nextDay).getTime(),
            }),
          });
        }

        config = JSON.parse(config);

        const isNextDay = new Date().getTime() >= config.nextDay;

        if (!isNextDay && config.isInterventionSet) {
          return;
        }

        localStorage.setItem(
          pluginStorageKey,
          JSON.stringify({
            ...config,
            isInterventionSet: true,
            dayCount: config.dayCount + 1,
            ...(isNextDay &&
              nextDay && {
                nextDay: new Date(new Date().getTime() + nextDay).getTime(),
              }),
          })
        );
      }

      let playerChild = null;

      playerChild = player.addChild(
        "CustomEarnCoinInterventionCard",
        this.settings
      );
      player.el().insertBefore(playerChild.el(), player.controlBar.el());
      return playerChild;
    }
  };
}

export default EarnCoinInterventionPlugin;
