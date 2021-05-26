import { combineReducers, createStore, applyMiddleware } from "redux";
import { channelsReducer } from "./channelsReducer";
import { providersReducer } from "./providersReducer";
import { serversReducer } from "./serversReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  channels: channelsReducer,
  providers: providersReducer,
  servers: serversReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
