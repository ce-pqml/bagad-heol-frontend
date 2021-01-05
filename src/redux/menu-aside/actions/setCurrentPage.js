import { SET_MENU_ASIDE_ACTIVE } from './constants';

export function setCurrentPage(val) {
  return {
    type: SET_MENU_ASIDE_ACTIVE,
    data: val,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SET_MENU_ASIDE_ACTIVE:
      return {
        ...state,
        currentPage: action.data,
      };

    default:
      return state;
  }
}
