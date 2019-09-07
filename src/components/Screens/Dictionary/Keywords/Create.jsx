import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Form, Input, message, Icon } from "antd";
import MButton from "../../../Elements/MButton";
import { createKeyword } from "../../../../actions";

const CreateKeyword = props => {
  const user = useSelector(state => state.userAuth);
  const [file, setFile] = useState(null);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formProps) => {
      if (!err) {
        if (!file) {
          message.error("No file selected");
        } else {
          try {
            await createKeyword(user.Authorization, file, {
              ...formProps,
              media_type: "image"
            });

            message.success("Created successfully");
            props.onCloseModal();
          } catch (err) {
            message.error("Internal server error");
          }
        }
      }
    });
  };

  const filechangeHandler = e => {
    setFile(e.target.files[0]);
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
          <div style={{ marginBottom: 15 }}>
            <label>
              <Input
                type="file"
                style={{ display: "none" }}
                onChange={filechangeHandler}
              />
              <span
                style={{
                  background: "#1890ff",
                  color: "#fff",
                  fontWeight: 400,
                  cursor: "pointer",
                  fontSize: "14px",
                  padding: "4px 8px",
                  borderRadius: "4px"
                }}
              >
                <Icon type="upload" style={{ paddingRight: "5px" }} />
                Upload Media
              </span>
            </label>
          </div>
          <MButton>{props.id ? "Edit" : "Create"}</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(CreateKeyword);
