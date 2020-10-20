import * as t from '../types';

export const toggleLayoutTheme = () => (dispatch) => {
  dispatch({
    type: t.TOGGLE_LAYOUT_THEME,
  });
};
