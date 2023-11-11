import videojs from "video.js";

const Component = videojs.getComponent("Component");

class ChapterMarkersProgressBarControl extends Component {
  constructor(player, options) {
    super(player, options);

    if (options.chapters === undefined) {
      options.chapters = [];
    }

    player.ready(() => {
      ChapterMarkersProgressBarControl.addMarkers(options, player);
    });
  }

  static addMarkers(options, player) {
    const chapters = options.chapters;
    const videoDuration = player.duration();
    const maxChapters = chapters.length;

    const playerContainer = player.el();

    const progressHolder = playerContainer.getElementsByClassName("vjs-progress-holder")[0];

    for (let i = 0; i < maxChapters; i++) {
      if (chapters[i].time < 0 || chapters[i].time > videoDuration) {
        continue;
      }

      if (chapters[i]?.withoutCoin) {
        continue;
      }

      const fanCoinEl = videojs.dom.createEl("button", {
        className: `fan-player-vjs-marker-fan-coin`,
      });

      let percentage = 0;

      if (options.progressType === "time") {
        percentage = (chapters[i]?.time / videoDuration) * 100;
      } else {
        percentage = chapters[i]?.percentage;
      }

      fanCoinEl.setAttribute("title", `Earn coins once you complete ${chapters[i].label} video`);
      fanCoinEl.id = "cp" + i;
      fanCoinEl.style.left = percentage + "%";

      progressHolder.appendChild(fanCoinEl);

      if (chapters[i].withCoinFlyAnimation) {
        const { chapterType } = options.withCoinFlyAnimation;
        const times = chapterType[chapters[i]?.percentage].times;

        const coinConfigs = Array(times).fill(chapterType[chapters[i]?.percentage]);

        if (i === 0) {
          const existingFlyCoinEl = document.getElementsByClassName(
            "fan-player-vjs-coin-marker-fan-coin"
          );

          Array.from(existingFlyCoinEl).forEach((el) => el.remove());
        }

        coinConfigs.forEach((item, idx) => {
          const flyCoinEl = videojs.dom.createEl("img", {
            className: `fan-player-vjs-coin-marker-fan-coin vjs-hidden`,
            id: `chapter_ftc_${options.progressType}_${chapters[i].percentage}_time${idx + 1}`,
          });

          flyCoinEl.setAttribute("src", "/gifs/coin_flip.gif");

          const { top, left } = fanCoinEl.getBoundingClientRect();

          flyCoinEl.style.left = `${left}px`;
          flyCoinEl.style.top = `${top + window.scrollY}px`;

          document.body.appendChild(flyCoinEl);
        });
      }
    }
  }
}

videojs.registerComponent("ChapterMarkersProgressBarControl", ChapterMarkersProgressBarControl);

export default ChapterMarkersProgressBarControl;
