import React from "react";
import { Input, Form, Select, Card } from "antd";

const renderInput = fields => {
  return fields.map(field => {
    if (field.type === "input") {
      return (
        <Form.Item key={field.key} label={field.label}>
          <Input
            size="large"
            onChange={field.onChange}
            placeholder={field.placeholder}
          />
        </Form.Item>
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
        <Form.Item key={field.key} label={field.label}>
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
      );
    } else {
      return null;
    }
  });
};

const Filters = props => {
  return (
    <Card type="inner">
      {renderInput(props.fields)}
      <Form layout="inline">{renderSelect(props.fields)}</Form>
      {/* <Filters
        component="input"
        placeholder="Search by ID or Text"
        onChange={this.onSearch}
      />
      <Form layout="inline">
        <Filters
          component="select"
          placeholder="Filter by Entity Type"
          onChange={this.onEntityChange}
          labelInValue={true}
          options={[
            { value: null, label: "None" },
            { value: 1, label: "BM" },
            { value: 2, label: "FM" }
          ]}
        />
        <Filters
          component="select"
          placeholder="Filter by Status"
          onChange={this.onStatusChange}
          labelInValue={true}
          options={[
            { value: 1, label: "Live" },
            { value: 2, label: "Draft" }
          ]}
        />
      </Form> */}
    </Card>
  );

  // switch (props.component) {

  // }
};

export default Filters;
