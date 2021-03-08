const initialState = {
  captcha: null,
  userLogged: JSON.parse(localStorage.getItem("userLogged")) !== "" && JSON.parse(localStorage.getItem("userLogged")) !== null ? JSON.parse(localStorage.getItem("userLogged")) : {},
  logout: {},
  refresh: {},
  token: localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null ? localStorage.getItem("token") : null,
};

export default initialState;
