import ReactHlsPlayer from "react-hls-player";

const HlsPlayer = ({ url }) => {
  return (
    <div>
      <ReactHlsPlayer
        src={
          url
            ? url
            : "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
        }
        autoPlay={false}
        controls={true}
        width="80%"
        height="auto"
      />
    </div>
  );
};

export default HlsPlayer;
