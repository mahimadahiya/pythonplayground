import React from "react";
import { Input, Form, Select } from "antd";

const Filters = props => {
  switch (props.component) {
    case "input":
      return (
        <Form.Item label={props.label}>
          <Input
            size="large"
            onChange={props.onChange}
            placeholder={props.placeholder}
          />
        </Form.Item>
      );
    case "select":
      return (
        <Form.Item label={props.label}>
          <Select
            size="large"
            labelInValue={props.labelInValue}
            onChange={props.onChange}
            placeholder={props.placeholder}
            style={{ minWidth: 300 }}
          >
            {props.options.map(option => {
              return (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      );
    default:
      return null;
  }
};

export default Filters;
