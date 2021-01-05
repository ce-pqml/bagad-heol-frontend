import axios from 'axios';
import {
  AUTH_REFRESH_BEGIN,
  AUTH_REFRESH_SUCCESS,
  AUTH_REFRESH_FAILURE,
  AUTH_REFRESH_DISMISS_ERROR
} from './constants';
import { WEB_SERVICE_URL, USER_URL } from '../../../config/webService';

export function refresh(args) {
  return dispatch => {
    dispatch({
      type: AUTH_REFRESH_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.put(WEB_SERVICE_URL + USER_URL + '/' + args.id, args);
      doRequest.then(
        res => {
          dispatch({
            type: AUTH_REFRESH_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: AUTH_REFRESH_FAILURE,
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
    case AUTH_REFRESH_BEGIN:
      return {
        ...state,
        refreshPending: true,
        refreshError: null,
      };

    case AUTH_REFRESH_SUCCESS:
      return {
        ...state,
        refresh: action.data,
        refreshPending: false,
        refreshError: null,
      };

    case AUTH_REFRESH_FAILURE:
      return {
        ...state,
        refreshPending: false,
        refreshError: action.data.error,
      };

    case AUTH_REFRESH_DISMISS_ERROR:
      return {
        ...state,
        refreshError: null,
      };

    default:
      return state;
  }
}

