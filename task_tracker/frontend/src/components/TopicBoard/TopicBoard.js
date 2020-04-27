import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";

class TopicBoard extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  // live cycle hook
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    // get to topic identifier
    const { id } = this.props.match.params;
    // match the state from Redux
    const { questions } = this.props.backlog;
    // get errors
    const { errors } = this.state;

    let BoardContent;

    const boardAlgorithm = (errors, questions) => {
      if (questions.length < 1) {
        if (errors.topicNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.topicNotFound}
            </div>
          );
        } else if (errors.topicIdentifier) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.topicIdentifier}
            </div>
          );
        }
        {
          return (
            <div className="alert alert-danger text-center" role="alert">
              No Question Created Under This Topic
            </div>
          );
        }
      } else {
        return <Backlog questions_prop={questions} />;
      }
    };

    BoardContent = boardAlgorithm(errors, questions);

    return (
      <div className="container">
        <Link to={`/addQuestion/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Add a Question</i>
        </Link>
        <br />
        <hr />
        {
          // backlog starts here
          BoardContent
        }
      </div>
    );
  }
}

TopicBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

// this generates props
const mapStateToProps = (state) => ({
  // From index.js at reducers
  backlog: state.backlog, // props with name "backlog"
  errors: state.errors,
});

export default connect(mapStateToProps, { getBacklog })(TopicBoard);
