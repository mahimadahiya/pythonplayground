import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Form, Input, message } from "antd";
import MButton from "../../../Elements/MButton";
import {
  createJargon,
  fetchJargonDetails,
  editJargon
} from "../../../../actions";

const CreateJargon = props => {
  const user = useSelector(state => state.userAuth);
  const [jargon, setJargon] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const data = await fetchJargonDetails(user.Authorization, props.id);
      const jargon = data.result.jargon_details;
      setJargon(jargon);
      setLoading(false);
    };

    if (props.id) {
      fetchDetails();
    }
  }, [user.Authorization, props.id]);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formProps) => {
      if (!err) {
        try {
          if (!props.id) {
            await createJargon(user.Authorization, formProps);
            message.success("Created successfully");
          } else {
            await editJargon(user.Authorization, props.id, formProps);
            message.success("Updated successfully");
          }
          props.onCloseModal();
        } catch (err) {
          message.error("Internal server error");
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Card loading={loading}>
        <Form onSubmit={onSubmit}>
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [{ required: true }],
              initialValue: jargon.name
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator("description", {
              rules: [{ required: true }],
              initialValue: jargon.description
            })(<Input />)}
          </Form.Item>
          <MButton>{props.id ? "Edit" : "Create"}</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(CreateJargon);
