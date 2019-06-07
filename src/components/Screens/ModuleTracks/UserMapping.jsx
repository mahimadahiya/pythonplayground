import React from "react";
import { connect } from "react-redux";

import DisplayFormMapUser from "../Form/DisplayFormMapUser";
import {
  fetchModuleTracks,
  fetchOrganizations,
  fetchOrganizationBatches,
  fetchOrganizationTracks,
  createUserTrackMapping
} from "../../../actions";
import { Formik } from "formik";

class UserTrackMapping extends React.Component {
  state = {
    mode: 0,
    organization_id: null,
    selectedTracks: [],
    selectedBatches: []
  };

  setMode = e => {
    this.setState({ mode: e === true ? 1 : 0 });
  };

  componentWillMount = () => {
    this.props.fetchOrganizations(this.props.user.Authorization);
  };

  componentDidMount() {
    this.props.heading("Map Users");
  }

  onTrackSelect = e => {
    this.setState({ selectedTracks: e });
  };

  onBatchSelect = e => {
    this.setState({ selectedBatches: e });
  };

  onOrgSelect = e => {
    this.setState({ organization_id: e }, () => this.loadBatchTrackData());
  };

  loadBatchTrackData = () => {
    const query = { organization_id: this.state.organization_id };
    this.props.fetchOrganizationTracks(this.props.user.Authorization, query);
    this.props.fetchOrganizationBatches(this.props.user.Authorization, query);
  };

  onSubmit = values => {
    const query = {
      organization_id: values.organization_id,
      mode: this.state.mode,
      selectedBatches: `${values.selectedBatches}`,
      selectedTracks: `${values.selectedTracks}`
    };

    this.props.createUserTrackMapping(this.props.user.Authorization, query);
  };

  render() {
    return (
      <div>
        <Formik
          onSubmit={this.onSubmit}
          render={props => (
            <DisplayFormMapUser
              {...props}
              listOrgs={this.props.organizations}
              listTracks={this.props.organizationTracks}
              listBatches={this.props.organizationBatches}
              handlers={{
                onOrgSelect: this.onOrgSelect,
                setMode: this.setMode,
                showBatches: !this.state.mode
              }}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    tracks: Object.values(state.moduleTrack.moduleTracks),
    organizations: Object.values(state.organization.organizationList),
    organizationBatches: Object.values(state.organization.organizationBatches),
    organizationTracks: Object.values(state.organization.organizationTracks)
  };
};

export default connect(
  mapStateToProps,
  {
    fetchModuleTracks,
    fetchOrganizations,
    fetchOrganizationTracks,
    fetchOrganizationBatches,
    createUserTrackMapping
  }
)(UserTrackMapping);
