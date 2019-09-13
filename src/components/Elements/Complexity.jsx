import React, { forwardRef } from "react";
import { Select } from "antd";

const Complexity = forwardRef((props, ref) => {
  return (
    <Select
      placeholder="Select a complexity"
      onChange={props.onChange}
      defaultValue="1"
      value={props.value}
    >
      <Select.Option value="1">Very Easy</Select.Option>
      <Select.Option value="2">Easy</Select.Option>
      <Select.Option value="3">Medium</Select.Option>
      <Select.Option value="4">Tough</Select.Option>
      <Select.Option value="5">Very Tough</Select.Option>
    </Select>
  );
});

export default Complexity;
