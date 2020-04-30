import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addQuestion } from "../../../actions/backlogActions";
import classnames from "classnames";

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;

    // Initial State
    this.state = {
      summary: "",
      note: "",
      status: "",
      priority: 0,
      dueDate: "",
      topicIdentifier: id,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // life cycle hooks
  componentWillReceiveProps(nextProps) {
    // if errors
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    // prevent the form from refreshing
    e.preventDefault();

    // new question object
    const newQuestion = {
      summary: this.state.summary,
      note: this.state.note,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
    };

    // pass props to the addQuestion Function at backlogActions.js
    this.props.addQuestion(
      this.state.topicIdentifier,
      newQuestion,
      this.props.history
    );
  }

  render() {
    const { id } = this.props.match.params;
    // extract the errors from Redux
    const { errors } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/topicBoard/${id}`} className="btn btn-light">
                Back to Topic Board
              </Link>
              <h4 className="display-4 text-center">Add a Question</h4>
              <p className="lead text-center">Topic: {id}</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary,
                    })}
                    name="summary"
                    placeholder="Question No: Question Content"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.note,
                    })}
                    placeholder="Notes"
                    name="note"
                    value={this.state.note}
                    onChange={this.onChange}
                  ></textarea>
                  {errors.note && (
                    <div className="invalid-feedback">{errors.note}</div>
                  )}
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

// Set this class props
AddQuestion.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

// map to Redux State.errors
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { addQuestion })(AddQuestion);
