import React from "react";
import { Form, Field } from "formik";
import { AntSelect } from "./FormFields";
import { Card } from "antd";

import { validateRequired } from "./ValidateFields";
import MButton from "../../HOC/MButton";

const DisplayFormMapUser = ({
  handleSubmit,
  values,
  submitCount,
  listOrgs,
  listModules,
  handlers
}) => {
  const selectOptionObjectOrgs = listOrgs.map(({ id, name }) => {
    return { name, id };
  });
  const selectOptionObjectOrgModules = listModules.map(
    ({ module_id, module__name }) => {
      return { name: module__name, id: module_id };
    }
  );
  return (
    <Card>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Field
          label="Organization Names"
          component={AntSelect}
          name="organization_id"
          selectOptionObject={selectOptionObjectOrgs}
          validate={validateRequired}
          submitCount={submitCount}
          onChange={handlers.onOrgSelect}
          hasFeedback
        />

        <Field
          label="Organization Modules"
          component={AntSelect}
          name="organization_module_id"
          selectOptionObject={selectOptionObjectOrgModules}
          validate={validateRequired}
          submitCount={submitCount}
          //   onChange={handlers.onModuleSelect}
          hasFeedback
        />

        <MButton>Map User</MButton>
      </Form>
    </Card>
  );
};

export default DisplayFormMapUser;
