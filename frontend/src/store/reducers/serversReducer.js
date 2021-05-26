import {
  FETCH_PROVIDERS_SUCCESS,
  SET_PROVIDER_ERROR,
  SET_PROVIDER_LOADING,
  POST_PROVIDER_SUCCESS,
  PUT_PROVIDER_SUCCESS,
  DELETE_PROVIDER_SUCCESS,
} from "../actions-creator/types";

const initialState = {
  servers: [],
  server: {},
  loading: false,
  error: null,
};

export const serversReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROVIDER_LOADING:
      return { ...state, loading: true };
    case SET_PROVIDER_ERROR:
      return { ...state, loading: false, error: action.payload.error };
    case POST_PROVIDER_SUCCESS:
      return { ...state, loading: false };
    case PUT_PROVIDER_SUCCESS:
      return { ...state, loading: false };
    case DELETE_PROVIDER_SUCCESS:
      return { ...state, loading: false };
    case FETCH_PROVIDERS_SUCCESS:
      return {
        ...state,
        providers: action.payload,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};
