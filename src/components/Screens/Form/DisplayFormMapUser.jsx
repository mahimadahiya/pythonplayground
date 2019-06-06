import React from "react";
import { Form, Field } from "formik";
import { AntSelect } from "./FormFields";
import { Icon } from "antd";

import { validateRequired } from "./ValidateFields";

const onOrgSelect = () => {
  console.log("org elected");
};

const DisplayFormMapUser = ({
  handleSubmit,
  values,
  submitCount,
  list,
  handlers
}) => {
  const selectOptionObject = list.map(({ id, name }) => {
    return { name, id };
  });
  return (
    <Form className="form-container" onSubmit={handleSubmit}>
      <Field
        label="Organization Names"
        component={AntSelect}
        name="modules"
        prefix={<Icon type="lock" />}
        selectOptionObject={selectOptionObject}
        validate={validateRequired}
        submitCount={submitCount}
        onChange={handlers.onOrgSelect}
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

export default DisplayFormMapUser;
