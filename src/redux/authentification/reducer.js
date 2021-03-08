import initialState from './initialState';
import { reducer as loginReducer } from './actions/login';
import { reducer as logoutReducer } from './actions/logout';
import { reducer as refreshReducer } from './actions/refresh';
import { reducer as captchaReducer } from './actions/captcha';

const reducers = [
  loginReducer,
  logoutReducer,
  refreshReducer,
  captchaReducer
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
