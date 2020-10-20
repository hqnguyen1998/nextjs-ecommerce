import { combineReducers } from 'redux';
import user from '../reducer/user';
import theme from '../reducer/theme';

const rootReducer = combineReducers({
  user,
  theme,
});

export default rootReducer;
