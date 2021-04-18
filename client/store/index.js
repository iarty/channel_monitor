import { createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducers";
import thunk from "redux-thunk";

const makeStore = (context) => createStore(reducer, applyMiddleware(thunk));

export const wrapper = createWrapper(makeStore, { debug: true });
