import React from "react";
import { Input, Form, Select, Card, Row, Col } from "antd";

const renderInput = fields => {
  return fields.map(field => {
    if (field.type === "input") {
      return (
        <Col span={12} style={{ padding: "0 24px" }} key={field.key}>
          <Form.Item label={field.label}>
            <Input
              size="large"
              onChange={field.onChange}
              placeholder={field.placeholder}
            />
          </Form.Item>
        </Col>
      );
    } else {
      return null;
    }
  });
};

const renderSelect = fields => {
  return fields.map(field => {
    if (field.type === "select") {
      return (
        <Col span={12} style={{ padding: "0 24px" }} key={field.key}>
          <Form.Item label={field.label}>
            <Select
              size="large"
              labelInValue={field.labelInValue}
              onChange={field.onChange}
              placeholder={field.placeholder}
              style={{ minWidth: 300 }}
            >
              {field.options.map(option => {
                return (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      );
    } else {
      return null;
    }
  });
};

const Filters = props => {
  return (
    <Card>
      <Row>
        <Form>{renderInput(props.fields)}</Form>
        <Form>{renderSelect(props.fields)}</Form>
      </Row>
    </Card>
  );

  // switch (props.component) {

  // }
};

export default Filters;
