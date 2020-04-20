import axios from "axios";
import { GET_ERRORS } from "./types";

//name = createTopic with topic and history variables
export const createTopic = (topic, history) => async (dispatch) => {
  try {
    // from post API
    const res = await axios.post("http://localhost:8080/api/topic", topic);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
