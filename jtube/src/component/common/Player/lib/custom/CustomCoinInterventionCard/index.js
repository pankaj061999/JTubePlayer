import ReactDOM from "react-dom";
import videojs from "video.js";
import CoinInterventionCard from "../../components/CoinInterventionCard";

const VjsComponent = videojs.getComponent("Component");

class CustomCoinInterventionCard extends VjsComponent {
  constructor(player, options) {
    super(player, options);

    // Bind the current class context to the mountReactComponent method
    this.mountReactComponent = this.mountReactComponent.bind(this);

    // When player is ready, call method to mount the React component
    player.ready(() => this.mountReactComponent());

    // Remove the React root when this component is destroyed
    this.on("dispose", () => ReactDOM.unmountComponentAtNode(this.el()));

    player.on("miniPlayer", (_, { isMiniPlayer }) => {
      if (isMiniPlayer) {
        this.hide();
      } else {
        this.show();
      }
    });
    player.on("coinInterventionCardClose", () => {
      this.hide();
    });
  }

  createEl() {
    const options = this.options_;

    const el = videojs.dom.createEl("div", {
      className: `vjs-overlay vjs-overlay-${options.align} ${options.class}`,
    });
    return el;
  }

  mountReactComponent() {
    ReactDOM.render(
      <CoinInterventionCard vjsBridgeComponent={this} player={this.player()} />,
      this.el()
    );
  }
}

export default CustomCoinInterventionCard;
