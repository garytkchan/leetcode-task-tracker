import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getQuestion, updateQuestion } from "../../../actions/backlogActions";
import { Link } from "react-router-dom";

class UpdateQuestion extends Component {
  // this function is used to get the state at Redux
  componentDidMount() {
    const { backlog_id, q_id } = this.props.match.params;
    this.props.getQuestion(backlog_id, q_id, this.props.history);
  }

  constructor() {
    super();

    // Initial State
    this.state = {
      id: "",
      topicSequence: "",
      summary: "",
      note: "",
      status: "",
      priority: "",
      dueDate: "",
      topicIdentifier: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // life cycle hooks. Load the received props
  componentWillReceiveProps(nextProps) {
    // if errors
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    // ReactDevTools/UpdateQuestion/Props/question. ES6 Destructure question props
    const {
      id,
      topicSequence,
      summary,
      note,
      status,
      priority,
      dueDate,
      topicIdentifier,
    } = nextProps.question;

    // this.setState helps displaying existing props data
    this.setState({
      id,
      topicSequence,
      summary,
      note,
      status,
      priority,
      dueDate,
      topicIdentifier,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    // prevent the form from refreshing
    e.preventDefault();

    // new topic object
    const updateQuestion = {
      id: this.state.id,
      topicSequence: this.state.topicSequence,
      summary: this.state.summary,
      note: this.state.note,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      topicIdentifier: this.state.topicIdentifier,
    };
    this.props.updateQuestion(
      this.state.topicIdentifier,
      this.state.topicSequence,
      updateQuestion, // from onSubmit. Just above
      this.props.history
    );
  }

  render() {
    // extract the errors from Redux
    const { errors } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/topicBoard/${this.state.topicIdentifier}`}
                className="btn btn-light"
              >
                Back to Topic Board
              </Link>
              <h4 className="display-4 text-center">Update Question</h4>
              <p className="lead text-center">
                Topic: {this.state.topicIdentifier} + Question Code:
                {this.state.topicSequence}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary,
                    })}
                    name="summary"
                    placeholder="Question No. and its title"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="note"
                    value={this.state.note}
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateQuestion.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // From index.js(Reducer)/backlogReducer.js
  question: state.backlog.question,
  // get errors
  errors: state.errors,
});

export default connect(mapStateToProps, { getQuestion, updateQuestion })(
  UpdateQuestion
);
