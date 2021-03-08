import axios from 'axios';
import {
  AUTH_CAPTCHA_BEGIN,
  AUTH_CAPTCHA_SUCCESS,
  AUTH_CAPTCHA_FAILURE,
  AUTH_CAPTCHA_DISMISS_ERROR
} from './constants';
import { SERVICE_URL, CAPTCHA_URL } from '../../../config/webService';

export function captcha() {
  return dispatch => {
    dispatch({
      type: AUTH_CAPTCHA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(SERVICE_URL + CAPTCHA_URL);
      doRequest.then(
        res => {
          localStorage.setItem('token', res.data.token);
          dispatch({
            type: AUTH_CAPTCHA_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: AUTH_CAPTCHA_FAILURE,
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
    case AUTH_CAPTCHA_BEGIN:
      return {
        ...state,
        captchaPending: true,
        captchaError: null,
      };

    case AUTH_CAPTCHA_SUCCESS:
      return {
        ...state,
        captcha: action.data,
        captchaPending: false,
        captchaError: null,
      };

    case AUTH_CAPTCHA_FAILURE:
      return {
        ...state,
        captchaPending: false,
        captchaError: action.data.error,
      };

    case AUTH_CAPTCHA_DISMISS_ERROR:
      return {
        ...state,
        captchaError: null,
      };

    default:
      return state;
  }
}

