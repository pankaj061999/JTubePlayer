import ReactDOM from "react-dom";
import videojs from "video.js";
import BannerController from "../../components/BannerController";

const VjsComponent = videojs.getComponent("Component");

class CustomBannerController extends VjsComponent {
  constructor(player, options) {
    super(player, options);

    // Bind the current class context to the mountReactComponent method
    this.mountReactComponent = this.mountReactComponent.bind(this);

    // When player is ready, call method to mount the React component
    player.ready(() => this.mountReactComponent());

    // Remove the React root when this component is destroyed
    this.on("dispose", () => ReactDOM.unmountComponentAtNode(this.el()));
  }

  mountReactComponent() {
    ReactDOM.render(
      <BannerController vjsBridgeComponent={this} player={this.player()} />,
      this.el()
    );
  }
}

export default CustomBannerController;
