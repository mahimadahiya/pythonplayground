import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import DisplayFormTrackCreate from "../Form/DisplayFormTrackCreate";
import { TextField, DatePickerField } from "redux-form-antd";
import { Form, Button, Card } from "antd";
import { Formik } from "formik";
import { dateFormat } from "../Form/FieldFormats";
import logo from "../../../assets/logo.png";

import { createModuleTrack, fetchOrganizations } from "../../../actions";
import moment from "moment";

class CreateTrack extends React.Component {
  componentDidMount() {
    this.props.fetchOrganizations(this.props.user.Authorization);
    this.props.heading("Create Track");
  }

  onSubmit = formProps => {
    console.log(this.props.user);
    console.log(formProps);
    const { liveDate, orgId, trackName } = formProps;
    const selectedDate = moment(liveDate).format(dateFormat);
    const formValues = {
      track_name: trackName,
      organisation_id: orgId,
      going_live_at: selectedDate
    };
    this.props.createModuleTrack(this.props.user.Authorization, formValues);
  };

  render() {
    console.log(this.props.organizations);
    return (
      <div>
        <Card>
          <Formik
            onSubmit={this.onSubmit}
            render={() => (
              <DisplayFormTrackCreate list={this.props.organizations} />
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
