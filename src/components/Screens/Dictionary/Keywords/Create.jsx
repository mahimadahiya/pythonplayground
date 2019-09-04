import React from "react";
import { useSelector } from "react-redux";
import { Card, Form, Input, message } from "antd";
import MButton from "../../../Elements/MButton";
import { createJargon } from "../../../../actions";

const CreateKeyword = props => {
  const user = useSelector(state => state.userAuth);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formProps) => {
      if (!err) {
        try {
          await createJargon(user.Authorization, formProps);
          message.success("Created successfully");
          props.onCloseModal();
        } catch (err) {
          message.error("Internal server error");
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Card>
        <Form onSubmit={onSubmit}>
          <Form.Item label="Name">
            {getFieldDecorator("name", { rules: [{ required: true }] })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator("description", { rules: [{ required: true }] })(
              <Input />
            )}
          </Form.Item>
          <MButton>{props.id ? "Edit" : "Create"}</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(CreateKeyword);
