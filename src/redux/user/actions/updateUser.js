import axios from 'axios';
import {
  USER_UPDATE_USER_BEGIN,
  USER_UPDATE_USER_SUCCESS,
  USER_UPDATE_USER_FAILURE,
  USER_UPDATE_USER_DISMISS_ERROR,
} from './constants';
import { WEB_SERVICE_URL, USER_URL } from '../../../config/webService';

export function updateUser(args) {
  return dispatch => {
    dispatch({
      type: USER_UPDATE_USER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.put(WEB_SERVICE_URL + USER_URL + '/' + args.id, args);
      doRequest.then(
        res => {
          dispatch({
            type: USER_UPDATE_USER_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
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
        updateUser: action.data,
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

