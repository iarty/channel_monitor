import {
  FETCH_CHANNELS_SUCCESS,
  SET_CHANNEL_ERROR,
  SET_CHANNEL_LOADING,
  POST_CHANNEL_SUCCESS,
  PUT_CHANNEL_SUCCESS,
  DELETE_CHANNEL_SUCCESS,
} from "../actions-creator/types";

const initialState = {
  channels: [],
  channel: {},
  loading: false,
  error: null,
};

export const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNEL_LOADING:
      return { ...state, loading: true };
    case SET_CHANNEL_ERROR:
      return { ...state, loading: false, error: action.payload.error };
    case POST_CHANNEL_SUCCESS:
      return { ...state, loading: false };
    case PUT_CHANNEL_SUCCESS:
      return { ...state, loading: false };
    case DELETE_CHANNEL_SUCCESS:
      return { ...state, loading: false };
    case FETCH_CHANNELS_SUCCESS:
      return {
        ...state,
        channels: action.payload,
        channel: {},
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};
