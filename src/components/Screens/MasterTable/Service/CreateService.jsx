import React, { useState } from "react";
import { Form, message, Input, Button, Icon, Upload, Select } from "antd";
import MButton from "../../../Elements/MButton";
import { createService } from "../../../../actions";
import { useSelector } from "react-redux";

const CreateModule = props => {
  const user = useSelector(state => state.userAuth);
  const [icon, setIcon] = useState(null);
  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        await createService(user.Authorization, {
          ...formValues,
          icon,
          flag: 1
        });
        message.success("Service created successfully");
      }
    });
  };

  const uploadProps = {
    name: "file",
    data: { folder_name: "extras/" },

    action: "https://pylearning-api.iaugmentor.com/file_upload/",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMtYXBpLmlhdWdtZW50b3IuY29tL3YxL2F1dGgvc2lnbmluIiwianRpIjoiNmM2OWU2Nzk0NzFmM2RjNmE2OTA1MTc1ZTNlYmU4NTQiLCJleHAiOjE1OTE2OTQzOTEsImlhdCI6MTU2MDEzODU5MSwibmJmIjoxNTYwMTM4NTkxfQ.L1vLFQIhdtW0U1wMlOAkNrjDUOL7zE0Glc2ogRbXhBY",
      key: "TcS99L07QkDezB5n4Qdw"
    },
    accept: ".png,.jpg"
  };

  const onUploadIcon = info => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setIcon(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Item label="Service Name">
          {getFieldDecorator("name", { rules: [{ required: true }] })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Slug">
          {getFieldDecorator("slug", { rules: [{ required: true }] })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Type">
          {getFieldDecorator("type", { rules: [{ required: true }] })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator("description", { rules: [{ required: true }] })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Icon">
          <Upload {...uploadProps} onChange={onUploadIcon}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Visibility">
          {getFieldDecorator("visibility", { rules: [{ required: true }] })(
            <Select>
              <Select.Option key="public">Public</Select.Option>
              <Select.Option key="private">Private</Select.Option>
            </Select>
          )}
        </Form.Item>
        <MButton>Create Service</MButton>
      </Form>
    </div>
  );
};

export default Form.create()(CreateModule);
