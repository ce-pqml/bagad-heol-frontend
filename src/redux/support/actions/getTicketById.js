import axios from 'axios';
import {
  GET_TICKET_ID_BEGIN,
  GET_TICKET_ID_SUCCESS,
  GET_TICKET_ID_FAILURE,
  GET_TICKET_ID_DISMISS_ERROR
} from './constants';
import { WEB_SERVICE_URL, SUPPORT_VIEW_TICKET_URL } from '../../../config/webService';
import { setMessage } from '../../message/actions';

export function getTicketById(id) {
  return dispatch => {
    dispatch({
      type: GET_TICKET_ID_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(WEB_SERVICE_URL + SUPPORT_VIEW_TICKET_URL + `/${id}`);
      doRequest.then(
        res => {
          dispatch({
            type: GET_TICKET_ID_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          if (err && err.response && err.response.data) dispatch(setMessage(err.response.data));
          dispatch({
            type: GET_TICKET_ID_FAILURE,
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
    case GET_TICKET_ID_BEGIN:
      return {
        ...state,
        getTicketByIdPending: true,
        getTicketByIdError: null,
      };

    case GET_TICKET_ID_SUCCESS:
      return {
        ...state,
        ticket: action.data,
        getTicketByIdPending: false,
        getTicketByIdError: null,
      };

    case GET_TICKET_ID_FAILURE:
      return {
        ...state,
        getTicketByIdPending: false,
        getTicketByIdError: action.data.error,
      };

    case GET_TICKET_ID_DISMISS_ERROR:
      return {
        ...state,
        getTicketByIdError: null,
      };

    default:
      return state;
  }
}

