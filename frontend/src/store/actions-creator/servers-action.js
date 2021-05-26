import {
  FETCH_SERVERS_SUCCESS,
  FETCH_SERVER_SUCCESS,
  POST_SERVER_SUCCESS,
  DELETE_SERVER_SUCCESS,
  PUT_SERVER_SUCCESS,
  SET_SERVER_ERROR,
  SET_SERVER_LOADING,
} from "./types";
import apiV1 from "../../request";

export const getServers = () => {
  return async (dispatch) => {
    dispatch({ type: SET_SERVER_LOADING });
    try {
      const response = await apiV1.get("/servers/all");
      response.data &&
        (await dispatch({
          type: FETCH_SERVERS_SUCCESS,
          payload: response.data,
        }));
    } catch (error) {
      dispatch({ type: SET_SERVER_ERROR, payload: error.response.data });
    }
  };
};

export const getServerById = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SERVER_LOADING });
    try {
      const response = await apiV1.get(`/servers/${id}`);
      response.data &&
        (await dispatch({
          type: FETCH_SERVER_SUCCESS,
          payload: response.data,
        }));
      await dispatch(getServers());
    } catch (error) {
      dispatch({ type: SET_SERVER_ERROR, payload: error.response.data });
    }
  };
};

export const postServer = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SERVER_LOADING });
    try {
      const response = await apiV1.post("/servers", data);
      response.data &&
        (await dispatch({
          type: POST_SERVER_SUCCESS,
          payload: response.data,
        }));
      await dispatch(getServers());
    } catch (error) {
      dispatch({ type: SET_SERVER_ERROR, payload: error.response.data });
    }
  };
};

export const putProvider = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SERVER_LOADING });
    try {
      const response = await apiV1.put("/servers", data);
      response.data &&
        (await dispatch({
          type: PUT_SERVER_SUCCESS,
          payload: response.data,
        }));
      await dispatch(getServers());
    } catch (error) {
      dispatch({ type: SET_SERVER_ERROR, payload: error.response.data });
    }
  };
};

export const deleteProvider = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SERVER_LOADING });
    try {
      await apiV1.delete(`/servers/${id}`);
      dispatch({ type: DELETE_SERVER_SUCCESS });
      dispatch(getServers());
    } catch (error) {
      dispatch({ type: SET_SERVER_ERROR, payload: error.response.data });
    }
  };
};
