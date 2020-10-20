import * as t from '../types';

const initialState = {
  lightTheme: true,
};

const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case t.TOGGLE_LAYOUT_THEME:
      return {
        ...state,
        lightTheme: !state.lightTheme,
      };
    default:
      return state;
  }
};

export default reducer;
