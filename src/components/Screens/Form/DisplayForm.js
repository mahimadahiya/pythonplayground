import React from "react";
import { Form, Field } from "formik";
import { AntInput } from "./FormFields";
import { validateEmail, isRequired, validatePassword } from "./ValidateFields";

export default ({ handleSubmit, values, submitCount }) => (
  <Form className="form-container" onSubmit={handleSubmit}>
    <Field
      component={AntInput}
      name="email"
      type="email"
      label="Email"
      validate={validateEmail}
      submitCount={submitCount}
      hasFeedback
    />
    <Field
      component={AntInput}
      name="password"
      type="password"
      validate={validatePassword}
      submitCount={submitCount}
      hasFeedback
    />
    <div className="submit-container">
      <button className="ant-btn ant-btn-primary" type="submit">
        Submit
      </button>
    </div>
  </Form>
);
