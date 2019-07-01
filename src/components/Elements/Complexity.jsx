import React from "react";
import { Form, Select } from "antd";

const Complexity = props => {
  return (
    <div>
      <Form.Item label="Complexity">
        <Select
          placeholder="Select a complexity"
          onChange={props.onChange}
          defaultValue={1}
          value={props.value}
        >
          <Select.Option value={1}>Very Easy</Select.Option>
          <Select.Option value={2}>Easy</Select.Option>
          <Select.Option value={3}>Medium</Select.Option>
          <Select.Option value={4}>Tough</Select.Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default Complexity;
