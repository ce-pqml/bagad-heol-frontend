import axios from 'axios';
import {
  AUTH_LOGIN_BEGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_DISMISS_ERROR
} from './constants';
import { WEB_SERVICE_URL, LOGIN_URL } from '../../../config/webService';
import { setMessage } from '../../message/actions';

export function login(args) {
  return dispatch => {
    dispatch({
      type: AUTH_LOGIN_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(WEB_SERVICE_URL + LOGIN_URL, args);
      doRequest.then(
        res => {
          localStorage.setItem('token', res.data.jwt);
          localStorage.setItem('userLogged', JSON.stringify(res.data));
          dispatch({
            type: AUTH_LOGIN_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          if (err && err.response && err.response.data) dispatch(setMessage(err.response.data));
          dispatch({
            type: AUTH_LOGIN_FAILURE,
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
    case AUTH_LOGIN_BEGIN:
      return {
        ...state,
        loginPending: true,
        loginError: null,
      };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        userLogged: action.data,
        loginPending: false,
        loginError: null,
      };

    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loginPending: false,
        loginError: action.data.error,
      };

    case AUTH_LOGIN_DISMISS_ERROR:
      return {
        ...state,
        loginError: null,
      };

    default:
      return state;
  }
}

