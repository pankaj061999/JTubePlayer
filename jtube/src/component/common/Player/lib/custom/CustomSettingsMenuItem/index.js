import videojs from "video.js";
const MenuItem = videojs.getComponent("MenuItem");
const playbackRateMenuButton = videojs.getComponent("PlaybackRateMenuButton");
const component = videojs.getComponent("Component");
import { createElement } from "../../../../../../utils/player";

const toTitleCase = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

//PlaybackRateMenuButton

//CustomLoopButton

class CustomSettingsMenuItem extends MenuItem {
  constructor(player, options, entry) {
    super(player, options);

    this.menuItemName = toTitleCase(entry);

    const MenuItemComponent = videojs.getComponent(this.menuItemName);

    if (!MenuItemComponent) {
      throw new Error(`Component ${this.menuItemName} does not exist`);
    }

    this.menuItem = new MenuItemComponent(this.player(), options);

    const update = videojs.bind(this, this.update);
    const createEl = videojs.bind(this, this.createEl);

    // To update the sub menu value on click, setTimeout is needed because
    // updating the value is not instant
    const updateAfterTimeout = function () {
      setTimeout(update, 0);
    };

    // for (let item of this.subMenu.menu.children()) {
    //   if (!(item instanceof component)) {
    //     continue;
    //   }
    //   item.on("click", updateAfterTimeout);
    // }
    this.update();
  }

  createElForLoop() {
    let x = this.menuItemName;
  }

  createElForQuality() {}

  createElForPlayBack() {}

  createEl() {
    if (!this.menuItemName) {
      const el = videojs.dom.createEl("li", {
        className: "vjs-menu-item",
      });
      this.settingsSubMenuTitleEl_ = videojs.dom.createEl("div", {
        className: "vjs-settings-sub-menu-title",
      });
      el.appendChild(this.settingsSubMenuTitleEl_);
      this.settingsSubMenuValueEl_ = videojs.dom.createEl("div", {
        className: "vjs-settings-sub-menu-value",
      });
      el.appendChild(this.settingsSubMenuValueEl_);
      return el;
    }
  }

  handleClick() {
    // Remove open class to ensure only the open submenu gets this class
    videojs.dom.removeClass(this.el_, "open");

    super.handleClick();

    // Wether to add or remove vjs-hidden class on the settingsSubMenuEl element
    if (videojs.dom.hasClass(this.settingsSubMenuEl_, "vjs-hidden")) {
      videojs.dom.removeClass(this.settingsSubMenuEl_, "vjs-hidden");
    } else {
      videojs.dom.addClass(this.settingsSubMenuEl_, "vjs-hidden");
    }
  }

  update() {
    this.settingsSubMenuTitleEl_.innerHTML = this.menuItem.controlText_;
    // this.settingsSubMenuEl_.appendChild(this.subMenu?.menu?.el_);

    // Playback rate menu button doesn't get a vjs-selected class
    // or sets options_['selected'] on the selected playback rate.
    // Thus we get the submenu value based on the labelEl of playbackRateMenuButton
    // if (this.subMenu instanceof playbackRateMenuButton) {
    //   this.settingsSubMenuValueEl_.innerHTML = this.subMenu.labelEl_.innerHTML;
    // }

    //else {
    // Loop trough the submenu items to find the selected child
    // for (let subMenuItem of this.subMenu.menu.children_) {
    //   if (!(subMenuItem instanceof component)) {
    //     continue;
    //   }
    //   // Set submenu value based on what item is selected
    //   if (
    //     subMenuItem.options_.selected ||
    //     subMenuItem.hasClass("vjs-selected")
    //   ) {
    //     this.settingsSubMenuValueEl_.innerHTML = subMenuItem.options_.label;
    //   }
    // }
  }

  hideSubMenu() {
    if (videojs.dom.hasClass(this.el_, "open")) {
      videojs.dom.addClass(this.settingsSubMenuEl_, "vjs-hidden");
      videojs.dom.removeClass(this.el_, "open");
    }
  }
}

CustomSettingsMenuItem.prototype.controlText_ = "Settings";

export default CustomSettingsMenuItem;
