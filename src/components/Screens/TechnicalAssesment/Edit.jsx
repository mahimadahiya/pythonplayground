import React, { useState } from "react";
import { Card, Input, message, Form } from "antd";
import { useSelector } from "react-redux";
import { editTechnicalAssesment } from "../../../actions";
import MButton from "../../Elements/MButton";

const Edit = props => {
  const user = useSelector(state => state.userAuth);

  const { getFieldDecorator } = props.form;
  const details = props.selectedDetails;
  console.log(details);
  const [name, setName] = useState("");

  const onEditNameChange = e => {
    setName(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          name: formValues.name
        };
        const response = await editTechnicalAssesment(
          details.id,
          user.Authorization,
          values
        );
        if (response.status === 200) {
          message.success("Assesment group edited successfully");
          props.setEditModalShow(false);
          props.setLoadAgain(!props.loadAgain);
        }
      }
    });
  };

  return (
    <div>
      <Card>
        <Form onSubmit={onSubmit}>
          <Form.Item label="Organizations">
            {getFieldDecorator("organization_id", {
              rules: [{ required: true }],
              initialValue: details.organization_name
            })(
              <Input
                disabled
                type="text"
                placeholder="Name"
                style={{
                  width: "100%"
                }}
              />
            )}
          </Form.Item>
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [{ required: true }],
              initialValue: details.name
            })(
              <Input
                type="text"
                placeholder="Name"
                style={{
                  width: "100%"
                }}
                onChange={onEditNameChange}
              />
            )}
          </Form.Item>
          <Form.Item label="Sequence">
            {getFieldDecorator("is_sequential", {
              rules: [{ required: true }],
              initialValue: details.is_sequential === 0 ? "flase" : "true"
            })(
              <Input
                disabled
                type="text"
                placeholder="Name"
                style={{
                  width: "100%"
                }}
              />
            )}
          </Form.Item>
          <MButton>Submit</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(Edit);
