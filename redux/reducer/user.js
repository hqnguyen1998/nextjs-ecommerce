import * as t from '../types';

const initialState = {
  token: '',
  isLoading: true,
  isAuth: false,
  loggedUser: {},
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case t.LOGIN_USER_SUCCESS:
    case t.LOADED_USER_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isLoading: false,
        isAuth: true,
        loggedUser: payload.data,
        error: null,
      };
    case t.LOGIN_USER_FAILED:
    case t.LOADED_USER_FAILED:
      return {
        ...state,
        token: '',
        isLoading: false,
        isAuth: false,
        loggedUser: {},
        error: payload,
      };
    case t.SIGN_OUT:
      return {
        ...state,
        token: '',
        isLoading: false,
        isAuth: false,
        loggedUser: {},
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
