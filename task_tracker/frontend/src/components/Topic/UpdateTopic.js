import React, { Component } from "react";
import { getTopic, createTopic } from "../../actions/topicActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateTopic extends Component {
  constructor() {
    super();

    // Initial State
    this.state = {
      id: "",
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

  // life cycle hooks. Load the received props
  componentWillReceiveProps(nextProps) {
    // if errors
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    // ReactDevTools/UpdateProject/Props/Topic. Destructure topic props
    const {
      id,
      topicName,
      topicIdentifier,
      description,
      start_date,
      end_date,
    } = nextProps.topic;

    // this.setState helps displaying existing props data
    this.setState({
      id,
      topicName,
      topicIdentifier,
      description,
      start_date,
      end_date,
    });
  }

  componentDidMount() {
    // get the topic identifier. Check from React/Componments/Match
    const { id } = this.props.match.params;
    // from API topicActions.js
    this.props.getTopic(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    // prevent the form from refreshing
    e.preventDefault();

    // new topic object
    const updateTopic = {
      id: this.state.id,
      topicName: this.state.topicName,
      topicIdentifier: this.state.topicIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    this.props.createTopic(updateTopic, this.props.history);
  }

  render() {
    // extract the errors from Redux
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Edit Leetcode Topic</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.topicName,
                    })}
                    placeholder="Leetcode Topic"
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
                    placeholder="Unique Topic ID"
                    name="topicIdentifier"
                    value={this.state.topicIdentifier}
                    onChange={this.onChange}
                    disabled
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
                    placeholder="Topic General Time and Space Complexity"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
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
                <h6>Estimated End Date</h6>
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
    );
  }
}

UpdateTopic.propTypes = {
  getTopic: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
  createTopic: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // From index.js(Reducer)/topicReducer.js
  topic: state.topic.topic,
  // get errors
  errors: state.errors,
});

export default connect(mapStateToProps, { getTopic, createTopic })(UpdateTopic);
