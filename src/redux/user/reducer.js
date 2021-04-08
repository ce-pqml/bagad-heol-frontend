import initialState from './initialState';
import { reducer as createUserReducer } from './actions/createUser';
import { reducer as getUserReducer } from './actions/getUser';
import { reducer as updateUserReducer } from './actions/updateUser';
import { reducer as deleteUserReducer } from './actions/deleteUser';

import { reducer as changePasswordReducer } from './actions/changePassword';
import { reducer as forgotPasswordReducer } from './actions/forgotPassword';

import { reducer as getProfilReducer } from './actions/getProfil';

import { reducer as setCurrentReducer } from './actions/setCurrent';

const reducers = [
  createUserReducer,
  getUserReducer,
  updateUserReducer,
  deleteUserReducer,
  setCurrentReducer,
  changePasswordReducer,
  forgotPasswordReducer,
  getProfilReducer
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
