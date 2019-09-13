import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Form, Input, message, Row, Col, Select, Icon } from "antd";
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

  const [file, setFile] = useState(null);

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
            let values = {};
            if (formProps.hasOwnProperty("media_type") === true) {
              if (
                formProps.media_type === undefined ||
                formProps.media_type === null
              ) {
                values = {
                  name: formProps.name,
                  description: formProps.description
                };
              } else {
                if (file === null || file === undefined) {
                  message.warning("Please upload media file");
                  return;
                }
                values = {
                  name: formProps.name,
                  description: formProps.description,
                  media_type: formProps.media_type,
                  file: formProps.file
                };
              }
            }
            setLoading(true);
            await createJargon(user.Authorization, file, values);
            setLoading(false);
            message.success("Created successfully");
          } else {
            setLoading(true);
            await editJargon(user.Authorization, props.id, formProps);
            setLoading(false);
            message.success("Updated successfully");
          }
          props.onCloseModal();
        } catch (err) {
          setLoading(false);
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
          {props.id ? null : (
            <span>
              <Row gutter={48}>
                <Col span={5}>
                  <Form.Item label="Media type">
                    {getFieldDecorator("media_type")(
                      <Select placeholder="Select media type">
                        <Select.Option key="image">Image</Select.Option>
                        <Select.Option key="audio">Audio</Select.Option>
                        <Select.Option key="video">Video</Select.Option>
                        <Select.Option key="html">Html</Select.Option>
                        <Select.Option key="pdf">Pdf</Select.Option>
                      </Select>
                    )}
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
            </span>
          )}

          <MButton>{props.id ? "Edit" : "Create"}</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(CreateJargon);
