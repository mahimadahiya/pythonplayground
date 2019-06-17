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
                <Select size="large"
            </Form.Item>
        )
  }

  return <React.Fragment />;
};

export default Filters;
