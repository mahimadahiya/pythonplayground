import React, { Component } from "react";
import { Form, Field } from "formik";
import {
  AntInput,
  AntInputPassword,
  AntDatePicker,
  AntSelect
} from "./FormFields";
import { Icon } from "antd";

import {
  validateEmail,
  validatePassword,
  validateRequired
} from "./ValidateFields";
import { dateFormat } from "./FieldFormats";

const DisplayFormTrackCreate = ({
  handleSubmit,
  values,
  submitCount,
  list
}) => {

  const selectOptionObject = list.map(({ id, name }) => { return({ name, id})})
  return (
    <Form className="form-container" onSubmit={handleSubmit}>
      <Field
        component={AntInput}
        name="trackName"
        type="text"
        label="Track Name"
        validate={validateRequired}
        submitCount={submitCount}
        hasFeedback
      />
      <Field
        label="Organization ID"
        component={AntSelect}
        name="orgId"
        prefix={<Icon type="lock" />}
        selectOptionObject={selectOptionObject}
        validate={validateRequired}
        submitCount={submitCount}
        hasFeedback
      />
      <Field
        component={AntDatePicker}
        name="liveDate"
        label="Going Live At"
        format={dateFormat}
        validate={validateRequired}
        submitCount={submitCount}
        hasFeedback
      />
      <div className="submit-container">
        <button className="ant-btn ant-btn-primary" type="submit">
          Create
        </button>
      </div>
    </Form>
  );
};

export default DisplayFormTrackCreate;
