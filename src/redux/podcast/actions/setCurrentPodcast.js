import { PODCAST_SET_CURRENT_PODCAST } from './constants';

export function setCurrentPodcast(obj) {
  return {
    type: PODCAST_SET_CURRENT_PODCAST,
    data: obj,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PODCAST_SET_CURRENT_PODCAST:
      return {
        ...state,
        currentPodcast: action.data,
      };

    default:
      return state;
  }
}
