import axios from 'axios';
import {
  GET_LIST_TICKET_BEGIN,
  GET_LIST_TICKET_SUCCESS,
  GET_LIST_TICKET_FAILURE,
  GET_LIST_TICKET_DISMISS_ERROR
} from './constants';
import { WEB_SERVICE_URL, SUPPORT_LIST_TICKETS_URL } from '../../../config/webService';
import { setMessage } from '../../message/actions';

export function getListTicket() {
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
          dispatch(setMessage(err.response.data));
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
        getListTicketPending: true,
        getListTicketError: null,
      };

    case GET_LIST_TICKET_SUCCESS:
      return {
        ...state,
        listTicket: action.data,
        getListTicketPending: false,
        getListTicketError: null,
      };

    case GET_LIST_TICKET_FAILURE:
      return {
        ...state,
        getListTicketPending: false,
        getListTicketError: action.data.error,
      };

    case GET_LIST_TICKET_DISMISS_ERROR:
      return {
        ...state,
        getListTicketError: null,
      };

    default:
      return state;
  }
}

