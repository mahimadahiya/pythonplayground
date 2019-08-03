import React from "react";
import { useSelector } from "react-redux";
import { Card, Form, message } from "antd";
import MButton from "../../Elements/MButton";
import { mapServiceModule } from "../../../actions";
import Services from "../../Elements/Services";
import Modules from "../../Elements/Modules";

const ServiceModuleMapping = props => {
  const user = useSelector(state => state.userAuth);
  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          service_id: formValues.service_id,
          module_id_list: JSON.stringify(formValues.module_id_list)
        };
        const response = await mapServiceModule(user.Authorization, values);
        if (response.status === 200) {
          message.success("Mapped successfully");
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Card title="Service Module Mapping">
      <Form onSubmit={onSubmit}>
        <Form.Item label="Services">
          {getFieldDecorator("service_id", {
            rules: [{ required: true }]
          })(<Services />)}
        </Form.Item>
        <Form.Item label="Modules">
          {getFieldDecorator("module_id_list", {
            rules: [{ required: true }]
          })(<Modules mode="multiple" />)}
        </Form.Item>
        <MButton>Submit</MButton>
      </Form>
    </Card>
  );
};

export default Form.create()(ServiceModuleMapping);
