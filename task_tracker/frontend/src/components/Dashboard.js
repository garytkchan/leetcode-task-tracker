import React, { Component } from "react";
import TopicItem from "./Topic/TopicItem";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTopicButton from "./Topic/CreateTopicButton";
import { connect } from "react-redux";
import { getTopics } from "../actions/topicActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  // live cycle hook
  componentDidMount() {
    this.props.getTopics();
  }

  render() {
    const { topics } = this.props.topic;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="display-4 text-center">
                Data Structure or Algorithms Topics
              </h3>

              <CreateTopicButton />

              <hr />
              {topics.map((topic) => (
                <TopicItem key={topic.id} topic={topic} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  topic: PropTypes.object.isRequired,
  getTopics: PropTypes.func.isRequired,
};

// this generates props
const mapStateToProps = (state) => ({
  // From index.js at reducers
  topic: state.topic, // props with name "topic"
});

export default connect(mapStateToProps, { getTopics })(Dashboard);
