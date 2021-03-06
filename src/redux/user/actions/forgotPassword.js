import axios from 'axios';
import {
  USER_FORGOT_PASSWORD_BEGIN,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAILURE,
  USER_FORGOT_PASSWORD_DISMISS_ERROR
} from './constants';
import { WEB_SERVICE_URL, RECOVERY_PSW } from '../../../config/webService';
import { setMessage } from '../../message/actions';

export function forgotPassword(args) {
  return dispatch => {
    dispatch({
      type: USER_FORGOT_PASSWORD_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(WEB_SERVICE_URL + RECOVERY_PSW, args);
      doRequest.then(
        res => {
          dispatch(setMessage(res.data));
          dispatch({
            type: USER_FORGOT_PASSWORD_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          if (err && err.response && err.response.data) dispatch(setMessage(err.response.data));
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

