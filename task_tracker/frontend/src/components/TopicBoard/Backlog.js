import React, { Component } from "react";
import Question from "./Questions/Question";

// child class of TopicBoard.js
class Backlog extends Component {
  render() {
    // Get questions.prop from TopicBoard.js
    const { questions_prop } = this.props;
    // qs is a array
    const qs = questions_prop.map((question) => (
      <Question key={question.id} question={question} />
    ));

    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    for (let i = 0; i < qs.length; i++) {
      if (qs[i].props.question.status === "TO_DO") {
        todoItems.push(qs[i]);
      } else if (qs[i].props.question.status === "IN_PROGRESS") {
        inProgressItems.push(qs[i]);
      } else if (qs[i].props.question.status === "DONE") {
        doneItems.push(qs[i]);
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {todoItems}
            {
              // insert here
            }
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {inProgressItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {doneItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
