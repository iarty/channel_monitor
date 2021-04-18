import { useRouter } from "next/router";
import ReactHlsPlayer from "react-hls-player";

const HlsPlayer = () => {
  const router = useRouter();

  return (
    <ReactHlsPlayer
      src={
        router.query?.url
          ? `http://192.168.15.5:6688${router.query.url}`
          : "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
      }
      autoPlay={false}
      controls={true}
      width="80%"
      height="auto"
    />
  );
};

export default HlsPlayer;
