import React, { Component } from "react";
import TopicItem from "./Topic/TopicItem";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTopicButton from "./Topic/CreateTopicButton";

class Dashboard extends Component {
  render() {
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="display-4 text-center">
                Data Structure or Algorithms Topics
              </h2>
              <br />
              <CreateTopicButton />
              <br />
              <hr />
              <TopicItem />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
