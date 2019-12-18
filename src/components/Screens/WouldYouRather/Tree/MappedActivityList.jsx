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
import MappedActivityDetails from "./MappedActivityDetails";

const MappedActivityList = props => {
  const [mappedActivityLoading, setMappedActivityLoading] = useState(false);
  const [mappedList, setMappedList] = useState([]);
  const [liDetailsModalShow, setLiDetailsModalShow] = useState(false);

  const [selectedActivityDetails, setSelectedActivityDetails] = useState([]);
  // console.log(props.selectedEpisodeDetails.mapped_activity);

  useEffect(() => {
    setMappedActivityLoading(true);
    setMappedList(props.selectedEpisodeDetails.mapped_activity);
    setMappedActivityLoading(false);
  }, [props.selectedEpisodeDetails.mapped_activity]);

  const onDetailsClick = data => {
    console.log(data);
    setSelectedActivityDetails(data);
    setLiDetailsModalShow(true);
  };

  const closeLiDetailsModal = () => {
    setLiDetailsModalShow(false);
  };

  const columnName = [
    {
      title: "Parameter Name",
      dataIndex: "parameter__name",
      key: "parameter__name",
      render: record => {
        return (
          <div>
            {record === null || record === "" || record === undefined
              ? "-"
              : record}
          </div>
        );
      }
    },
    {
      title: "Activity Name",
      dataIndex: "activity__name",
      key: "activity__name",
      render: record => {
        return (
          <div>
            {record === null || record === "" || record === undefined
              ? "-"
              : record}
          </div>
        );
      }
    },

    {
      title: "Actions",
      key: "action",
      render: record => (
        <span>
          <Button
            type="link"
            onClick={() => onDetailsClick(record)}
            style={{ padding: 0, marginRight: "10px" }}
          >
            Details
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            //onClick={() => onEdit(record)}
            style={{ padding: 0, marginRight: "10px" }}
          >
            Update
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure you want to delete ?"
            okText="Yes"
            cancelText="No"
            // onConfirm={() => onDelete(record)}
          >
            <Button
              type="link"
              style={{ color: "red", padding: 0, marginRight: "10px" }}
            >
              Delete
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ];

  return (
    <div>
      <Card
        bodyStyle={{ padding: 0, fontSize: "15px" }}
        loading={mappedActivityLoading}
        bordered={false}
      >
        <Table
          loading={mappedActivityLoading}
          dataSource={mappedList}
          columns={columnName}
          rowKey={row => row.id}
          pagination={false}
        />
      </Card>

      <Modal
        style={{ minWidth: "600px" }}
        title="Li Details"
        closable={true}
        footer={null}
        onCancel={closeLiDetailsModal}
        visible={liDetailsModalShow}
        destroyOnClose={true}
      >
        <MappedActivityDetails
          selectedActivityDetails={selectedActivityDetails}
        />
      </Modal>
    </div>
  );
};

export default MappedActivityList;
