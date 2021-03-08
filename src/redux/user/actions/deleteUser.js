import axios from 'axios';
import {
  USER_DELETE_USER_BEGIN,
  USER_DELETE_USER_SUCCESS,
  USER_DELETE_USER_FAILURE,
  USER_DELETE_USER_DISMISS_ERROR,
} from './constants';
import { WEB_SERVICE_URL, ACCOUNT_URL } from '../../../config/webService';

export function deleteUser(id) {
  return dispatch => {
    dispatch({
      type: USER_DELETE_USER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.delete(WEB_SERVICE_URL + ACCOUNT_URL + '/' + id);
      doRequest.then(
        res => {
          dispatch({
            type: USER_DELETE_USER_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: USER_DELETE_USER_FAILURE,
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
    case USER_DELETE_USER_BEGIN:
      return {
        ...state,
        deleteUserPending: true,
        deleteUserError: null,
      };

    case USER_DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteUser: action.data,
        deleteUserPending: false,
        deleteUserError: null,
      };

    case USER_DELETE_USER_FAILURE:
      return {
        ...state,
        deleteUserPending: false,
        deleteUserError: action.data.error,
      };

    case USER_DELETE_USER_DISMISS_ERROR:
      return {
        ...state,
        deleteUserError: null,
      };

    default:
      return state;
  }
}

