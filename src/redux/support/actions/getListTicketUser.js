import axios from 'axios';
import {
  GET_LIST_TICKET_BEGIN,
  GET_LIST_TICKET_SUCCESS,
  GET_LIST_TICKET_FAILURE,
  GET_LIST_TICKET_DISMISS_ERROR
} from './constants';
import { WEB_SERVICE_URL, SUPPORT_LIST_TICKETS_URL } from '../../../config/webService';
import { setMessage } from '../../message/actions';

export function getListTicketUser() {
  return dispatch => {
    dispatch({
      type: GET_LIST_TICKET_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(WEB_SERVICE_URL + SUPPORT_LIST_TICKETS_URL);
      doRequest.then(
        res => {
          dispatch({
            type: GET_LIST_TICKET_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          if (err && err.response && err.response.data) dispatch(setMessage(err.response.data));
          dispatch({
            type: GET_LIST_TICKET_FAILURE,
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
    case GET_LIST_TICKET_BEGIN:
      return {
        ...state,
        getListTicketUserPending: true,
        getListTicketUserError: null,
      };

    case GET_LIST_TICKET_SUCCESS:
      return {
        ...state,
        listTicketUser: action.data,
        getListTicketUserPending: false,
        getListTicketUserError: null,
      };

    case GET_LIST_TICKET_FAILURE:
      return {
        ...state,
        getListTicketUserPending: false,
        getListTicketUserError: action.data.error,
      };

    case GET_LIST_TICKET_DISMISS_ERROR:
      return {
        ...state,
        getListTicketUserError: null,
      };

    default:
      return state;
  }
}

