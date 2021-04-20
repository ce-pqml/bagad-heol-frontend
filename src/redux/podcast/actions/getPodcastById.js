import axios from 'axios';
import {
  PODCAST_UPDATE_PODCAST_BEGIN,
  PODCAST_UPDATE_PODCAST_SUCCESS,
  PODCAST_UPDATE_PODCAST_FAILURE,
  PODCAST_UPDATE_PODCAST_DISMISS_ERROR,
} from './constants';
import { WEB_SERVICE_URL, GET_PODCAST_BY_ID } from '../../../config/webService';

export function getPodcastById(id) {
  return dispatch => {
    dispatch({
      type: PODCAST_UPDATE_PODCAST_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(WEB_SERVICE_URL + GET_PODCAST_BY_ID +'/'+ id);
      doRequest.then(
        res => {
          dispatch({
            type: PODCAST_UPDATE_PODCAST_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: PODCAST_UPDATE_PODCAST_FAILURE,
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
    case PODCAST_UPDATE_PODCAST_BEGIN:
      return {
        ...state,
        podcastByIdPending: true,
        podcastByIdError: null,
      };

    case PODCAST_UPDATE_PODCAST_SUCCESS:
      return {
        ...state,
        podcast: action.data,
        podcastByIdPending: false,
        podcastByIdError: null,
      };

    case PODCAST_UPDATE_PODCAST_FAILURE:
      return {
        ...state,
        podcastByIdPending: false,
        podcastByIdError: action.data.error,
      };

    case PODCAST_UPDATE_PODCAST_DISMISS_ERROR:
      return {
        ...state,
        podcastByIdError: null,
      };

    default:
      return state;
  }
}

