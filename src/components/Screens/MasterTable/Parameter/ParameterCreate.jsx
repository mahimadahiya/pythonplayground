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
import { fetchCategoryDetails, createCategory } from "../../../../actions";
import {
  editCategory,
  createParameter,
  editParameter
} from "../../../../actions/masterActions";

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

const CategoryCreate = props => {
  const user = useSelector(state => state.userAuth);
  const [iconUrl, setIconUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [sameImage, setSameImage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      console.log("herer");
      setLoading(true);
      const details = await fetchCategoryDetails(user.Authorization, props.id);
      console.log(props.form.getFieldValue("name"));

      props.form.setFieldsValue({
        name: details.result.Category.name,
        description: details.result.Category.description
      });
      setIconUrl(details.result.Category.icon_url);
    };
    setLoading(false);

    if (props.id) {
      fetchDetails();
    }
  }, [fetchCategoryDetails, props.id]);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          name: formValues.name,
          description: formValues.description,
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
            })(<Input placeholder="Enter name of category" />)}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator("description")(
              <Input placeholder="Enter description of category" />
            )}
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
            <Upload
              {...uploadProps}
              onChange={onUploadImage}
              disabled={sameImage}
            >
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
              {imageUrl ? <a href={imageUrl}>View image</a> : null}
            </Upload>
            <div>
              <Checkbox onChange={onImageChecked}>Same as icon</Checkbox>
            </div>
          </Form.Item>
          <MButton>{props.id ? "Edit" : "Create"}</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(CategoryCreate);
