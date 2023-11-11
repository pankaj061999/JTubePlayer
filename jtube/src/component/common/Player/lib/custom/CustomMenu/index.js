import videojs from "video.js";
const MenuButton = videojs.getComponent("MenuButton");
const Menu = videojs.getComponent("Menu");
import { createElement } from "../../../../../../utils/player";

class CustomMenu extends Menu {
  constructor(player, options = {}) {
    super(player, options);

    this.preventEventBubble_ = (e) => this.preventEventBubble(e);
  }

  preventEventBubble(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  createEl() {
    const contentElType = this.options_.contentElType || "ul";

    this.contentEl_ = createElement(contentElType, {
      className: "vjs-menu-content",
    });

    this.contentEl_.setAttribute("role", "menu");

    const el = createElement("div", {
      append: this.contentEl_,
      className: "vjs-menu fan-player-vjs-submenu",
    });

    el.appendChild(this.contentEl_);

    // Prevent clicks from bubbling up. Needed for Menu Buttons,
    // where a click on the parent is significant
    // Events.on(el, "click", function (event) {
    //   event.preventDefault();
    //   event.stopImmediatePropagation();
    // });
    // this.on(el, "click", this.preventEventBubble_);

    return el;
  }
}

export default CustomMenu;
