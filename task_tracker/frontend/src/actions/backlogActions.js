import axios from "axios";
import {
  GET_BACKLOG,
  GET_QUESTION,
  DELETE_QUESTION,
  GET_ERRORS,
} from "./types";

// Add a question API call
export const addQuestion = (backlog_id, question, history) => async (
  dispatch
) => {
  try {
    // from post question API(Controller Class)
    await axios.post(`/api/backlog/${backlog_id}`, question);
    history.push(`/topicBoard/${backlog_id}`);

    dispatch({
      type: GET_ERRORS,
      // reset errors. Stop from recurring display
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get all questions for a topic API call
export const getBacklog = (backlog_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/backlog/${backlog_id}`);

    dispatch({
      type: GET_BACKLOG,
      payload: res.data, // pass to payload at backlogReducer.js
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
