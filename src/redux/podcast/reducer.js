import initialState from './initialState';
import { reducer as getPodcastReducer } from './actions/getPodcast';
import { reducer as setCurrentPodcastReducer } from './actions/setCurrentPodcast';

const reducers = [
  getPodcastReducer,
  setCurrentPodcastReducer,
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
