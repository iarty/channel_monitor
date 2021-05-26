import * as ChannelsActions from "./channels-action";
import * as ProvidersActions from "./providers-action";
import * as ServerActions from "./servers-action";

// eslint-disable-next-line import/no-anonymous-default-export
export default { ...ChannelsActions, ...ProvidersActions, ...ServerActions };
