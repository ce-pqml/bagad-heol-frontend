const initialState = {
  currentPage: JSON.parse(localStorage.getItem("currentPage")) ? JSON.parse(localStorage.getItem("currentPage")) : 'Accueil',
  menuRetract: JSON.parse(localStorage.getItem("menuRetract")) !== "" && JSON.parse(localStorage.getItem("menuRetract")) !== null ? JSON.parse(localStorage.getItem("menuRetract")) : true,
};

export default initialState;
