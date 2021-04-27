import {
  FETCH_PROVIDERS_SUCCESS,
  FETCH_PROVIDER_SUCCESS,
  POST_PROVIDER_SUCCESS,
  DELETE_PROVIDER_SUCCESS,
  PUT_PROVIDER_SUCCESS,
  SET_PROVIDER_ERROR,
  SET_PROVIDER_LOADING,
} from "./types";
import axios from "axios";
const baseUrl = "http://localhost:5000/api";

export const getProviders = () => {
  return async (dispatch) => {
    dispatch({ type: SET_PROVIDER_LOADING });
    try {
      const response = await axios.get(baseUrl + "/providers/all");
      await dispatch({ type: FETCH_PROVIDERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SET_PROVIDER_ERROR, payload: error.response.data });
    }
  };
};

export const getProviderById = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_PROVIDER_LOADING });
    try {
      const response = await axios.get(`${baseUrl}/providers/${id}`);
      await dispatch({ type: FETCH_PROVIDER_SUCCESS, payload: response.data });
      await dispatch(getProviders());
    } catch (error) {
      dispatch({ type: SET_PROVIDER_ERROR, payload: error.response.data });
    }
  };
};

export const postProvider = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_PROVIDER_LOADING });
    try {
      const response = await axios.post(baseUrl + "/providers", data);
      await dispatch({ type: POST_PROVIDER_SUCCESS, payload: response.data });
      await dispatch(getProviders());
    } catch (error) {
      dispatch({ type: SET_PROVIDER_ERROR, payload: error.response.data });
    }
  };
};

export const putProvider = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_PROVIDER_LOADING });
    try {
      const response = await axios.put(baseUrl + "/providers", data);
      await dispatch({ type: PUT_PROVIDER_SUCCESS, payload: response.data });
      await dispatch(getProviders());
    } catch (error) {
      dispatch({ type: SET_PROVIDER_ERROR, payload: error.response.data });
    }
  };
};

export const deleteProvider = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_PROVIDER_LOADING });
    try {
      await axios.delete(`${baseUrl}/providers/${id}`);
      dispatch({ type: DELETE_PROVIDER_SUCCESS });
      dispatch(getProviders());
    } catch (error) {
      dispatch({ type: SET_PROVIDER_ERROR, payload: error.response.data });
    }
  };
};
