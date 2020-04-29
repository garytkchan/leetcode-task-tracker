import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTopic } from "../../actions/topicActions";

class TopicItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteTopic(id);
  };

  render() {
    const { topic } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{topic.topicIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{topic.topicName}</h3>
              <p>{topic.description}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/topicBoard/${topic.topicIdentifier}`}>
                  <li className="list-group-item board py-1">
                    <i className="fas fa-book-open"> Look At Questions</i>
                  </li>
                </Link>
                <Link to={`/updateTopic/${topic.topicIdentifier}`}>
                  <li className="list-group-item update py-1">
                    <i className="fa fa-edit pr-1"> Update Topic</i>
                  </li>
                </Link>

                <li
                  className="list-group-item delete py-1"
                  onClick={this.onDeleteClick.bind(this, topic.topicIdentifier)}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Topic</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TopicItem.propTypes = {
  deleteTopic: PropTypes.func.isRequired,
};

export default connect(null, { deleteTopic })(TopicItem);
