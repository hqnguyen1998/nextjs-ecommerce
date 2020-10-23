import * as t from '../types';

const initialState = {
  token: '',
  isLoading: true,
  isAuth: false,
  loggedUser: {},
  error: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case t.LOGIN_USER_SUCCESS:
    case t.LOADED_USER_SUCCESS:
    case t.REGISTER_USER_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isLoading: false,
        isAuth: true,
        loggedUser: payload.data,
        error: {},
      };
    case t.LOGIN_USER_FAILED:
    case t.REGISTER_USER_FAILED:
      return {
        ...state,
        token: '',
        isLoading: false,
        isAuth: false,
        loggedUser: {},
        error: payload,
      };
    case t.LOADED_USER_FAILED:
      return {
        ...state,
        token: '',
        isLoading: false,
        isAuth: false,
        loggedUser: {},
      };
    case t.SIGN_OUT:
      return {
        ...state,
        token: '',
        isLoading: false,
        isAuth: false,
        loggedUser: {},
        error: {},
      };
    case t.REMOVE_ALERT:
      return {
        ...state,
        error: {},
      };
    default:
      return state;
  }
};

export default reducer;
