const initialState = {
  userLogged: {},
  logout: {},
  refresh: {},
  token: localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null ? localStorage.getItem("token") : null,
};

export default initialState;
