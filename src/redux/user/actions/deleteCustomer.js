import axios from 'axios';
import {
  CUSTOMER_DELETE_CUSTOMER_BEGIN,
  CUSTOMER_DELETE_CUSTOMER_SUCCESS,
  CUSTOMER_DELETE_CUSTOMER_FAILURE,
  CUSTOMER_DELETE_CUSTOMER_DISMISS_ERROR,
} from './constants';
import { WEB_SERVICE_URL, CUSTOMER_URL } from '../../../config/webService';

export function deleteCustomer(id) {
  return dispatch => {
    dispatch({
      type: CUSTOMER_DELETE_CUSTOMER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.delete(WEB_SERVICE_URL + CUSTOMER_URL + '/' + id);
      doRequest.then(
        res => {
          dispatch({
            type: CUSTOMER_DELETE_CUSTOMER_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: CUSTOMER_DELETE_CUSTOMER_FAILURE,
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
    case CUSTOMER_DELETE_CUSTOMER_BEGIN:
      return {
        ...state,
        podcastPending: true,
        podcastError: null,
      };

    case CUSTOMER_DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        podcast: action.data,
        podcastPending: false,
        podcastError: null,
      };

    case CUSTOMER_DELETE_CUSTOMER_FAILURE:
      return {
        ...state,
        podcastPending: false,
        podcastError: action.data.error,
      };

    case CUSTOMER_DELETE_CUSTOMER_DISMISS_ERROR:
      return {
        ...state,
        podcastError: null,
      };

    default:
      return state;
  }
}
