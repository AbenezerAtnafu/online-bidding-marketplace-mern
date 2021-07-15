import { UserActionTypes } from "./types";
import axios from "axios";

/**
 * LOGIN ACTION
 * @returns ACTION
 */
export const loginStart = () => ({
  type: UserActionTypes.LOGIN_START,
});

export const loginSuccess = (user, token) => ({
  type: UserActionTypes.LOGIN_SUCCESS,
  payload: {
    token,
    user,
  },
});

export const loginError = (error) => ({
  type: UserActionTypes.LOGIN_ERROR,
  payload: {
    error,
  },
});

/**
 * SIGNUP ACTION
 * @returns ACTION
 */
export const signUpStart = () => ({
  type: UserActionTypes.SIGN_UP_START,
});

export const signUpSuccess = (user, token) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: {
    token,
    user,
  },
});

export const signUpError = (error) => ({
  type: UserActionTypes.SIGN_UP_ERROR,
  payload: {
    error,
  },
});

/**
 * SERACH USER ACTION
 * @returns ACTION
 */
export const searchUserStart = () => ({
  type: UserActionTypes.USERS_SERACH_START,
});

export const searchUserSuccess = (users) => ({
  type: UserActionTypes.USERS_SERACH_SUCCESS,
  payload: {
    users,
  },
});

export const searchUserError = (error) => ({
  type: UserActionTypes.USERS_SERACH_ERROR,
  payload: {
    error,
  },
});

export const fetchUserStart = () => ({
  type: UserActionTypes.FETCH_USER_START,
});

export const fetchUserSuccess = (user) => ({
  type: UserActionTypes.FETCH_USER_SUCCESS,
  payload: {
    user,
  },
});

export const fetchUserError = (error) => ({
  type: UserActionTypes.FETCH_USER_ERROR,
  payload: {
    error,
  },
});

export const updateUserStart = () => ({
  type: UserActionTypes.UPDATE_USER_START,
});

export const updateUserSuccess = (id, user) => ({
  type: UserActionTypes.UPDATE_USER_SUCCESS,
  payload: {
    id,
    user,
  },
});

export const updateUserError = (error) => ({
  type: UserActionTypes.UPDATE_USER_ERROR,
  payload: {
    error,
  },
});

export const logOut = () => ({
  type: UserActionTypes.LOG_OUT,
});

/**
 * Asyn Action creator
 */

export const loginAsync = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(loginStart());
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          email,
          password,
        }
      );
      dispatch(loginSuccess(response.data.user, response.data.token));
    } catch (err) {
      dispatch(loginError(err));
    }
  };
};

export const signUpAsync = (firstName, lastName, email, password) => {
  return async (dispatch, getState) => {
    dispatch(signUpStart());
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      dispatch(signUpSuccess(response.data.user, response.data.token));
    } catch (err) {
      dispatch(signUpError(err));
    }
  };
};

export const searchUsersAsync = (query) => {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();

    try {
      dispatch(searchUserStart());
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/search`,
        {
          params: {
            q: query,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(searchUserSuccess(response.data.users));
    } catch (err) {
      dispatch(searchUserError(err));
    }
  };
};

export const fetchUserAsync = (id) => {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    try {
      dispatch(fetchUserStart());
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchUserSuccess(response.data.user));
    } catch (error) {
      dispatch(fetchUserError(error));
    }
  };
};

export const updateUserAsync = (id, form) => {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    try {
      dispatch(updateUserStart());
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateUserSuccess(id, response.data.user));
      dispatch(fetchUserSuccess(response.data.user));
    } catch (error) {
      dispatch(updateUserError(error));
    }
  };
};
