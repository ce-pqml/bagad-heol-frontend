import axios from 'axios';
import * as actionAuth from '../redux/authentification/actions';
import store from '../redux/store';


//Envoi du token en header
// axios.interceptors.request.use(function(config) {
//   const token = store.getState().auth.token;
//   if (token && config.headers.shouldPutToken != false) config.headers.token = token;
//   return config;
// });

//Refresh du token en cas d'erreur
axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    let res = err.response;
    const originalRequest = err.config;
    // if (res.status === 498 && res.config && !originalRequest._retry) {
    //   const refreshToken = store.getState().auth.refreshToken;
    //   originalRequest._retry = true;
    //   //On le fait egalement via redux pour mettre a jour le state
    //   actions.doRefresh(refreshToken);
    //   //Et on le fait en local(pas propre) pour débloquer notre requete actuel
    //   return axios
    //     .post(CONSTANTE.WS_URL + '/auth/refresh', {
    //       refreshToken: refreshToken,
    //     })
    //     .then(res => {
    //       originalRequest.headers.token = res.data.token;
    //       originalRequest.headers.shouldPutToken = false;
    //       return axios(originalRequest).then(res => {
    //         return res;
    //       });
    //     });
    // } else if (res.status === 498) {
    //   actions.doDisconnect();
    // } else {
    //   // return err;
    //   // Si c'est une erreur, reject le promise pour passer dans le catch
    //   return Promise.reject(err.response);
    // }
    console.log(res, err.config)
    // return axios(originalRequest).then(res => {
    //   return res;
    // });
    if (res.status === 401) {
      store.dispatch(actionAuth.logout());
      return Promise.reject(err.response);
    } else {
      return Promise.reject(err.response);
    }
  },
);
