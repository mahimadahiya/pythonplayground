import React from "react";
import { connect } from "react-redux";
import { Descriptions, Card } from "antd";
import { fetchModuleTracks, createModuleTrackMapping } from "../../../actions";
import { getOrganizationModules } from "../../../actions";
import { Formik } from "formik";
import DisplayFormModuleMapping from "../Form/DisplayFormModuleMapping";

class ModuleMapping extends React.Component {
  state = {
    track: null
  };

  onSubmit = formValues => {
    const data = {
      track_id: this.state.track.id,
      module_id_list: `${formValues.modules}`
    };
    console.log("data", data);
    this.props.createModuleTrackMapping(this.props.user.Authorization, data);
  };

  componentDidMount() {
    this.props.heading("Map Module");
    this.props.fetchModuleTracks(this.props.user.Authorization);
  }

  fetchTrack = () => {
    if (this.state.track === null) {
      const trackDetail = this.props.tracks[this.props.match.params.id];
      this.setState({
        track: trackDetail
      });
    }
  };

  componentDidUpdate() {
    if (this.state.track !== null) return;
    new Promise((res, rej) => {
      this.fetchTrack();
      res();
    }).then(() => {
      console.log("update", this.state);
      const orgId = this.state.track.organization_id;
      this.props.getOrganizationModules(orgId, this.props.user.Authorization);
    });
  }

  render() {
    console.log("state", this.state);
    if (this.state.track === null) return null;
    return (
      <div>
        <Card title="Details">
          <Descriptions bordered column="2">
            <Descriptions.Item label="Name">
              {this.state.track.name}
            </Descriptions.Item>
            <Descriptions.Item label="Organization Name">{`${
              this.state.track.organization__name
            } (${this.state.track.organization_id})`}</Descriptions.Item>

            <Descriptions.Item label="Starts At">
              {this.state.track.starts_at}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {this.props.modules ? (
          <Card title="Select Modules" style={{ marginTop: "10px" }}>
            <Formik
              onSubmit={this.onSubmit}
              render={formikProps => (
                <DisplayFormModuleMapping
                  {...formikProps}
                  list={this.props.modules}
                />
              )}
            />
          </Card>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    tracks: state.moduleTrack.moduleTracks,
    modules: Object.values(state.organization.organizationModules)
  };
};

export default connect(
  mapStateToProps,
  { fetchModuleTracks, getOrganizationModules, createModuleTrackMapping }
)(ModuleMapping);
