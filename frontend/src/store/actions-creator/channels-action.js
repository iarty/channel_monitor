import {
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNEL_SUCCESS,
  POST_CHANNEL_SUCCESS,
  DELETE_CHANNEL_SUCCESS,
  PUT_CHANNEL_SUCCESS,
  SET_CHANNEL_ERROR,
  SET_CHANNEL_LOADING,
} from "./types";
import apiV1 from "../../request";

export const getChannels = () => {
  return async (dispatch) => {
    dispatch({ type: SET_CHANNEL_LOADING });
    try {
      const response = await apiV1.get("/channels/all");

      response.data && dispatch({ type: FETCH_CHANNELS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SET_CHANNEL_ERROR, payload: error.response.data });
    }
  };
};

export const getChannelById = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_CHANNEL_LOADING });
    try {
      const response = await apiV1.get(`/channels/${id}`);
      response.data &&  dispatch({ type: FETCH_CHANNEL_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SET_CHANNEL_ERROR, payload: error.response.data });
    }
  };
};

export const postChannel = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_CHANNEL_LOADING });
    try {
      const response = await apiV1.post("/channels", data);
      response.data && dispatch({ type: POST_CHANNEL_SUCCESS, payload: response.data });
      dispatch(getChannels());
    } catch (error) {
      dispatch({ type: SET_CHANNEL_ERROR, payload: error.response.data });
    }
  };
};

export const putChannel = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_CHANNEL_LOADING });
    try {
      const response = await apiV1.put("/channels", data);
      response.data && dispatch({ type: PUT_CHANNEL_SUCCESS, payload: response.data });
      dispatch(getChannels());
    } catch (error) {
      dispatch({ type: SET_CHANNEL_ERROR, payload: error.response.data });
    }
  };
};

export const deleteChannel = (id) => {
  return async (dispatch) => {
    try {
      await apiV1.delete(`/channels/${id}`);
      dispatch({ type: DELETE_CHANNEL_SUCCESS });
      dispatch(getChannels());
    } catch (error) {}
  };
};
