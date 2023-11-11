import ReactDOM from "react-dom";
import videojs from "video.js";
import UpNextCard from "../../components/UpNextCard";

const VjsComponent = videojs.getComponent("Component");

class CustomUpNextCard extends VjsComponent {
  constructor(player, options) {
    super(player, options);

    // Bind the current class context to the mountReactComponent method
    this.mountReactComponent = this.mountReactComponent.bind(this);

    // we are keeping this variable to avoid getting localstorage access everytime
    this.isInterventionSet = false;

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
    player.on("upNextCardClose", () => {
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
      <UpNextCard vjsBridgeComponent={this} player={this.player()} options={this.options_} />,
      this.el()
    );
  }
}

export default CustomUpNextCard;
