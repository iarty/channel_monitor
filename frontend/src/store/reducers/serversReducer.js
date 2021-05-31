import {
  FETCH_SERVERS_SUCCESS,
  SET_SERVER_ERROR,
  SET_SERVER_LOADING,
  POST_SERVER_SUCCESS,
  PUT_SERVER_SUCCESS,
  DELETE_SERVER_SUCCESS,
} from "../actions-creator/types";

const initialState = {
  servers: [],
  server: {},
  loading: false,
  error: null,
};

export const serversReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERVER_LOADING:
      return { ...state, loading: true };
    case SET_SERVER_ERROR:
      return { ...state, loading: false, error: action.payload.error };
    case POST_SERVER_SUCCESS:
      return { ...state, loading: false };
    case PUT_SERVER_SUCCESS:
      return { ...state, loading: false };
    case DELETE_SERVER_SUCCESS:
      return { ...state, loading: false };
    case FETCH_SERVERS_SUCCESS:
      return {
        ...state,
        servers: action.payload,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};
