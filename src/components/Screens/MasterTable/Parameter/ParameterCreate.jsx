import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  message,
  Card,
  Upload,
  Button,
  Icon,
  Checkbox
} from "antd";
import { useSelector } from "react-redux";
import MButton from "../../../Elements/MButton";
import {
  createParameter,
  editParameter,
  fetchParameterDetails
  // fetchModuleList
} from "../../../../actions";

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

const CategoryCreate = props => {
  const user = useSelector(state => state.userAuth);
  const [modules, setModules] = useState([]);
  const [iconUrl, setIconUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [sameImage, setSameImage] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      // const modules = await fetchModuleList(user.Authorization);
      // setModules(modules);
      if (props.id) {
        const details = await fetchParameterDetails(
          user.Authorization,
          props.id
        );
        props.form.setFieldsValue({
          name: details.result.parameter.name,
          description: details.result.parameter.description
        });
        setIconUrl(details.result.parameter.icon_url);
        setImageUrl(details.result.parameter.image_url);
      }
    };

    if (props.id) {
      fetchDetails();
    }
  }, [fetchParameterDetails, props.id]);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          name: formValues.name,
          description: formValues.description,
          module_id: formValues.module_id,
          icon_url: iconUrl,
          image_url: imageUrl,
          flag: 1
        };
        clean(values);
        if (!props.id) {
          const response = await createParameter(user.Authorization, {
            fields: JSON.stringify(values)
          });
          if (response.status === 201) {
            message.success("Parameter created successfully");
          }
        } else {
          const response = await editParameter(user.Authorization, {
            fields: JSON.stringify(values),
            id: props.id
          });
          if (response.status === 200) {
            message.success("Parameter updated successfully");
          }
        }
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
    }
  };

  const onUploadIcon = info => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setIconUrl(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onUploadImage = info => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImageUrl(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onImageChecked = e => {
    setSameImage(e.target.checked);
  };

  if (sameImage && iconUrl && !imageUrl) {
    setImageUrl(iconUrl);
  }

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Card>
        <Form onSubmit={onSubmit}>
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Name is required" }]
            })(<Input placeholder="Enter name of parameter" />)}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator("description")(
              <Input placeholder="Enter description of parameter" />
            )}
          </Form.Item>
          <Form.Item label="Module ID">
            {getFieldDecorator("module_id", {
              rules: [{ required: true, message: "Module ID is required" }]
            })(<Input placeholder="Enter module id" />)}
          </Form.Item>
          <Form.Item label="Icon">
            <Upload {...uploadProps} onChange={onUploadIcon}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
              {iconUrl ? <a href={iconUrl}>View image</a> : null}
            </Upload>
          </Form.Item>
          <Form.Item label="Image">
            <span style={{ marginRight: 15 }}>
              <Checkbox onChange={onImageChecked}>Same as icon</Checkbox>
            </span>
            <Upload
              {...uploadProps}
              onChange={onUploadImage}
              disabled={sameImage}
            >
              <Button style={{ marginRight: 15 }}>
                <Icon type="upload" /> Click to Upload
              </Button>
              {imageUrl ? <a href={imageUrl}>View image</a> : null}
            </Upload>
          </Form.Item>
          <MButton>{props.id ? "Edit" : "Create"}</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(CategoryCreate);
