import React from "react";
import { Form, Field } from "formik";
import { AntSelect, AntSwitch } from "./FormFields";
import { Icon, Card } from "antd";

import { validateRequired } from "./ValidateFields";
import MButton from "../../Elements/MButton";

const DisplayFormMapUser = ({
  handleSubmit,
  values,
  submitCount,
  listOrgs,
  listTracks,
  listBatches,
  handlers
}) => {
  const selectOptionObjectOrgs = listOrgs.map(({ id, name }) => {
    return { name, id };
  });
  const selectOptionObjectTracks = listTracks.map(({ id, name }) => {
    return { name, id };
  });
  const selectOptionObjectBatches = listBatches.map(({ id, name }) => {
    return { name, id };
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
  }
  const filterTracks = (val, option) => {
    const filteredList = listTracks.filter(({  name }) => {
      if (name.toLowerCase().includes(val)) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].id.toString() === option.key) return true;
    }
    return false;
  }

  const filterBatches = (val, option) => {
    const filteredList = listBatches.filter(({ name }) => {
      if (name.toLowerCase().includes(val)) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].id.toString() === option.key) return true;
    }
    return false;
  }

  return (
    <Card>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Field
          label="Organization Names"
          component={AntSelect}
          name="organization_id"
          prefix={<Icon type="lock" />}
          showSearch
          filterOption={filterOrganizations}
          selectOptionObject={selectOptionObjectOrgs}
          validate={validateRequired}
          submitCount={submitCount}
          onChange={handlers.onOrgSelect}
          hasFeedback
        />
        <Field
          label="Tracks"
          component={AntSelect}
          name="selectedTracks"
          mode="multiple"
          filterOption={filterTracks}
          selectOptionObject={selectOptionObjectTracks}
          validate={validateRequired}
          submitCount={submitCount}
          hasFeedback
        />
        <div style={{ textAlign: "center" }}>
          <span>Modes:</span>
          <div>
            <Field
              name="mode"
              component={AntSwitch}
              onChange={handlers.setMode}
              unCheckedChildren="Batch Wise"
              checkedChildren="Organization Wide"
            />
          </div>
        </div>
        {handlers.showBatches ? (
          <Field
            label="Batches"
            name="selectedBatches"
            component={AntSelect}
            mode="multiple"
            filterOption={filterBatches}
            selectOptionObject={selectOptionObjectBatches}
            validate={validateRequired}
            submitCount={submitCount}
            hasFeedback
          />
        ) : null}

        <MButton>Map User</MButton>
      </Form>
    </Card>
  );
};

export default DisplayFormMapUser;
