import React, { useState } from "react";
import { Form, Input } from "antd";
import Region from "../../Elements/Region";

const OrganizationCreate = props => {
  const [region, setRegion] = useState(null);
  const onSubmit = e => {};

  const onChangeRegion = val => {
    setRegion(val);
  };
  console.log(region);

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Name is required" }]
          })(<Input placeholder="Enter name of organization" />)}
        </Form.Item>
        <Region mode="single" onChange={onChangeRegion} />
      </Form>
    </div>
  );
};

export default Form.create()(OrganizationCreate);
