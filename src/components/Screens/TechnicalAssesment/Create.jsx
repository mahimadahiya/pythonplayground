import React from "react";
import { Card, Input, message, Form, Select } from "antd";
import { useSelector } from "react-redux";
import { createNewTechnicalService } from "../../../actions";
import Organizations from "../../Elements/Organizations";
import MButton from "../../Elements/MButton";
const { Option } = Select;

const Create = props => {
  const user = useSelector(state => state.userAuth);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          organization_id: formValues.organization_id,
          name: formValues.name,
          is_sequential: formValues.is_sequential
        };
        const response = await createNewTechnicalService(
          user.Authorization,
          values
        );
        if (response.status === 201) {
          message.success("Assesment group created successfully");
          props.setCreateNewModalShow(false);
          props.setLoadAgain(!props.loadAgain);
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <div>
      <Card>
        <Form onSubmit={onSubmit}>
          <Form.Item label="Organizations">
            {getFieldDecorator("organization_id", {
              rules: [{ required: true }]
            })(<Organizations />)}
          </Form.Item>
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [{ required: true }]
            })(
              <Input
                type="text"
                placeholder="Name"
                style={{
                  width: "100%"
                }}
              />
            )}
          </Form.Item>
          <Form.Item label="Sequence">
            {getFieldDecorator("is_sequential", {
              rules: [{ required: true }]
            })(
              <Select placeholder="Select Sequential">
                <Option value={1}>true</Option>
                <Option value={0}>false</Option>
              </Select>
            )}
          </Form.Item>
          <MButton>Submit</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(Create);
