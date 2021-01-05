import axios from 'axios';
import {
  USER_CHANGE_PASSWORD_BEGIN,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAILURE,
  USER_CHANGE_PASSWORD_DISMISS_ERROR
} from './constants';
import { WEB_SERVICE_URL, USER_URL } from '../../../config/webService';

export function changePassword(args) {
  return dispatch => {
    dispatch({
      type: USER_CHANGE_PASSWORD_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(WEB_SERVICE_URL + USER_URL, args);
      doRequest.then(
        res => {
          dispatch({
            type: USER_CHANGE_PASSWORD_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: USER_CHANGE_PASSWORD_FAILURE,
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
    case USER_CHANGE_PASSWORD_BEGIN:
      return {
        ...state,
        changePasswordPending: true,
        changePasswordError: null,
      };

    case USER_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePassword: action.data,
        changePasswordPending: false,
        changePasswordError: null,
      };

    case USER_CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordPending: false,
        changePasswordError: action.data.error,
      };

    case USER_CHANGE_PASSWORD_DISMISS_ERROR:
      return {
        ...state,
        changePasswordError: null,
      };

    default:
      return state;
  }
}

