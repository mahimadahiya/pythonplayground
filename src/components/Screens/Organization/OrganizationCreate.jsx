import React, { useState } from "react";
import { Form, Input } from "antd";

const OrganizationCreate = props => {
  const [region, setRegion] = useState(null);
  const onSubmit = e => {};

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Name is required" }]
          })(<Input placeholder="Enter name of organization" />)}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create()(OrganizationCreate);
