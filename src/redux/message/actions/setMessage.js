import { MESSAGE_SET_MESSAGE } from './constants';

export function setMessage(obj) {
  return {
    type: MESSAGE_SET_MESSAGE,
    data: obj,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MESSAGE_SET_MESSAGE:
      return {
        ...state,
        message: action.data,
      };
    default:
      return state;
  }
}
