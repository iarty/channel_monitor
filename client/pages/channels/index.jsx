import ChannelCard from "../../components/ChannelCard/index";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { wrapper } from "../../store";
import { getChannels } from "../../store/actions-creator/channels-action";

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    await store.dispatch(await getChannels());
  }
);

const Channels = () => {
  const router = useRouter();
  const { channels, loading, error } = useSelector((state) => state.channels);

  if (error) return <div>{error}</div>;

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <div className="d-flex flex-wrap">
      {channels.map((el) => (
        <ChannelCard
          key={el.id}
          name={el.name}
          status={el.status}
          datetime={Date.now()}
          provider={el.provider.name}
          onClick={() =>
            router.push({
              pathname: `/channels/${el.id}`,
              query: { url: el.url },
            })
          }
        />
      ))}
    </div>
  );
};

export default Channels;
