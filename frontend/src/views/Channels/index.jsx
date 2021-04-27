import ChannelCard from "../../components/ChannelCard/index";
import { useHistory } from "react-router-dom";
import { useChannels } from "../../hooks/useChannels";
import { Spinner } from "react-bootstrap";

const Channels = () => {
  const history = useHistory();
  const { channels } = useChannels();
  console.log("RERENDER");
  return (
    <div className="d-flex flex-wrap">
      {channels.length ? (
        channels.map((el) => (
          <ChannelCard
            key={el.id}
            name={el.name}
            status={el.status}
            datetime={el.lastDate}
            provider={el?.provider.name}
            onClick={() =>
              history.push({
                pathname: `/channels/${el.id}`,
              })
            }
          />
        ))
      ) : (
        <div className="m-auto">
          <Spinner animation="border" role="status" size="xl" />
        </div>
      )}
    </div>
  );
};

export default Channels;
