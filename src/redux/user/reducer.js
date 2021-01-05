import initialState from './initialState';
import { reducer as createCustomerReducer } from './actions/createCustomer';
import { reducer as getCustomerReducer } from './actions/getCustomer';
import { reducer as updateCustomerReducer } from './actions/updateCustomer';
import { reducer as deleteCustomerReducer } from './actions/deleteCustomer';

import { reducer as setCurrentReducer } from './actions/setCurrent';

const reducers = [
  createCustomerReducer,
  getCustomerReducer,
  updateCustomerReducer,
  deleteCustomerReducer,
  setCurrentReducer
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
