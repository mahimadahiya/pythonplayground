import React from "react";
import { Form, Field } from "formik";
import { AntSelect, AntSwitch } from "./FormFields";
import { Icon, Radio } from "antd";

import { validateRequired } from "./ValidateFields";

const DisplayFormMapUser = ({
  handleSubmit,
  values,
  submitCount,
  listOrgs,
  listTracks,
  handlers
}) => {
  const selectOptionObjectOrgs = listOrgs.map(({ id, name }) => {
    return { name, id };
  });
  const selectOptionObjectTracks = listTracks.map(({ id, name }) => {
    return { name, id };
  });
  return (
    <Form className="form-container" onSubmit={handleSubmit}>
      <Field
        label="Organization Names"
        component={AntSelect}
        name="modules"
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
        name="modules"
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
      />
      {handlers.renderTrackList()}
      {/* <Field
        label="Select Mode"
        name="mode"
        component={Radio.Group}
        onChange={handlers.setMode}
      >
        <Radio value="1">Track-Batch-Mapping</Radio>
        <Radio value="2">Track-Organization-Wide-Mapping</Radio>
        <Radio value="3">Track-UserMapping</Radio>
      </Field>
      {handlers.renderModeOptions()} */}

      <div className="submit-container">
        <button className="ant-btn ant-btn-primary" type="submit">
          Create
        </button>
      </div>
    </Form>
  );
};

export default DisplayFormMapUser;
