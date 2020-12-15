import axios from 'axios';
import {
  PODCAST_GET_PODCAST_BEGIN,
  PODCAST_GET_PODCAST_SUCCESS,
  PODCAST_GET_PODCAST_FAILURE,
  PODCAST_GET_PODCAST_DISMISS_ERROR,
} from './constants';

export function getPodcast() {
  return dispatch => {
    dispatch({
      type: PODCAST_GET_PODCAST_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get('http://www.reddit.com/r/reactjs.json');
      doRequest.then(
        res => {
          dispatch({
            type: PODCAST_GET_PODCAST_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: PODCAST_GET_PODCAST_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PODCAST_GET_PODCAST_BEGIN:
      return {
        ...state,
        podcastPending: true,
        podcastError: null,
      };

    case PODCAST_GET_PODCAST_SUCCESS:
      return {
        ...state,
        podcast: action.data,
        podcastPending: false,
        podcastError: null,
      };

    case PODCAST_GET_PODCAST_FAILURE:
      return {
        ...state,
        podcastPending: false,
        podcastError: action.data.error,
      };

    case PODCAST_GET_PODCAST_DISMISS_ERROR:
      return {
        ...state,
        podcastError: null,
      };

    default:
      return state;
  }
}

