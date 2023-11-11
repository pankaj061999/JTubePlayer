import { useMediaQuery } from "@mui/material";
import DesktopAppMiniPlayer from "./DesktopAppMiniPlayer";
import MobileAppMiniPlayer from "./MobileAppMiniPlayer";

const AppMiniPlayer = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  return isMobile ? <MobileAppMiniPlayer /> : <DesktopAppMiniPlayer />;
};

export default AppMiniPlayer;
