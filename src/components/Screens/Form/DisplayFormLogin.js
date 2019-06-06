import React from "react";
import { Form, Field } from "formik";
import { AntInput, AntInputPassword } from "./FormFields";
import { Icon } from "antd";
import { validateEmail, validatePassword } from "./ValidateFields";

export default ({ handleSubmit, values, submitCount }) => {
  return (
    <Form className="form-container" onSubmit={handleSubmit}>
      <Field
        component={AntInput}
        name="email"
        type="email"
        placeholder="Email"
        validate={validateEmail}
        prefix={<Icon type="user" />}
        submitCount={submitCount}
        hasFeedback
      />
      <Field
        component={AntInputPassword}
        name="password"
        type="password"
        placeholder="Password"
        prefix={<Icon type="lock" />}
        validate={validatePassword}
        submitCount={submitCount}
        hasFeedback
      />
      <div className="submit-container">
        <button className="ant-btn ant-btn-primary" type="submit">
          Login
        </button>
      </div>
    </Form>
  );
};
