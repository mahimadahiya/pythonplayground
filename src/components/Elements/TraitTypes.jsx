import React, { forwardRef } from "react";
import { Select } from "antd";

const TraitTypes = forwardRef((props, ref) => {
  return (
    <div>
      <Select
        placeholder="Select a type"
        value={props.value}
        style={props.style}
        allowClear
        onChange={props.onChange}
      >
        <Select.Option key="1" value={1}>
          Type 1
        </Select.Option>
        <Select.Option key="2" value={2}>
          Type 2
        </Select.Option>
      </Select>
    </div>
  );
});

export default TraitTypes;
