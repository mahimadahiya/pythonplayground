import React from "react";
import { useSelector } from "react-redux";
import { Form, Input, Card, message, Select } from "antd";
import MButton from "../../Elements/MButton";
import { createOption } from "../../../actions";

const OptionCreate = props => {
  const user = useSelector(state => state.userAuth);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        try {
          await createOption(user.Authorization, formValues);
          message.success("Created successfully");
          props.setFilter(true);
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
      <Card title={<div className="card-title">Create Trait</div>}>
        <Form onSubmit={onSubmit}>
          <Form.Item label="Text">
            {getFieldDecorator("text", { rules: [{ required: true }] })(
              <Input placeholder="Enter text" />
            )}
          </Form.Item>
          <Form.Item label="Option type">
            {getFieldDecorator("option_type", { rules: [{ required: true }] })(
              <Select>
                <Select.Option key="text">Text</Select.Option>
                <Select.Option key="media">Media</Select.Option>
              </Select>
            )}
          </Form.Item>
          <MButton>Create</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(OptionCreate);
