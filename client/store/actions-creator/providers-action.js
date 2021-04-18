import {
  FETCH_PROVIDERS_SUCCESS,
  FETCH_PROVIDER_SUCCESS,
  POST_PROVIDER_SUCCESS,
  DELETE_PROVIDER_SUCCESS,
  PUT_PROVIDER_SUCCESS,
  SET_ERROR,
  SET_LOADING,
} from "./types";
import axios from "axios";
const baseUrl = "http://localhost:5000/api";

export const getProviders = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(baseUrl + "/providers/all");
      if (response.data)
        dispatch({ type: FETCH_PROVIDERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data });
    }
  };
};

export const getProviderById = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(`${baseUrl}/providers/${id}`);
      if (response.data)
        dispatch({ type: FETCH_PROVIDER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data });
    }
  };
};

export const postProvider = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(baseUrl + "/providers", data);
      if (response.data)
        dispatch({ type: POST_PROVIDER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data });
    }
  };
};

export const putProvider = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.put(baseUrl + "/providers", data);
      if (response.data)
        dispatch({ type: PUT_PROVIDER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data });
    }
  };
};

export const deleteProvider = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      await axios.delete(`${baseUrl}/providers/${id}`);
      dispatch({ type: DELETE_PROVIDER_SUCCESS });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data });
    }
  };
};
