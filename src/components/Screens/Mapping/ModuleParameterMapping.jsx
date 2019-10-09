import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Form, message } from "antd";
import Modules from "../../Elements/Modules";
import MButton from "../../Elements/MButton";
import Parameters from "../../Elements/Parameters";
import { mapModuleParameter } from "../../../actions";

const ModuleParameterMapping = props => {
  const user = useSelector(state => state.userAuth);
  const [parameters, setParameters] = useState([]);
  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          module_id: formValues.module_id,
          parameter_id_list: JSON.stringify(parameters)
        };
        const response = await mapModuleParameter(user.Authorization, values);
        if (response.status === 200) {
          message.success("Mapped successfully");
        }
      }
    });
  };

  const onParameterChange = value => {
    setParameters(value);
  };

  const { getFieldDecorator } = props.form;
  return (
    <Card title="Module-Parameter Mapping">
      <Form onSubmit={onSubmit}>
        <Form.Item label="Modules">
          {getFieldDecorator("module_id", { rules: [{ required: true }] })(
            <Modules />
          )}
        </Form.Item>
        <Form.Item label="Parameters">
          value=(Parameters)
          {getFieldDecorator("parameter", { rules: [{ required: true }] })(
            <Parameters
              mode="multiple"
              onChange={onParameterChange}
              categories={[null]}
            />
          )}
        </Form.Item>

        <MButton>Submit</MButton>
      </Form>
    </Card>
  );
};

export default Form.create()(ModuleParameterMapping);
