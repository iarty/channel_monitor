import ChannelCard from "../../components/ChannelCard/index";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useActions";
import { Spinner } from "react-bootstrap";
import { wrapper } from "../../store";
const mock = [
  {
    name: "КТРК (ОТРК)",
    url: "/str03/ktrk/output.m3u8",
    status: "ok",
    providerId: "Megacom",
    id: 1,
  },
  {
    name: "Баластан (ОТРК)",
    url: "/str03/balastan/output.m3u8",
    status: "ok",
    providerId: "Megacom",
    id: 2,
  },
  {
    name: "Маданият Тарых Тил",
    url: "/str03/madaniyat/output.m3u8",
    status: "fail",
    providerId: "Megacom",
    id: 3,
  },
  {
    name: "Музыка (КТР)",
    url: "/str03/ktrkmuzyka/output.m3u8",
    status: "fail",
    providerId: "Megacom",
    id: 5,
  },
  {
    name: "Ала-Тоо 24",
    url: "/str10/alatoo/output.m3u8",
    status: "ok",
    providerId: "Megacom",
    id: 6,
  },
  {
    name: "Спорт (КТРК)",
    url: "/str10/ktrksport/output.m3u8",
    status: "ok",
    providerId: "Megacom",
    id: 4,
  },
];

const Channels = () => {
  const router = useRouter();
  const { channels, loading, error } = useSelector((state) => state.channels);
  console.log(channels);

  if (error) return <div>{error}</div>;

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <div className="d-flex">
      {mock.map((el) => (
        <ChannelCard
          key={Math.random()}
          name={el.name}
          status={el.status}
          datetime={Date.now()}
          provider={el.providerId}
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

export const getServerSiderProps = wrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(await getChannels());
  }
);
