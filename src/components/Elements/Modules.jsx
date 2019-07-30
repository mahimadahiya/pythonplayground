import React from "react";
import { Select } from "antd";

const Modules = props => {
  return <Select placeholder="Select module(s)" onChange={props.onChange} />;
};

export default Modules;
