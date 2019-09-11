import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Form, Input, message, Icon, Select, Row, Col } from "antd";
import MButton from "../../../Elements/MButton";
import { createKeyword } from "../../../../actions";

const CreateKeyword = props => {
  const user = useSelector(state => state.userAuth);
  const [file, setFile] = useState(null);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formProps) => {
      if (!err) {
        try {
          await createKeyword(user.Authorization, file, formProps);
          message.success("Created successfully");
          props.onCloseModal();
        } catch (err) {
          message.error("Internal server error");
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
          <Row gutter={48}>
            <Col span={5}>
              <Form.Item label="Media type">
                {/* {getFieldDecorator("media_type", {
                  rules: [{ required: true }]
                })( */}
                  <Select defaultValue="image">
                    <Select.Option key="image">Image</Select.Option>
                    <Select.Option key="audio">Audio</Select.Option>
                  </Select>
                {/* )} */}
              </Form.Item>
            </Col>
            <Col span={14}>
              <div style={{ marginTop: 50, marginBottom: 15 }}>
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
            </Col>
          </Row>

          <MButton>{props.id ? "Edit" : "Create"}</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(CreateKeyword);
