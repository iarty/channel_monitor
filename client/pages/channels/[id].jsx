import HlsPlayer from "../../components/HlsPlayer";
import { useRouter } from "next/router";

const ChannelItem = () => {
  const router = useRouter();
  console.log(router.query.url);
  const url = router.query?.url;

  return (
    <>
      <HlsPlayer url={url} />
    </>
  );
};

export default ChannelItem;
