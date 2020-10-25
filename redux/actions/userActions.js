import axios from 'axios';
import * as t from '../types';
import Cookies from 'js-cookie';

export const signOut = () => (dispatch) => {
  Cookies.remove('token');

  dispatch({
    type: t.SIGN_OUT,
  });
};

export const updateUserProfile = (userId, userData) => async (dispatch) => {
  try {
    const { data } = await axios({
      url: `/api/user?id=${userId}`,
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      data: userData,
    });

    dispatch({
      type: t.UPDATE_USER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: t.UPDATE_USER_FAILED,
    });
  }
};

export const onAuthStateChanged = () => async (dispatch) => {
  try {
    const res = await axios({
      url: `${process.env.API_URL}/api/auth`,
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    dispatch({
      type: t.LOADED_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: t.LOADED_USER_FAILED,
      payload: error.response.data,
    });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    const res = await axios({
      url: `${process.env.API_URL}/api/user`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      data: userData,
    });

    Cookies.set('token', res.data.token);

    return dispatch({
      type: t.REGISTER_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: t.REGISTER_USER_FAILED,
      payload: error.response.data,
    });

    setTimeout(() => {
      dispatch({
        type: t.REMOVE_ALERT,
      });
    }, 3000);
  }
};

export const loginWithEmailAndPassword = (email, password) => async (
  dispatch
) => {
  try {
    const res = await axios({
      url: `${process.env.API_URL}/api/auth`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      data: {
        email,
        password,
      },
    });

    Cookies.set('token', res.data.token, {
      expires: 1,
      path: '',
    });

    dispatch({
      type: t.LOGIN_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    Cookies.remove('token');
    dispatch({
      type: t.LOGIN_USER_FAILED,
      payload: error.response.data,
    });

    setTimeout(() => {
      dispatch({
        type: t.REMOVE_ALERT,
      });
    }, 3000);
  }
};
