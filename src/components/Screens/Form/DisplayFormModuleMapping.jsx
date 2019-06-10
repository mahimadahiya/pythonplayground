import React from "react";
import { Form, Field } from "formik";
import { AntSelect } from "./FormFields";
import { Icon } from "antd";

import { validateRequired } from "./ValidateFields";
import MButton from "../../Elements/MButton";

const DisplayFormModuleMapping = ({
  handleSubmit,
  values,
  submitCount,
  list
}) => {
  const selectOptionObject = list.map(({ module__name, module_id }) => {
    return { name: module__name, id: module_id };
  });
  const filterModules = (val, option) => {
    const filteredList = list.filter(({ module__name }) => {
      if (module__name.toLowerCase().includes(val)) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].module_id.toString() === option.key) return true;
    }
    return false;
  }

  return (
    <Form className="form-container" onSubmit={handleSubmit}>
      <Field
        label="Modules"
        component={AntSelect}
        name="modules"
        mode="multiple"
        filterOption={filterModules}
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
