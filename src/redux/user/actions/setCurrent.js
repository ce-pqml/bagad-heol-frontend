import { USER_SET_CURRENT } from './constants';

export function setCurrent(obj) {
  return {
    type: USER_SET_CURRENT,
    data: obj,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_SET_CURRENT:
      return {
        ...state,
        currentUser: action.data,
      };

    default:
      return state;
  }
}
