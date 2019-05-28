import React from "react";
import { connect } from "react-redux";

import { createModuleTrack } from "../../../actions/";

class CreateTrack extends React.Component {
  render() {
    console.log(this.props);
    return <div> TrackList </div>;
  }
}

export default connect(
  null,
  { createModuleTrack }
)(CreateTrack);
