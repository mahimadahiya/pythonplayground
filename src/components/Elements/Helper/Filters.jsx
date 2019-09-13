import React from "react";
import { Input, Form, Select, Col } from "antd";

const renderInput = field => {
  return (
    <Col span={8} style={{ padding: "0 24px" }} key={field.key}>
      <Form.Item label={field.label}>
        <Input onChange={field.onChange} placeholder={field.placeholder} />
      </Form.Item>
    </Col>
  );
};

const renderSelect = field => {
  return (
    <Col span={8} style={{ padding: "0 24px" }} key={field.key}>
      <Form.Item label={field.label}>
        <Select
          labelInValue={field.labelInValue}
          onChange={field.onChange}
          placeholder={field.placeholder}
          // style={{ minWidth: 300 }}
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
};

const renderFields = fields => {
  return fields.map(field => {
    switch (field.type) {
      case "input":
        return renderInput(field);
      case "select":
        return renderSelect(field);
      default:
        return null;
    }
  });
};

const Filters = props => {
  return (
    <>
      <Form>{renderFields(props.fields)}</Form>
    </>
  );

  // switch (props.component) {

  // }
};

export default Filters;
