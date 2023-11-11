import videojs from "video.js";
const MenuButton = videojs.getComponent("MenuButton");
// const Menu = videojs.getComponent("Menu");
import CustomSettingsMenuItem from "../CustomSettingsMenuItem";
import CustomMenu from "../CustomMenu";

import CustomSettingPopupMenu from "../CustomSettingPopupMenu";

class CustomSettingsMenuButton extends MenuButton {
  constructor(player, options = {}) {
    super(player, options);

    this.el_.setAttribute("aria-label", "Settings");

    this.on(this.menuButton_, "mouseenter", () => {
      this.menu.hide();
    });
  }

  buildCSSClass() {
    return `vjs-settings-menu fan-player-vjs-settings-control ${super.buildCSSClass()}`;
  }

  createEl() {
    const el = super.createEl(
      "div",
      {
        className: this.buildWrapperCSSClass(),
      },
      {}
    );

    return el;
  }

  update() {
    const menu = this.createMenu();

    if (this.menu) {
      this.menu.dispose();
      this.removeChild(this.menu);
    }

    this.menu = menu;
    this.addChild(menu);

    this.buttonPressed_ = false;
    this.menuButton_.el_.setAttribute("aria-expanded", "false");

    if (this.items && this.items.length <= this.hideThreshold_) {
      this.hide();
      this.menu.contentEl_.removeAttribute("role");
    } else {
      this.show();
      this.menu.contentEl_.setAttribute("role", "menu");
    }
  }

  createMenu() {
    let menu = new CustomSettingPopupMenu(this.player());

    let entries = this.options_.entries;

    if (entries && entries.length) {
      const openSubMenu = function () {
        if (videojs.dom.hasClass(this.el_, "open")) {
          videojs.dom.removeClass(this.el_, "open");
        } else {
          videojs.dom.addClass(this.el_, "open");
        }
      };

      // for (let entry of entries) {
      //   let settingsMenuItem = new CustomSettingsMenuItem(
      //     this.player(),
      //     this.options_,
      //     entry
      //   );

      //   menu.addChild(settingsMenuItem);

      //   // Hide children to avoid sub menus stacking on top of each other
      //   // or having multiple menus open
      //   settingsMenuItem.on("click", videojs.bind(this, this.hideChildren));

      //   // Wether to add or remove selected class on the settings sub menu element
      //   settingsMenuItem.on("click", openSubMenu);
      // }

      for (let entry of entries) {
      }
    }

    return menu;
  }

  hideChildren() {
    for (let menuChild of this.menu.children()) {
      menuChild.hideSubMenu();
    }
  }
}

CustomSettingsMenuButton.prototype.controlText_ = "Settings";

export default CustomSettingsMenuButton;
