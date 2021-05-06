import {
  FETCH_PROVIDERS_SUCCESS,
  FETCH_PROVIDER_SUCCESS,
  POST_PROVIDER_SUCCESS,
  DELETE_PROVIDER_SUCCESS,
  PUT_PROVIDER_SUCCESS,
  SET_PROVIDER_ERROR,
  SET_PROVIDER_LOADING,
} from "./types";
import apiV1 from "../../request";

export const getProviders = () => {
  return async (dispatch) => {
    dispatch({ type: SET_PROVIDER_LOADING });
    try {
      const response = await apiV1.get("/providers/all");
      response.data &&  await dispatch({ type: FETCH_PROVIDERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SET_PROVIDER_ERROR, payload: error.response.data });
    }
  };
};

export const getProviderById = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_PROVIDER_LOADING });
    try {
      const response = await apiV1.get(`/providers/${id}`);
      response.data &&  await dispatch({ type: FETCH_PROVIDER_SUCCESS, payload: response.data });
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
      const response = await apiV1.post("/providers", data);
      response.data && await dispatch({ type: POST_PROVIDER_SUCCESS, payload: response.data });
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
      const response = await apiV1.put("/providers", data);
      response.data && await dispatch({ type: PUT_PROVIDER_SUCCESS, payload: response.data });
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
      await apiV1.delete(`/providers/${id}`);
      dispatch({ type: DELETE_PROVIDER_SUCCESS });
      dispatch(getProviders());
    } catch (error) {
      dispatch({ type: SET_PROVIDER_ERROR, payload: error.response.data });
    }
  };
};
