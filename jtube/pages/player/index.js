import YouTubePlayer from "@/component/Player";
import CustomVideoPlayer from "@/component/Player/CustomPlayer";

const Home = () => {
  const videoId = "Oy_YlUXY_IY";
  const posterImage = "https://placekitten.com/640/360";

  const videoSource =
    "https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4";
  const posterImage1 = "https://placekitten.com/640/360";

  return (
    <div>
      <h1>Next.js Video Player</h1>
      <YouTubePlayer videoId={videoId} poster={posterImage} />

      <CustomVideoPlayer src={videoSource} poster={posterImage1} />
    </div>
  );
};

export default Home;
