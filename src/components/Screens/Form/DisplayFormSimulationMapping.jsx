import React from "react";
import { Form, Field } from "formik";
import { AntSelect } from "./FormFields";
import { Card } from "antd";

import { validateRequired } from "./ValidateFields";
import MButton from "../../Elements/MButton";

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
  const filterOrganizations = (val, option) => {
    const filteredList = listOrgs.filter(({ name }) => {
      if (name.toLowerCase().includes(val)) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].id.toString() === option.key) return true;
    }
    return false;
  };
  const filterModules = (val, option) => {
    const filteredList = listModules.filter(({ module__name }) => {
      if (module__name.toLowerCase().includes(val)) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].module_id.toString() === option.key) return true;
    }
    return false;
  };

  return (
    <Card>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Field
          label="Organization Names"
          component={AntSelect}
          name="organization_id"
          showSearch
          filterOption={filterOrganizations}
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
          showSearch
          filterOption={filterModules}
          selectOptionObject={selectOptionObjectOrgModules}
          validate={validateRequired}
          submitCount={submitCount}
          //   onChange={handlers.onModuleSelect}
          hasFeedback
        />

        <Field
          label="Organization Modules"
          component={AntSelect}
          name="organization_module_id"
          mode="multiple"
          filterOption={filterModules}
          selectOptionObject={selectOptionObjectOrgModules}
          validate={validateRequired}
          submitCount={submitCount}
          //   onChange={handlers.onModuleSelect}
          hasFeedback
        />

        <MButton>Map Simulation</MButton>
      </Form>
    </Card>
  );
};

export default DisplayFormMapUser;
