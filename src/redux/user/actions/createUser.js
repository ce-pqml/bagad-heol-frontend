import axios from 'axios';
import {
  USER_CREATE_USER_BEGIN,
  USER_CREATE_USER_SUCCESS,
  USER_CREATE_USER_FAILURE,
  USER_CREATE_USER_DISMISS_ERROR,
} from './constants';
import { WEB_SERVICE_URL, REGISTER_URL } from '../../../config/webService';
import { setMessage } from '../../message/actions';

export function createUser(args) {
  return dispatch => {
    dispatch({
      type: USER_CREATE_USER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(WEB_SERVICE_URL + REGISTER_URL, args);
      doRequest.then(
        res => {
          dispatch(setMessage(res.data));
          dispatch({
            type: USER_CREATE_USER_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch(setMessage(err.response.data));
          dispatch({
            type: USER_CREATE_USER_FAILURE,
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
    case USER_CREATE_USER_BEGIN:
      return {
        ...state,
        createUserPending: true,
        createUserError: null,
      };

    case USER_CREATE_USER_SUCCESS:
      return {
        ...state,
        createUser: action.data,
        createUserPending: false,
        createUserError: null,
      };

    case USER_CREATE_USER_FAILURE:
      return {
        ...state,
        createUserPending: false,
        createUserError: action.data.error,
      };

    case USER_CREATE_USER_DISMISS_ERROR:
      return {
        ...state,
        createUserError: null,
      };

    default:
      return state;
  }
}

