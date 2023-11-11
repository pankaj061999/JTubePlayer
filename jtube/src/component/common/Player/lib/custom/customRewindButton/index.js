import ReactDOM from "react-dom";
import videojs from "video.js";
import RewindButton from "../../components/RewindButton";

const VjsButtonComponent = videojs.getComponent("Button");

class CustomRewindButton extends VjsButtonComponent {
  constructor(player, options) {
    super(player, options);

    // Bind the current class context to the mountReactComponent method
    this.mountReactComponent = this.mountReactComponent.bind(this);

    // When player is ready, call method to mount the React component
    player.ready(() => this.mountReactComponent());

    // Remove the React root when this component is destroyed
    this.on("dispose", () => ReactDOM.unmountComponentAtNode(this.el()));
    this.controlText("Rewind 10 seconds");
  }

  handleClick() {
    const sec = -10;
    const player = this.player();

    let time = player.currentTime() + sec;

    if (time < 0) {
      time = 0;
    }

    player.currentTime(time);
    player.trigger("backwardSkip", { skipDuration: sec });
  }

  mountReactComponent() {
    ReactDOM.render(<RewindButton vjsBridgeComponent={this} player={this.player()} />, this.el());
  }
}

export default CustomRewindButton;
