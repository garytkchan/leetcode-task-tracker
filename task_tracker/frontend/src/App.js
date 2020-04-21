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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addTopic" component={AddTopic} />
            <Route exact path="/updateTopic/:id" component={UpdateTopic} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
