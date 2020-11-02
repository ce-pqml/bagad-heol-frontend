import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import examplesReducer from './example/reducer';

const reducerMap = {
  examples: examplesReducer,
};

export default combineReducers(reducerMap);
