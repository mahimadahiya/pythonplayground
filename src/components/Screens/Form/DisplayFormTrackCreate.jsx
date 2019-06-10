import React from "react";
import { Form, Field } from "formik";
import {
  AntInput,
  // AntInputPassword,
  AntDatePicker,
  AntSelect
} from "./FormFields";
import { Icon } from "antd";

import {
  // validateEmail,
  // validatePassword,
  validateRequired
} from "./ValidateFields";
import { dateFormat } from "./FieldFormats";
import MButton from "../../Elements/MButton";

const DisplayFormTrackCreate = ({
  handleSubmit,
  values,
  submitCount,
  list
}) => {
  const selectOptionObject = list.map(({ id, name }) => {
    return { name, id };
  });

  const filterOrganizations = (val, option) => {
    const filteredList = list.filter(({ name }) => {
      if (name.toLowerCase().includes(val) ) {
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
    <Form className="form-container" onSubmit={handleSubmit}>
      <Field
        component={AntInput}
        name="trackName"
        type="text"
        label="Track Name"
        validate={validateRequired}
        submitCount={submitCount}
        hasFeedback
      />
      <Field
        label="Organization ID"
        component={AntSelect}
        name="orgId"
        showSearch
        list={list}
        filterOption={filterOrganizations}
        prefix={<Icon type="lock" />}
        selectOptionObject={selectOptionObject}
        validate={validateRequired}
        submitCount={submitCount}
        hasFeedback
      />
      <Field
        component={AntDatePicker}
        name="liveDate"
        label="Going Live At"
        format={dateFormat}
        validate={validateRequired}
        submitCount={submitCount}
        hasFeedback
      />
      <MButton>Create Track</MButton>
    </Form>
  );
};

export default DisplayFormTrackCreate;
