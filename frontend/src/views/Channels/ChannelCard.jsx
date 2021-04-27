import HlsPlayer from "../../components/HlsPlayer";
import { useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAction } from "../../hooks/useActions";

const ChannelItem = () => {
  const { params } = useRouteMatch();
  const dispatch = useDispatch();
  const { getChannelById } = useAction();
  const { channel } = useSelector((state) => state.channels);

  useEffect(() => {
    dispatch(() => getChannelById(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <div className="text-center">
      <h2>{channel.name}</h2>
      <HlsPlayer url={channel.url} />
    </div>
  );
};

export default ChannelItem;
