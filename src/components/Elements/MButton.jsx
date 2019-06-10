import React from "react";
import { Button } from "antd";

const MButton = props => {
  return (
    <Button htmlType="submit" size="large" shape="round" type="primary">
      {props.children}
    </Button>
  );
};

export default MButton;
