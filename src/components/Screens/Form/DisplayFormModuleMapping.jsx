import React from "react";
import { Form, Field } from "formik";
import { AntSelect } from "./FormFields";
import { Icon } from "antd";

import { validateRequired } from "./ValidateFields";

const DisplayFormModuleMapping = ({
  handleSubmit,
  values,
  submitCount,
  list
}) => {
  console.log("list", values);
  const selectOptionObject = list.map(({ module__name, module_id }) => {
    return { name: module__name, id: module_id };
  });
  return (
    <Form className="form-container" onSubmit={handleSubmit}>
      <Field
        label="Modules"
        component={AntSelect}
        name="modules"
        mode="multiple"
        prefix={<Icon type="lock" />}
        selectOptionObject={selectOptionObject}
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

export default DisplayFormModuleMapping;
