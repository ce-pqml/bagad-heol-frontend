import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import examplesReducer from './example/reducer';
import podcastReducer from './podcast/reducer';

const reducerMap = {
  examples: examplesReducer,
  podcast: podcastReducer
};

export default combineReducers(reducerMap);
