import React from "react";
import { Form, message } from "antd";
import Services from "../../Elements/Services";
import MButton from "../../Elements/MButton";
import Categories from "../../Elements/Categories";
import { createModule } from "../../../actions";
import { useSelector } from "react-redux";

const CreateModule = props => {
  const user = useSelector(state => state.userAuth);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        await createModule(user.Authorization, formValues);
        message.success("Module created successfully");
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Item label="Services">
          {getFieldDecorator("service_id", {
            rules: [{ required: true, message: "Service Id is required" }]
          })(<Services />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("category_id", {
            rules: [{ required: true, message: "Category Id is required" }]
          })(<Categories />)}
        </Form.Item>
        <MButton>Create Module</MButton>
      </Form>
    </div>
  );
};

export default Form.create()(CreateModule);
