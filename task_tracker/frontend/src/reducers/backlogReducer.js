import {
  GET_BACKLOG,
  GET_QUESTION,
  DELETE_QUESTION,
  DELETE_TOPIC,
} from "../actions/types";

// reducer must have an initial state
const initialState = {
  questions: [],
  question: {},
};

// pass actions from this reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        questions: action.payload,
      };

    case GET_QUESTION:
      return {
        ...state,
        question: action.payload,
      };

    case DELETE_QUESTION:
      return {
        ...state,
        // TODO
      };

    default:
      return state;
  }
}
