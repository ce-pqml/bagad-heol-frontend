import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import examplesReducer from './example/reducer';
import podcastReducer from './podcast/reducer';
import menuAsideReducer from './menu-aside/reducer';
import messageReducer from './message/reducer';
import userReducer from './user/reducer';
import authentificationReducer from './authentification/reducer';

const reducerMap = {
  examples: examplesReducer,
  podcast: podcastReducer,
  menuAside: menuAsideReducer,
  message: messageReducer,
  user: userReducer,
  authentification: authentificationReducer
};

export default combineReducers(reducerMap);
