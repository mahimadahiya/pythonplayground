import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%"
      }}
    >
      <Spin tip="Loading..." size="large" />
    </div>
  );
};

export default Loading;
