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
  listSimulations,
  listModules,
  listDefaultSimulations,
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
  const selectOptionSimulations = listSimulations.map(({ id, text }) => {
    return { id, name: `${text.substring(0, 50)}...` };
  });

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

  console.log("form", listDefaultSimulations);

  return (
    <Card>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Field
          label="Organization Names"
          component={AntSelect}
          name="organization_id"
          showSearch
          filterOption={filterOrganizations}
          placeholder="Select Organization"
          selectOptionObject={selectOptionObjectOrgs}
          validate={validateRequired}
          submitCount={submitCount}
          onChange={handlers.onOrgSelect}
          hasFeedback
        />

        <Field
          label="Organization Modules"
          component={AntSelect}
          name="module_id"
          showSearch
          filterOption={filterModules}
          placeholder="Select Modules"
          selectOptionObject={selectOptionObjectOrgModules}
          validate={validateRequired}
          submitCount={submitCount}
          onChange={handlers.onModuleSelect}
          hasFeedback
        />

        <Field
          label="Simulations"
          component={AntSelect}
          name="question_id_list"
          mode="multiple"
          placeholder="Select Simulations"
          defaultValue={listDefaultSimulations}
          filterOption={filterModules}
          selectOptionObject={selectOptionSimulations}
          validate={validateRequired}
          submitCount={submitCount}
          hasFeedback
        />

        <MButton>Map Simulation</MButton>
      </Form>
    </Card>
  );
};

export default DisplayFormMapUser;
