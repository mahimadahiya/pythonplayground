import React, { useState } from "react";
import { Form, message, Input, Button, Icon, Upload } from "antd";
import MButton from "../../Elements/MButton";
import { createModule } from "../../../actions";
import { useSelector } from "react-redux";
import ContentComplexityLevel from "../../Elements/ContentComplexityLevel";

const CreateModule = props => {
  const user = useSelector(state => state.userAuth);
  const [image, setImage] = useState(null);
  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
      if(image === null || image === "" || image === undefined || image === " "){
      message.warning("Icon is required for creating module")
      return;
      }
        let values = {
          ...formValues,
          icon2_url: image
        };
        let NewFormValues = {
          fields: JSON.stringify(values)
        };
        await createModule(
          user.Authorization,
          // ...formValues,
          // image_url: image,
          // filter: "{}",
          // flag: 1
          NewFormValues
        );
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
      setImage(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Item label="Module Name">
          {getFieldDecorator("name", { rules: [{ required: true }] })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Slug">
          {getFieldDecorator("slug", { rules: [{ required: true }] })(
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
        <Form.Item label="Content Complexity level">
          {getFieldDecorator("content_complexity_id", {
            rules: [{ required: true }]
          })(<ContentComplexityLevel />)}
        </Form.Item>
        <MButton>Create Module</MButton>
      </Form>
    </div>
  );
};

export default Form.create()(CreateModule);
