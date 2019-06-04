import React, { Component } from "react";
import { Form, Field } from "formik";
import {
  AntInput,
  AntInputPassword,
  AntDatePicker,
  AntSelect
} from "./FormFields";
import { Icon } from "antd";
import { connect } from "react-redux";
import { fetchOrganizations } from "../../../actions";
import {
  validateEmail,
  validatePassword,
  validateRequired
} from "./ValidateFields";
import { dateFormat } from "./FieldFormats";

class DisplayFormTrackCreate extends Component {
  componentDidMount() {
    this.props.fetchOrganizations(this.props.user.Authorization);
  }

  render() {
    return (
      // <Form className="form-container" onSubmit={this.props.handleSubmit}>
      //   <Field
      //     component={AntInput}
      //     name="trackName"
      //     type="text"
      //     validate={validateRequired}
      //     submitCount={this.props.submitCount}
      //     hasFeedback
      //   />
      //   <Field
      //     component={AntSelect}
      //     name="orgId"
      //     type="text"
      //     prefix={<Icon type="lock" />}
      //     selectOptions={this.props.organizations}
      //     validate={validateRequired}
      //     submitCount={this.props.submitCount}
      //     hasFeedback
      //   />
      //   <Field
      //     component={AntDatePicker}
      //     name="liveDate"
      //     label="Going Live At"
      //     format={dateFormat}
      //     validate={validateRequired}
      //     submitCount={this.props.submitCount}
      //     hasFeedback
      //   />
      <div className="submit-container">
        <button className="ant-btn ant-btn-primary" type="submit">
          Login
        </button>
      </div>
      // </Form>
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
  { fetchOrganizations }
)(DisplayFormTrackCreate);
