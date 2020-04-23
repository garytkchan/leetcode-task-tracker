import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";

class TopicBoard extends Component {
  // live cycle hook
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }

  render() {
    // get to topic identifier
    const { id } = this.props.match.params;
    // match the state from Redux
    const { questions } = this.props.backlog;
    return (
      <div className="container">
        <Link to={`/addQuestion/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Add a Question</i>
        </Link>
        <br />
        <hr />
        {
          // backlog starts here
        }
        <Backlog questions_prop={questions} />
      </div>
    );
  }
}

TopicBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
};

// this generates props
const mapStateToProps = (state) => ({
  // From index.js at reducers
  backlog: state.backlog, // props with name "backlog"
});

export default connect(mapStateToProps, { getBacklog })(TopicBoard);
