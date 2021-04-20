import axios from 'axios';
import {
  PODCAST_ADD_PODCAST_BEGIN,
  PODCAST_ADD_PODCAST_SUCCESS,
  PODCAST_ADD_PODCAST_FAILURE,
  PODCAST_ADD_PODCAST_DISMISS_ERROR,
} from './constants';
import { WEB_SERVICE_URL, ADD_PODCAST } from '../../../config/webService';
import { setMessage } from '../../message/actions';

export function addPodcast(args) {
  return dispatch => {
    dispatch({
      type: PODCAST_ADD_PODCAST_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(WEB_SERVICE_URL + ADD_PODCAST, args);
      doRequest.then(
        res => {
          dispatch(setMessage(res.data))
          dispatch({
            type: PODCAST_ADD_PODCAST_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          if (err && err.response && err.response.data) dispatch(setMessage(err.response.data));
          dispatch({
            type: PODCAST_ADD_PODCAST_FAILURE,
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
    case PODCAST_ADD_PODCAST_BEGIN:
      return {
        ...state,
        addPodcastPending: true,
        addPodcastError: null,
      };

    case PODCAST_ADD_PODCAST_SUCCESS:
      return {
        ...state,
        addPodcast: action.data,
        addPodcastPending: false,
        addPodcastError: null,
      };

    case PODCAST_ADD_PODCAST_FAILURE:
      return {
        ...state,
        addPodcastPending: false,
        addPodcastError: action.data.error,
      };

    case PODCAST_ADD_PODCAST_DISMISS_ERROR:
      return {
        ...state,
        addPodcastError: null,
      };

    default:
      return state;
  }
}

