import React from "react";
import { connect } from "react-redux";
import DisplayFormTrackCreate from "../Form/DisplayFormTrackCreate";
import { Card } from "antd";
import { Formik } from "formik";
import { dateFormat } from "../Form/FieldFormats";

import { createModuleTrack, fetchOrganizations } from "../../../actions";
import moment from "moment";

class CreateTrack extends React.Component {
  componentDidMount() {
    this.props.fetchOrganizations(this.props.user.Authorization);
    this.props.heading("Create Track");
  }

  onSubmit = formProps => {
    const { liveDate, orgId, trackName } = formProps;
    const selectedDate = moment(liveDate).format(dateFormat);
    const formValues = {
      name: trackName,
      organization_id: orgId,
      going_live_at: selectedDate
    };
    this.props.createModuleTrack(this.props.user.Authorization, formValues);
  };

  render() {
    return (
      <div>
        <Card>
          <Formik
            onSubmit={this.onSubmit}
            render={formikProps => (
              <DisplayFormTrackCreate
                {...formikProps}
                list={this.props.organizations}
              />
            )}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizations: Object.values(state.organization.organizationList),
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { createModuleTrack, fetchOrganizations }
)(CreateTrack);
