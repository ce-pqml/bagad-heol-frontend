import axios from 'axios';
import {
  USER_GET_USER_BEGIN,
  USER_GET_USER_SUCCESS,
  USER_GET_USER_FAILURE,
  USER_GET_USER_DISMISS_ERROR,
} from './constants';
import { WEB_SERVICE_URL, USER_URL } from '../../../config/webService';

export function getUser(id) {
  return dispatch => {
    dispatch({
      type: USER_GET_USER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(WEB_SERVICE_URL + USER_URL + '/' + id);
      doRequest.then(
        res => {
          dispatch({
            type: USER_GET_USER_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: USER_GET_USER_FAILURE,
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
    case USER_GET_USER_BEGIN:
      return {
        ...state,
        getUserPending: true,
        getUserError: null,
      };

    case USER_GET_USER_SUCCESS:
      return {
        ...state,
        customer: action.data,
        getUserPending: false,
        getUserError: null,
      };

    case USER_GET_USER_FAILURE:
      return {
        ...state,
        getUserPending: false,
        getUserError: action.data.error,
      };

    case USER_GET_USER_DISMISS_ERROR:
      return {
        ...state,
        getUserError: null,
      };

    default:
      return state;
  }
}

