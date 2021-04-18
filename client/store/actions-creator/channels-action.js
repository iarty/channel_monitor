import {
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNEL_SUCCESS,
  POST_CHANNEL_SUCCESS,
  DELETE_CHANNEL_SUCCESS,
  PUT_CHANNEL_SUCCESS,
  SET_ERROR,
  SET_LOADING,
} from "./types";
import axios from "../../axios";
export const getChannels = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get("/channels/all");
      if (response.data)
        dispatch({ type: FETCH_CHANNELS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data });
    }
  };
};

export const getChannelById = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(`/channels/${id}`);
      if (response.data)
        dispatch({ type: FETCH_CHANNEL_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data });
    }
  };
};

export const postChannel = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post("/channels", data);
      if (response.data)
        dispatch({ type: POST_CHANNEL_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data });
    }
  };
};

export const putChannel = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.put("/channels", data);
      if (response.data)
        dispatch({ type: PUT_CHANNEL_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data });
    }
  };
};

export const deleteChannel = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      await axios.delete(`/channels${id}`);
      dispatch({ type: DELETE_CHANNEL_SUCCESS });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data });
    }
  };
};
