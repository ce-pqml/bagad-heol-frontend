import axios from 'axios';
import {
  GET_PROFIL_BEGIN,
  GET_PROFIL_SUCCESS,
  GET_PROFIL_FAILURE,
  GET_PROFIL_DISMISS_ERROR
} from './constants';
import { WEB_SERVICE_URL, PROFIL_URL } from '../../../config/webService';
import { setMessage } from '../../message/actions';
import { history } from 'react-router-dom'

export function getProfil() {
  return dispatch => {
    dispatch({
      type: GET_PROFIL_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      if (localStorage.getItem('userLogged') && localStorage.getItem('token') && JSON.parse(localStorage.getItem('userLogged')).id) {
        dispatch(setMessage([
          {
            'status': 'error',
            'type': 'needLogin',
            'message': 'Merci de vous connecter pour accéder à cette page.'
          }
        ]));
      }
      const doRequest = axios.post(WEB_SERVICE_URL + PROFIL_URL + `/${JSON.parse(localStorage.getItem('userLogged')).id}/${localStorage.getItem('token')}`);
      doRequest.then(
        res => {
          dispatch({
            type: GET_PROFIL_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch(setMessage(err.response.data));
          dispatch({
            type: GET_PROFIL_FAILURE,
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
    case GET_PROFIL_BEGIN:
      return {
        ...state,
        getProfilPending: true,
        getProfilError: null,
      };

    case GET_PROFIL_SUCCESS:
      return {
        ...state,
        profil: action.data,
        getProfilPending: false,
        getProfilError: null,
      };

    case GET_PROFIL_FAILURE:
      return {
        ...state,
        getProfilPending: false,
        getProfilError: action.data.error,
      };

    case GET_PROFIL_DISMISS_ERROR:
      return {
        ...state,
        getProfilError: null,
      };

    default:
      return state;
  }
}