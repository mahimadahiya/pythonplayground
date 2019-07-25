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
import { fetchTagDetails, createTag, editTag } from "../../../../actions";

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

const TagCreate = props => {
  const user = useSelector(state => state.userAuth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const details = await fetchTagDetails(user.Authorization, props.id);

      props.form.setFieldsValue({
        name: details.result.tag.name
      });
    };
    setLoading(false);

    if (props.id) {
      fetchDetails();
    }
  }, [fetchTagDetails, props.id]);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          name: formValues.name,
          flag: 1
        };
        clean(values);
        if (!props.id) {
          const response = await createTag(user.Authorization, {
            fields: JSON.stringify(values)
          });
          if (response.status === 201) {
            message.success("Tag created successfully");
          }
        } else {
          const response = await editTag(user.Authorization, {
            fields: JSON.stringify(values),
            id: props.id
          });
          if (response.status === 200) {
            message.success("Tag updated successfully");
          }
        }
      }
    });
  };

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
          <MButton>{props.id ? "Edit" : "Create"}</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(TagCreate);
