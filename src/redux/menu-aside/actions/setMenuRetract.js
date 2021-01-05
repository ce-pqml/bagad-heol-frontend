import { SET_MENU_RETRACT } from './constants';

export function setMenuRetract(bool) {
  return {
    type: SET_MENU_RETRACT,
    data: bool,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SET_MENU_RETRACT:
      return {
        ...state,
        menuRetract: action.data,
      };

    default:
      return state;
  }
}
