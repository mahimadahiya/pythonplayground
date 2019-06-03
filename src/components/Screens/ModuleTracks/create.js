import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { TextField, DatePickerField } from "redux-form-antd";
import { Form, Button } from "antd";

import { createModuleTrack } from "../../../actions/";

class CreateTrack extends React.Component {
  onSubmit = fromValues => {
    console.log(this.props.user);
    this.props.createModuleTrack(this.props.user.Authorization, fromValues);
  };

  render() {
    return (
      <Form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="login-form"
      >
        <Form.Item>
          <Field
            name="name"
            component={TextField}
            placeholder="Track Name"
          />
        </Form.Item>
        <Form.Item>
          <Field
            name="organization_id"
            component={TextField}
            placeholder="Organization ID"
          />
        </Form.Item>
        <Form.Item>
          <Field
            name="going_live_at"
            component={DatePickerField}
            placeholder="Going Live At"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Create
          </Button>
        </Form.Item>
      </Form>
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
