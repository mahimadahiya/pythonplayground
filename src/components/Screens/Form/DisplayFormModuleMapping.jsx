import React from "react";
import { Form, Field } from "formik";
import { AntSelect } from "./FormFields";
import { Icon } from "antd";

import { validateRequired } from "./ValidateFields";
import MButton from "../../HOC/MButton";

const DisplayFormModuleMapping = ({
  handleSubmit,
  values,
  submitCount,
  list
}) => {
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

      <MButton>Map Module</MButton>
    </Form>
  );
};

export default DisplayFormModuleMapping;
