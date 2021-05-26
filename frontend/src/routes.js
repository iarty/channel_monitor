import MainPage from "./views";
import AdminPanel from "./views/Admin";
import ChannelAdmin from "./views/Admin/Channels";
import ProviderAdmin from "./views/Admin/Providers";
import ServerAdmin from "./views/Admin/Servers";
import AllChannels from "./views/Channels";
import ChannelPage from "./views/Channels/ChannelCard";

export const routes = [
  { id: 1, exact: true, path: "/", component: MainPage },
  { id: 2, exact: true, path: "/channels", component: AllChannels },
  { id: 3, path: "/channels/:id", component: ChannelPage },
  {
    id: 4,
    exact: true,
    path: "/admin",
    component: AdminPanel,
  },
  {
    id: 5,
    navigated: true,
    path: "/admin/channels",
    component: ChannelAdmin,
  },
  {
    id: 6,
    navigated: true,
    path: "/admin/providers",
    component: ProviderAdmin,
  },
  {
    id: 7,
    navigated: true,
    path: "/admin/servers",
    component: ServerAdmin,
  },
];
