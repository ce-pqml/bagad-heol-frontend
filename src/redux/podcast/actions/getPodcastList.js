import axios from 'axios';
import {
  PODCAST_GET_PODCAST_LIST_BEGIN,
  PODCAST_GET_PODCAST_LIST_SUCCESS,
  PODCAST_GET_PODCAST_LIST_FAILURE,
  PODCAST_GET_PODCAST_LIST_DISMISS_ERROR,
} from './constants';
import { WEB_SERVICE_URL, GET_PODCAST } from '../../../config/webService';

export function getPodcastList() {
  return dispatch => {
    dispatch({
      type: PODCAST_GET_PODCAST_LIST_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(WEB_SERVICE_URL + GET_PODCAST);
      doRequest.then(
        res => {
          dispatch({
            type: PODCAST_GET_PODCAST_LIST_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: PODCAST_GET_PODCAST_LIST_FAILURE,
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
    case PODCAST_GET_PODCAST_LIST_BEGIN:
      return {
        ...state,
        podcastPending: true,
        podcastError: null,
      };

    case PODCAST_GET_PODCAST_LIST_SUCCESS:
      return {
        ...state,
        listPodcast: action.data,
        podcastPending: false,
        podcastError: null,
      };

    case PODCAST_GET_PODCAST_LIST_FAILURE:
      return {
        ...state,
        podcastPending: false,
        podcastError: action.data.error,
      };

    case PODCAST_GET_PODCAST_LIST_DISMISS_ERROR:
      return {
        ...state,
        podcastError: null,
      };

    default:
      return state;
  }
}

