import { combineReducers } from 'redux';

import loggedReducer from './isLogged';

const allReducers = combineReducers({
  loggedReducer,
});

export default allReducers;
