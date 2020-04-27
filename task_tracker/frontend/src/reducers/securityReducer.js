import { SET_CURRENT_USER } from "../actions/types";

// reducer must have an initial state
const initialState = {
  user: {},
  // empty user doens't have a valide token
  validToken: false,
};

// set validToken to be true if we have a payload
const booleanActionPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

// pass actions from this reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload), // true/false
        user: action.payload,
      };

    default:
      return state;
  }
}
