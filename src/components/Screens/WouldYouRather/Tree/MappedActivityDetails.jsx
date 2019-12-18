import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Select,
  Divider,
  Popconfirm,
  message,
  Modal
} from "antd";
import { useSelector } from "react-redux";

const MappedActivityDetails = props => {
  const selectedActivityDetails = props.selectedActivityDetails;
  return (
    <div>
      <Card
        bodyStyle={{ padding: 0, fontSize: "15px" }}
        // loading={mappedActivityLoading}
        bordered={false}
      >
        Details
      </Card>
    </div>
  );
};

export default MappedActivityDetails;
