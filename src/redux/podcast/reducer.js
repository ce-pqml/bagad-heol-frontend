import initialState from './initialState';
import { reducer as getPodcastListReducer } from './actions/getPodcastList';
import { reducer as getPodcastById } from './actions/getPodcastById';
import { reducer as updatePodcast } from './actions/updatePodcast';
import { reducer as addPodcastReducer } from './actions/addPodcast';
import { reducer as setCurrentPodcastReducer } from './actions/setCurrentPodcast';

const reducers = [
  getPodcastListReducer,
  getPodcastById,
  updatePodcast,
  addPodcastReducer,
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
