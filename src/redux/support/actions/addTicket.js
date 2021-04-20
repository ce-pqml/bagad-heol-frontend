import axios from 'axios';
import {
  ADD_TICKET_BEGIN,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAILURE,
  ADD_TICKET_DISMISS_ERROR
} from './constants';
import { WEB_SERVICE_URL, SUPPORT_ADD_TICKETS_URL } from '../../../config/webService';
import { setMessage } from '../../message/actions';

export function addTicket(args) {
  return dispatch => {
    dispatch({
      type: ADD_TICKET_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(WEB_SERVICE_URL + SUPPORT_ADD_TICKETS_URL, args);
      doRequest.then(
        res => {
          dispatch(setMessage(res.data))
          dispatch({
            type: ADD_TICKET_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          if (err && err.response && err.response.data) dispatch(setMessage(err.response.data));
          dispatch({
            type: ADD_TICKET_FAILURE,
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
    case ADD_TICKET_BEGIN:
      return {
        ...state,
        addTicketPending: true,
        addTicketError: null,
      };

    case ADD_TICKET_SUCCESS:
      return {
        ...state,
        addTicketPending: false,
        addTicketError: null,
      };

    case ADD_TICKET_FAILURE:
      return {
        ...state,
        addTicketPending: false,
        addTicketError: action.data.error,
      };

    case ADD_TICKET_DISMISS_ERROR:
      return {
        ...state,
        addTicketError: null,
      };

    default:
      return state;
  }
}

