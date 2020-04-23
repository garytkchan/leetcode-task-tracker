import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import topicReducer from "./topicReducer";
import backlogReducer from "./backlogReducer";

export default combineReducers({
  errors: errorReducer,
  topic: topicReducer, // from topicReducer
  backlog: backlogReducer,
});
