import React from "react";
import { Form, Field } from "formik";
import { AntInput, AntInputPassword } from "./FormFields";
import { Icon } from "antd";
import { validateEmail, validatePassword } from "./ValidateFields";
import { Button } from "antd";
import MButton from "../../HOC/MButton";

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
      <div className="submit-container text-center">
        <MButton>Login</MButton>
      </div>
    </Form>
  );
};
