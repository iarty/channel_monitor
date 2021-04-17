import ChannelCard from "../../components/ChannelCard";
const mock = [
  {
    name: "КТРК (ОТРК)",
    url: "/str03/ktrk/output.m3u8",
    status: "ok",
    providerId: "Megacom",
  },
  {
    name: "Баластан (ОТРК)",
    url: "/str03/balastan/output.m3u8",
    status: "ok",
    providerId: "Megacom",
  },
  {
    name: "Маданият Тарых Тил",
    url: "/str03/madaniyat/output.m3u8",
    status: "fail",
    providerId: "Megacom",
  },
  {
    name: "Музыка (КТР)",
    url: "/str03/ktrkmuzyka/output.m3u8",
    status: "fail",
    providerId: "Megacom",
  },
  {
    name: "Ала-Тоо 24",
    url: "/str10/alatoo/output.m3u8",
    status: "ok",
    providerId: "Megacom",
  },
  {
    name: "Спорт (КТРК)",
    url: "/str10/ktrksport/output.m3u8",
    status: "ok",
    providerId: "Megacom",
  },
];

const Channels = () => {
  return (
    <div className="d-flex">
      {mock.map((el) => (
        <ChannelCard
          key={Math.random()}
          name={el.name}
          status={el.status}
          datetime={Date.now()}
          provider={el.providerId}
        />
      ))}
    </div>
  );
};

export default Channels;
