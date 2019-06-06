import React from "react";
import { Form, Field } from "formik";
import { AntSelect, AntSwitch } from "./FormFields";
import { Icon, Card } from "antd";

import { validateRequired } from "./ValidateFields";

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
  return (
    <Card>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Field
          label="Organization Names"
          component={AntSelect}
          name="organization_id"
          prefix={<Icon type="lock" />}
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
          selectOptionObject={selectOptionObjectTracks}
          validate={validateRequired}
          submitCount={submitCount}
          hasFeedback
        />

        <Field
          label="Modes"
          name="mode"
          component={AntSwitch}
          onChange={handlers.setMode}
          unCheckedChildren="Batch Wise"
          checkedChildren="Organization Wide"
        />
        {handlers.showBatches ? (
          <Field
            label="Batches"
            name="selectedBatches"
            component={AntSelect}
            mode="multiple"
            selectOptionObject={selectOptionObjectBatches}
            validate={validateRequired}
            submitCount={submitCount}
            hasFeedback
          />
        ) : null}

        <div className="submit-container">
          <button className="ant-btn ant-btn-primary" type="submit">
            Map User
          </button>
        </div>
      </Form>
    </Card>
  );
};

export default DisplayFormMapUser;
