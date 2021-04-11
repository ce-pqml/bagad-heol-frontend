import initialState from './initialState';
import { reducer as getListTicketUserReducer } from './actions/getListTicketUser';
import { reducer as getTicketByIdReducer } from './actions/getTicketById';
import { reducer as addTicketReducer } from './actions/addTicket';

const reducers = [
  getListTicketUserReducer,
  getTicketByIdReducer,
  addTicketReducer,
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
