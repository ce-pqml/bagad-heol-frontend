import axios from 'axios';
import {
  USER_FORGOT_PASSWORD_BEGIN,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAILURE,
  USER_FORGOT_PASSWORD_DISMISS_ERROR
} from './constants';
import { WEB_SERVICE_URL, USER_URL } from '../../../config/webService';

export function forgotPassword(args) {
  return dispatch => {
    dispatch({
      type: USER_FORGOT_PASSWORD_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(WEB_SERVICE_URL + USER_URL, args);
      doRequest.then(
        res => {
          dispatch({
            type: USER_FORGOT_PASSWORD_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: USER_FORGOT_PASSWORD_FAILURE,
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
    case USER_FORGOT_PASSWORD_BEGIN:
      return {
        ...state,
        forgotPasswordPending: true,
        forgotPasswordError: null,
      };

    case USER_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPassword: action.data,
        forgotPasswordPending: false,
        forgotPasswordError: null,
      };

    case USER_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordPending: false,
        forgotPasswordError: action.data.error,
      };

    case USER_FORGOT_PASSWORD_DISMISS_ERROR:
      return {
        ...state,
        forgotPasswordError: null,
      };

    default:
      return state;
  }
}

