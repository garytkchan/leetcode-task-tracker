import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css.map";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddTopic from "./components/Topic/AddTopic";
import { Provider } from "react-redux";
import store from "./store";
import UpdateTopic from "./components/Topic/UpdateTopic";
import TopicBoard from "./components/TopicBoard/TopicBoard";
import AddQuestion from "./components/TopicBoard/Questions/AddQuestion";
import UpdateQuestion from "./components/TopicBoard/Questions/UpdateQuestion";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityAction";

// everytime refreshes of page, token is gone.
// Set token here prevent this problem
const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  // set token
  setJWTToken(jwtToken);
  // decode token
  const decoded_token = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_token,
  });

  const currentTime = Date.now() / 1000;

  // if time for token is expired
  if (decoded_token.exp < currentTime) {
    // handle logout needed
    store.dispatch(logout());
    // send user back to the main page
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {
              // Public routes
            }

            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              // Below are all private routes
            }

            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addTopic" component={AddTopic} />
            <Route exact path="/updateTopic/:id" component={UpdateTopic} />
            <Route exact path="/topicBoard/:id" component={TopicBoard} />
            <Route exact path="/addQuestion/:id" component={AddQuestion} />
            <Route
              exact
              path="/updateQuestion/:backlog_id/:q_id"
              component={UpdateQuestion}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
