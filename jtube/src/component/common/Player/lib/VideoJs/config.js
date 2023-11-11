import { registerComponents, registerPlugins } from "../../../../../utils/player";

import CustomAddToPlaylistButton from "../custom/customAddToPlaylistButton";
import CustomBannerController from "../custom/customBannerController";
import CustomForwardButton from "../custom/customForwardButton";
import CustomFullScreenToggle from "../custom/customFullScreenToggle";
import CustomLoopButton from "../custom/CustomLoopButton";
import CustomMuteToggle from "../custom/CustomMuteToggle";
import CustomPlayToggle from "../custom/customPlayToggle";
import PreviewMiniController from "../custom/CustomPreviewMiniController";
import CustomPreviousButton from "../custom/customRewindButton";
import CustomSettingPopupMenu from "../custom/CustomSettingPopupMenu";
import CustomSettingsMenuButton from "../custom/CustomSettingsMenuButton";
import CustomSettingsMenuItem from "../custom/CustomSettingsMenuItem";
import CustomVolumePanel from "../custom/customVolumePanel";
import CustomMiniPlayerController from "../custom/CustomMiniPlayerController";
import CustomCoinInterventionCard from "../custom/CustomCoinInterventionCard";
import CustomEarnCoinInterventionCard from "../custom/CustomEarnCoinInterventionCard";
import CustomPlayerMuteButton from "../custom/customPlayerMuteButton";
import CustomNextButton from "../custom/CustomNextButton";
import CustomAppMiniPlayerController from "../custom/CustomAppMiniPlayerController";
import CustomUpNextCard from "../custom/CustomUpNextCard";

import AnalyticsPlugin from "../plugins/Analytics";
import AutoPlayPlugin from "../plugins/AutoPlayPugin";
import ChaptersPlugin from "../plugins/ChapterPlugin";
import MiniPlayerOverlayPlugin from "../plugins/MiniPlayerOverlayPlugin";
import MissedCoinInterventionPlugin from "../plugins/MissedCoinInterventionPlugin";
import EarnCoinInterventionPlugin from "../plugins/EarnCoinInterventionPlugin";
import MutedOverlayPlugin from "../plugins/MutedOverlayPlugin";
import UpNextPlugin from "../plugins/UpNextPlugin";

const registerPlayerExternals = () => {
  registerComponents([
    {
      name: "CustomForwardButton",
      componentToRegister: CustomForwardButton,
    },
    {
      name: "CustomPlayToggle",
      componentToRegister: CustomPlayToggle,
    },
    {
      name: "CustomPreviousButton",
      componentToRegister: CustomPreviousButton,
    },
    {
      name: "CustomVolumePanel",
      componentToRegister: CustomVolumePanel,
    },
    {
      name: "MuteToggle",
      componentToRegister: CustomMuteToggle,
    },
    {
      name: "CustomLoopButton",
      componentToRegister: CustomLoopButton,
    },
    {
      name: "CustomAddToPlaylistButton",
      componentToRegister: CustomAddToPlaylistButton,
    },
    {
      name: "CustomFullScreenToggle",
      componentToRegister: CustomFullScreenToggle,
    },
    {
      name: "CustomBannerController",
      componentToRegister: CustomBannerController,
    },
    {
      name: "PreviewMiniController",
      componentToRegister: PreviewMiniController,
    },
    {
      name: "settingsMenuButton",
      componentToRegister: CustomSettingsMenuButton,
    },
    {
      name: "CustomSettingsMenuItem",
      componentToRegister: CustomSettingsMenuItem,
    },
    {
      name: "CustomSettingPopupMenu",
      componentToRegister: CustomSettingPopupMenu,
    },
    {
      name: "CustomMiniPlayerController",
      componentToRegister: CustomMiniPlayerController,
    },
    {
      name: "CustomCoinInterventionCard",
      componentToRegister: CustomCoinInterventionCard,
    },
    {
      name: "CustomEarnCoinInterventionCard",
      componentToRegister: CustomEarnCoinInterventionCard,
    },
    {
      name: "CustomPlayerMuteButton",
      componentToRegister: CustomPlayerMuteButton,
    },
    {
      name: "CustomNextButton",
      componentToRegister: CustomNextButton,
    },
    {
      name: "CustomAppMiniPlayerController",
      componentToRegister: CustomAppMiniPlayerController,
    },
    {
      name: "CustomUpNextCard",
      componentToRegister: CustomUpNextCard,
    },
  ]);

  registerPlugins([
    {
      name: "autoPlayPlugin",
      pluginToRegister: AutoPlayPlugin,
    },
    {
      name: "chapters",
      pluginToRegister: ChaptersPlugin,
    },
    {
      name: "analytics",
      pluginToRegister: AnalyticsPlugin,
    },
    {
      name: "miniPlayerOverlay",
      pluginToRegister: MiniPlayerOverlayPlugin,
    },
    {
      name: "missedCoinIntervention",
      pluginToRegister: MissedCoinInterventionPlugin,
    },
    {
      name: "earnCoinIntervention",
      pluginToRegister: EarnCoinInterventionPlugin,
    },
    {
      name: "mutedOverlayPlugin",
      pluginToRegister: MutedOverlayPlugin,
    },
    {
      name: "upNext",
      pluginToRegister: UpNextPlugin,
    },
  ]);
};

export default registerPlayerExternals;
