import BannerPlayer from "./Banner";
import FanPlayer from "./Fan";
import PreviewMiniPlayer from "./PreviewMini";

const PlayerTypeMapping = {
  BannerPlayer,
  FanPlayer,
  PreviewMiniPlayer,
};

const defaultPlayerType = "BannerPlayer";

const Player = ({ as, ...rest }) => {
  const PlayerType =
    (as && PlayerTypeMapping[as]) ?? PlayerTypeMapping[defaultPlayerType];
  return <PlayerType {...rest} />;
};

export default Player;
