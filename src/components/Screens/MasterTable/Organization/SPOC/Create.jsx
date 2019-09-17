import React from "react";
import { Card, Form, Input } from "antd";
import MButton from "../../../../Elements/MButton";
import { createSPOC } from "../../../../../actions";
import { useSelector } from "react-redux";

const SPOCCreate = props => {
  const user = useSelector(state => state.userAuth);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formProps) => {
      if (!err) {
        const response = await createSPOC(user.Authorization, formProps);
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Card>
      <Form onSubmit={onSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator("name", { rules: [{ required: true }] })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator("email", { rules: [{ required: true }] })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator("password", { rules: [{ required: true }] })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Confirm Password">
          {getFieldDecorator("confirm_password", {
            rules: [{ required: true }]
          })(<Input />)}
        </Form.Item>
        <MButton>Create SPOC</MButton>
      </Form>
    </Card>
  );
};

export default Form.create()(SPOCCreate);
