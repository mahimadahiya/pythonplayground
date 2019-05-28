import React from "react";
import { connect } from "react-redux";

import Table from "../../Elements/Tables"
import { fetchModuleTracks } from "../../../actions/";

class TrackList extends React.Component {

  componentWillMount = () => {
    this.props.fetchModuleTracks(this.props.user.Authorization)
  }

  transformTableData = () => {
    const headers = ['ID', 'Name', 'Organization', 'Organization ID', 'Going Live At']
    const data = this.props.tracks
    return { tableHeaders: headers, tableRow: data}
  }

  render() {
    console.log(this.props);
    return <div> <Table tableData={this.transformTableData()} /> </div>;
  }
}

const mapStateToProps = state => {
  return { tracks: Object.values(state.moduleTrack)[0], user: state.userAuth };
};

export default connect(
  mapStateToProps,
  { fetchModuleTracks }
)(TrackList);
