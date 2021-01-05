import initialState from './initialState';
import { reducer as setCurrentPageReducer } from './actions/setCurrentPage';
import { reducer as setMenuRetractReducer } from './actions/setMenuRetract';


const reducers = [
  setCurrentPageReducer,
  setMenuRetractReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
