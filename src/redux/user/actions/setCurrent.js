import { CUSTOMER_SET_CURRENT } from './constants';

export function setCurrent(obj) {
  return {
    type: CUSTOMER_SET_CURRENT,
    data: obj,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CUSTOMER_SET_CURRENT:
      return {
        ...state,
        message: action.data,
      };

    default:
      return state;
  }
}
