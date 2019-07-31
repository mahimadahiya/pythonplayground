import React, { useEffect, useState } from "react";
import { Form, Input, message, Card } from "antd";
import { useSelector } from "react-redux";
import MButton from "../../../Elements/MButton";
import Parameters from "../../../Elements/Parameters";
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
  const [name, setName] = useState(null);
  const [parameterId, setParameterId] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchTagDetails(user.Authorization, props.id);
      setName(details.result.tag.name);
      setParameterId(
        details.result.parameters[0]
          ? details.result.parameters[0].parameter_id
          : null
      );
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
          flag: 1
        };
        clean(values);
        if (!props.id) {
          const response = await createTag(user.Authorization, {
            fields: JSON.stringify(values),
            parameter_id: parameterId
          });
          if (response.status === 201) {
            message.success("Tag created successfully");
          }
        } else {
          const response = await editTag(user.Authorization, {
            fields: JSON.stringify(values),
            id: props.id,
            parameter_id: parameterId
          });
          if (response.status === 200) {
            message.success("Tag updated successfully");
          }
        }
      }
    });
  };

  const onChangeParameter = value => {
    setParameterId(value);
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Card>
        <Form onSubmit={onSubmit}>
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Name is required" }],
              initialValue: name
            })(<Input placeholder="Enter name of Tag" />)}
          </Form.Item>
          <Parameters
            onChange={onChangeParameter}
            categories={[null]}
            value={parameterId}
          />
          <MButton>{props.id ? "Edit" : "Create"}</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(TagCreate);
