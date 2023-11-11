import videojs from "video.js";

const Plugin = videojs.getPlugin("plugin");

const defaults = {
  align: "bottom-right",
  duration: 0,
  storage: false,
};

const pluginStorageKey = "plugin_missedCoinIntervention";

class MissedCoinInterventionPlugin extends Plugin {
  constructor(player, options) {
    super(player, options);

    this.settings = videojs.obj.merge(defaults, options);

    if (!player || player.isDisposed()) {
      return;
    }

    // we are keeping this variable to avoid getting localstorage access everytime
    this.isInterventionSet = false;

    let lastEventTime = 0;

    this.player.on("timeupdate", (timeupdateEvent) => {
      const currentTime = Math.trunc(this.player.currentTime());

      if (currentTime != lastEventTime) {
        lastEventTime = currentTime;
        this.handleIntervalEvent(timeupdateEvent, options);
      }
    });
  }

  handleIntervalEvent = (timeupdateEvent) => {
    if (this.isInterventionSet) {
      console.log("local intervention set is false should not run the logic");
      return;
    }

    const elapsedTime = Math.trunc(this.player.currentTime());

    if (elapsedTime == this.settings.duration) {
      console.log("player logic is being set");

      let playerChild = null;

      if (this.settings.storage) {
        let config = localStorage.getItem(pluginStorageKey);
        let expiry = this.settings.expiry;

        if (!config) {
          config = JSON.stringify({
            storage: true,
            isInterventionSet: false,
            ...(expiry && {
              expiry: new Date(new Date().getTime() + expiry).getTime(),
            }),
          });
        }

        config = JSON.parse(config);

        const isExpired = new Date().getTime() >= config.expiry;

        if (!isExpired && config.isInterventionSet) {
          return;
        }

        localStorage.setItem(
          pluginStorageKey,
          JSON.stringify({
            ...config,
            isInterventionSet: true,
            ...(isExpired &&
              expiry && {
                expiry: new Date(new Date().getTime() + expiry).getTime(),
              }),
          })
        );
      }

      this.player?.trigger("signUpIntervention");
      // playerChild = player.addChild("CustomCoinInterventionCard", this.settings);
      // player.el().insertBefore(playerChild.el(), player.controlBar.el());
      this.isInterventionSet = true;
      return playerChild;
    }
  };
}

export default MissedCoinInterventionPlugin;
