import axios from 'axios';
import {
  AUTH_LOGOUT_BEGIN,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_LOGOUT_DISMISS_ERROR
} from './constants';
import { WEB_SERVICE_URL, AUTH_URL } from '../../../config/webService';

export function logout(args) {
  return dispatch => {
    dispatch({
      type: AUTH_LOGOUT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(WEB_SERVICE_URL + AUTH_URL, args);
      doRequest.then(
        res => {
          dispatch({
            type: AUTH_LOGOUT_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: AUTH_LOGOUT_FAILURE,
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
    case AUTH_LOGOUT_BEGIN:
      return {
        ...state,
        logoutPending: true,
        logoutError: null,
      };

    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        logout: action.data,
        logoutPending: false,
        logoutError: null,
      };

    case AUTH_LOGOUT_FAILURE:
      return {
        ...state,
        logoutPending: false,
        logoutError: action.data.error,
      };

    case AUTH_LOGOUT_DISMISS_ERROR:
      return {
        ...state,
        logoutError: null,
      };

    default:
      return state;
  }
}

