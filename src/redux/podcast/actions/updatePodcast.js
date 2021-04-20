import axios from 'axios';
import {
  PODCAST_GET_PODCAST_BY_ID_BEGIN,
  PODCAST_GET_PODCAST_BY_ID_SUCCESS,
  PODCAST_GET_PODCAST_BY_ID_FAILURE,
  PODCAST_GET_PODCAST_BY_ID_DISMISS_ERROR,
} from './constants';
import { WEB_SERVICE_URL, GET_PODCAST_BY_ID } from '../../../config/webService';
import { setMessage } from '../../message/actions';

export function updatePodcast(id, args) {
  return dispatch => {
    dispatch({
      type: PODCAST_GET_PODCAST_BY_ID_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(WEB_SERVICE_URL + GET_PODCAST_BY_ID +'/'+ id, args);
      doRequest.then(
        res => {
          dispatch(setMessage(res.data))
          dispatch({
            type: PODCAST_GET_PODCAST_BY_ID_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          if (err && err.response && err.response.data) dispatch(setMessage(err.response.data));
          dispatch({
            type: PODCAST_GET_PODCAST_BY_ID_FAILURE,
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
    case PODCAST_GET_PODCAST_BY_ID_BEGIN:
      return {
        ...state,
        updatePodcastPending: true,
        updatePodcastError: null,
      };

    case PODCAST_GET_PODCAST_BY_ID_SUCCESS:
      return {
        ...state,
        podcast: action.data,
        updatePodcastPending: false,
        updatePodcastError: null,
      };

    case PODCAST_GET_PODCAST_BY_ID_FAILURE:
      return {
        ...state,
        updatePodcastPending: false,
        updatePodcastError: action.data.error,
      };

    case PODCAST_GET_PODCAST_BY_ID_DISMISS_ERROR:
      return {
        ...state,
        updatePodcastError: null,
      };

    default:
      return state;
  }
}

