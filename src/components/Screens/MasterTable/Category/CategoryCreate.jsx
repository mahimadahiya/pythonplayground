import React, { useState, useEffect } from "react";
import { Form, Input, message, Card, Upload, Button, Icon } from "antd";
import { useSelector } from "react-redux";
import MButton from "../../../Elements/MButton";
import { fetchCategoryDetails, createCategory } from "../../../../actions";
import { editCategory } from "../../../../actions/masterActions";

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
  const [details, setDetails] = useState(null);
  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchCategoryDetails(user.Authorization, props.id);
      setDetails(details.result.Category);
      setIconUrl(details.result.Category.icon_url);
    };

    if (props.id) {
      fetchDetails();
    }
  }, [user, props.id]);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          name: formValues.name,
          description: formValues.description,
          icon_url: iconUrl,
          flag: 1
        };
        clean(values);
        if (!props.id) {
          const response = await createCategory(user.Authorization, {
            fields: JSON.stringify(values)
          });
          if (response.status === 201) {
            message.success("Category created successfully");
          }
        } else {
          const response = await editCategory(user.Authorization, {
            fields: JSON.stringify(values),
            id: props.id
          });
          if (response.status === 200) {
            message.success("Category updated successfully");
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

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Card>
        <Form onSubmit={onSubmit}>
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Name is required" }],
              initialValue: details ? details.name : null
            })(<Input placeholder="Enter name of category" />)}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator("description", {
              initialValue: details ? details.description : null
            })(<Input placeholder="Enter description of category" />)}
          </Form.Item>
          <Form.Item label="Icon">
            <Upload {...uploadProps} onChange={onUploadIcon}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
              {iconUrl ? <a href={iconUrl}>View image</a> : null}
            </Upload>
          </Form.Item>
          <MButton>{props.id ? "Edit" : "Create"}</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(CategoryCreate);
