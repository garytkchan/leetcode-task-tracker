import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteQuestion } from "../../../actions/backlogActions";

// This class is the child of Backlog.js
class Question extends Component {
  onDeleteClick(backlog_id, q_id) {
    this.props.deleteQuestion(backlog_id, q_id);
  }

  render() {
    const { question } = this.props;
    let priorityString;
    let priorityClass;

    if (question.priority === 1) {
      priorityClass = "bg-danger text-light";
      priorityString = "HIGH";
    }
    if (question.priority === 2) {
      priorityClass = "bg-warning text-light";
      priorityString = "MEDIUM";
    }
    if (question.priority === 3) {
      priorityClass = "bg-info text-light";
      priorityString = "LOW";
    }
    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          ID: {question.topicSequence} -- Priority: {priorityString}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{question.summary}</h5>
          <p className="card-text text-truncate ">{question.note}</p>
          <Link
            to={`/updateQuestion/${question.topicIdentifier}/${question.topicSequence}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteClick.bind(
              this,
              question.topicIdentifier,
              question.topicSequence
            )}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  deleteQuestion: PropTypes.func.isRequired,
};

export default connect(null, { deleteQuestion })(Question);
