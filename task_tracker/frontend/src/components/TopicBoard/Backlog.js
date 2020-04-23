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
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {qs}
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
            {
              // sample question starts here
              // sample question ends here
            }
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {
              // sample question starts here
              // sample question ends here
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
