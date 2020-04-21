import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createTopic } from "../../actions/topicActions";
import classnames from "classnames";

class AddTopic extends Component {
  constructor() {
    super();

    // Initial State
    this.state = {
      topicName: "",
      topicIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
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

    // new topic object
    const newTopic = {
      topicName: this.state.topicName,
      topicIdentifier: this.state.topicIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    this.props.createTopic(newTopic, this.props.history);
  }

  render() {
    // extract the errors from Redux
    const { errors } = this.state;

    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">
                  Create New LeetCode Topic
                </h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.topicName,
                      })}
                      placeholder="Topic: Linked List, Array, etc."
                      name="topicName"
                      value={this.state.topicName}
                      onChange={this.onChange}
                    />
                    {errors.topicName && (
                      <div className="invalid-feedback">{errors.topicName}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.topicIdentifier,
                      })}
                      placeholder="Unique Abbreviation"
                      name="topicIdentifier"
                      value={this.state.topicIdentifier}
                      onChange={this.onChange}
                    />
                    {errors.topicIdentifier && (
                      <div className="invalid-feedback">
                        {errors.topicIdentifier}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.description,
                      })}
                      placeholder="General Time and Space Complexity for this topic to pass interview"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                    ></textarea>
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>
                  <h6>Start Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="start_date"
                      value={this.state.start_date}
                      onChange={this.onChange}
                    />
                  </div>
                  <h6>Est. End Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="end_date"
                      value={this.state.end_date}
                      onChange={this.onChange}
                    />
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
      </div>
    );
  }
}

AddTopic.propTypes = {
  createTopic: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

// map to Redux State.errors
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createTopic })(AddTopic);
