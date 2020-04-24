import axios from "axios";
import { GET_ERRORS, GET_TOPICS, GET_TOPIC, DELETE_TOPIC } from "./types";

// API Call
//name = createTopic with topic and history variables
export const createTopic = (topic, history) => async (dispatch) => {
  try {
    // from post API(Controller Class)
    await axios.post("/api/topic", topic);
    history.push("/dashboard");

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

// proxy defined in package.json: http://localhost:8080!!!!!!!!!!

// get all topics API Call
export const getTopics = () => async (dispatch) => {
  const res = await axios.get("/api/topic/all");
  dispatch({
    type: GET_TOPICS,
    payload: res.data, // pass to payload at topicReducer.js
  });
};

// API Call
// history is for when we get errors, we need to redirect backt o dashboard
export const getTopic = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/topic/${id}`);
    dispatch({
      type: GET_TOPIC,
      payload: res.data,
    });
  } catch (error) {
    // return to dashboard if invalid id is given
    history.push("/dashboard");
  }
};

// API Call
// Delete a topic
export const deleteTopic = (id) => async (dispatch) => {
  // pops up confirm delete box
  if (
    window.confirm(`Please confirm that you want to delete this topic: ${id}`)
  ) {
    await axios.delete(`/api/topic/${id}`);
    dispatch({
      type: DELETE_TOPIC,
      payload: id, // pass to payload at topicReducer.js
    });
  }
};
