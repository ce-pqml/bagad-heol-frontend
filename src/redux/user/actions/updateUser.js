import axios from 'axios';
import {
  USER_UPDATE_USER_BEGIN,
  USER_UPDATE_USER_SUCCESS,
  USER_UPDATE_USER_FAILURE,
  USER_UPDATE_USER_DISMISS_ERROR,
} from './constants';
import { WEB_SERVICE_URL, ACCOUNT_URL } from '../../../config/webService';
import { setMessage } from '../../message/actions';

export function updateUser(args) {
  return dispatch => {
    dispatch({
      type: USER_UPDATE_USER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(WEB_SERVICE_URL + ACCOUNT_URL, args);
      doRequest.then(
        res => {
          dispatch({
            type: USER_UPDATE_USER_SUCCESS,
            data: res.data,
          });
          dispatch(setMessage([res.data]));
          resolve(res);
        },
        err => {
          if (err && err.response && err.response.data) dispatch(setMessage(err.response.data));
          dispatch({
            type: USER_UPDATE_USER_FAILURE,
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
    case USER_UPDATE_USER_BEGIN:
      return {
        ...state,
        updateUserPending: true,
        updateUserError: null,
      };

    case USER_UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateUserPending: false,
        updateUserError: null,
      };

    case USER_UPDATE_USER_FAILURE:
      return {
        ...state,
        updateUserPending: false,
        updateUserError: action.data.error,
      };

    case USER_UPDATE_USER_DISMISS_ERROR:
      return {
        ...state,
        updateUserError: null,
      };

    default:
      return state;
  }
}

