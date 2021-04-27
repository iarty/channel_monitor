import { combineReducers, createStore, applyMiddleware } from "redux";
import { channelsReducer } from "./channelsReducer";
import { providersReducer } from "./providersReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  channels: channelsReducer,
  providers: providersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
