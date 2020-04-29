import React from "react";
import { Link } from "react-router-dom";

const CreateTopicButton = () => {
  return (
    <React.Fragment>
      <div className="col-md-4">
        <Link to="/addTopic" className="btn btn-sm btn-info">
          <i className="fas fa-plus-circle"> Add a Topic</i>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default CreateTopicButton;
