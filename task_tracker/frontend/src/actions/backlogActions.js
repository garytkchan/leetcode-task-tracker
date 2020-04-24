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

// API Call
// history is for when we get errors, we need to redirect back to topicBoard
export const getQuestion = (backlog_id, q_id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/backlog/${backlog_id}/${q_id}`);
    dispatch({
      type: GET_QUESTION,
      payload: res.data,
    });
  } catch (error) {
    // return to dashboard if invalid id is given
    history.push("/dashboard");
  }
};

// Update a question
export const updateQuestion = (backlog_id, q_id, question, history) => async (
  dispatch
) => {
  try {
    // patch to this API call
    await axios.patch(`/api/backlog/${backlog_id}/${q_id}`, question);

    // direct back to this topicBoard page
    history.push(`/topicBoard/${backlog_id}`);

    // reset errors
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// API Call
// Delete a question
export const deleteQuestion = (backlog_id, q_id) => async (dispatch) => {
  // pops up confirm delete box
  if (
    window.confirm(
      `Please confirm that you want to delete this question: ${q_id}`
    )
  ) {
    await axios.delete(`/api/backlog/${backlog_id}/${q_id}`);
    dispatch({
      type: DELETE_QUESTION,
      payload: q_id, // pass to payload at backlogReducer.js
    });
  }
};
