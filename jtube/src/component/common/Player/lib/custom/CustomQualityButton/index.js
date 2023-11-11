import ReactDOM from "react-dom";
import videojs from "video.js";
import QualityButton from "../../components/QualityButton";

const VjsButtonComponent = videojs.getComponent("Button");

class CustomQualityButton extends VjsButtonComponent {
  constructor(player, options) {
    super(player, options);

    // Bind the current class context to the mountReactComponent method
    this.mountReactComponent = this.mountReactComponent.bind(this);

    // When player is ready, call method to mount the React component
    player.ready(() => this.mountReactComponent());

    // Remove the React root when this component is destroyed
    this.on("dispose", () => ReactDOM.unmountComponentAtNode(this.el()));
    this.controlText("Quality");
  }

  mountReactComponent() {
    ReactDOM.render(<QualityButton vjsBridgeComponent={this} player={this.player()} />, this.el());
  }
}

export default CustomQualityButton;
