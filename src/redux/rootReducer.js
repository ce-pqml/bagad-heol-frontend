import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import examplesReducer from './example/reducer';
import podcastReducer from './podcast/reducer';
import menuAsideReducer from './menu-aside/reducer';

const reducerMap = {
  examples: examplesReducer,
  podcast: podcastReducer,
  menuAside: menuAsideReducer,
};

export default combineReducers(reducerMap);
