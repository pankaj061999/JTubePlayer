import ReactDOM from "react-dom";
import videojs from "video.js";
import SettingPopupMenu from "../../components/SettingPopupMenu";

import CustomMenu from "../CustomMenu";

const Component = videojs.getComponent("Component");
const Menu = videojs.getComponent("Menu");

class CustomSettingPopupMenu extends CustomMenu {
  constructor(player, options) {
    super(player, options);

    // Bind the current class context to the mountReactComponent method
    this.mountReactComponent = this.mountReactComponent.bind(this);

    // When player is ready, call method to mount the React component
    player.ready(() => this.mountReactComponent());

    // Remove the React root when this component is destroyed
    this.on("dispose", () => ReactDOM.unmountComponentAtNode(this.el()));
    //this.controlText("Setting Popup");
  }

  mountReactComponent() {
    ReactDOM.render(
      <SettingPopupMenu vjsBridgeComponent={this} player={this.player()} />,
      this.el()
    );
  }
}

export default CustomSettingPopupMenu;
