import React, { useState } from "react";
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
import {
  wyrSeriesList,
  wyrSeriesDelete,
  wyrSeriesStatusUpdate
} from "../../../../actions";

const SeriesIndex = () => {
  return (
    <div>
      <Card
        style={{ borderRadius: "5px" }}
        bodyStyle={{ borderRadius: "5px" }}
        title={<span style={{ fontSize: "20px" }}>SERIES</span>}
      >
        <h2>Series</h2>
      </Card>
    </div>
  );
};

export default SeriesIndex;
