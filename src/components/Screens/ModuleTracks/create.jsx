import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import DisplayFormTrackCreate from "../Form/DisplayFormTrackCreate";
import { TextField, DatePickerField } from "redux-form-antd";
import { Form, Button, Card } from "antd";
import { Formik } from "formik";
import { dateFormat } from "../Form/FieldFormats";
import logo from "../../../assets/logo.png";

import { createModuleTrack } from "../../../actions";
import moment from "moment";

class CreateTrack extends React.Component {
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
    return (
      <div className="center">
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img src={logo} style={{ margin: "auto 0" }} alt="logo" />
        </div>
        <Card>
          <Formik onSubmit={this.onSubmit} render={DisplayFormTrackCreate} />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userAuth };
};

const formWrapped = reduxForm({ form: "createTrack" })(CreateTrack);

export default connect(
  mapStateToProps,
  { createModuleTrack }
)(formWrapped);
