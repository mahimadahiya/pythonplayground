import React, { forwardRef } from "react";
import { Select } from "antd";

const Gender = forwardRef((props, ref) => {
  return (
    <Select
      placeholder="Select a gender"
      onChange={props.onChange}
      value={props.value}
    >
      <Select.Option value="m">Male</Select.Option>
      <Select.Option value="f">Female</Select.Option>
    </Select>
  );
});

export default Gender;
