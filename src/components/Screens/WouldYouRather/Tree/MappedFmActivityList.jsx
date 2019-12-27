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
import { wyrTreeActivityDelete } from "../../../../actions";
import UpdateMappedFmActivity from "./UpdateMappedFmActivity";
import MappedActivityDetails from "./MappedActivityDetails";

import { useSelector } from "react-redux";

const MappedFmActivityList = props => {
  // console.log(props.selectedTechnicalId);
  const user = useSelector(state => state.userAuth);
  const [mappedActivityLoading, setMappedActivityLoading] = useState(false);
  const [mappedList, setMappedList] = useState([]);
  const [liDetailsModalShow, setLiDetailsModalShow] = useState(false);
  const [
    mappedActivityUpdateModalShow,
    setMappedActivityUpdateModalShow
  ] = useState(false);
  const [
    selectedMappedActivityDetails,
    setSelectedMappedActivityDetails
  ] = useState([]);
  const [selectedActivityDetails, setSelectedActivityDetails] = useState([]);

  const [loadAgain, setLoadAgain] = useState(false);

  useEffect(() => {
    setMappedActivityLoading(true);
    setMappedList(props.selectedEpisodeDetails.mapped_fm_activity);
    setMappedActivityLoading(false);
  }, [loadAgain, props.loadAgain]);

  const columnName = [
    {
      title: "Chapter Name",
      dataIndex: "chapter__name",
      key: "chapter__name",
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
            onClick={() => onEdit(record)}
            style={{ padding: 0, marginRight: "10px" }}
          >
            Update
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure you want to delete ?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(record)}
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

  const onDelete = async item => {
    try {
      let selectedId = item.id;
      setMappedActivityLoading(true);
      await wyrTreeActivityDelete(user.Authorization, selectedId);
      message.success("Activity Deleted");
      setMappedActivityLoading(false);
      props.submitCreateNewActivity(props.selectedTechnicalId);
      props.setLoadAgain(!props.loadAgain);
      props.closeMapLIModal();
    } catch (error) {
      setMappedActivityLoading(false);
    }
  };

  const onEdit = data => {
    // console.log(data);
    setSelectedMappedActivityDetails(data);
    setMappedActivityUpdateModalShow(true);
  };

  const closeMappedActivityUpdateModal = () => {
    setMappedActivityUpdateModalShow(false);
    props.submitCreateNewActivity(props.selectedTechnicalId);
  };

  const closeLiDetailsModal = () => {
    setLiDetailsModalShow(false);
  };

  const onDetailsClick = data => {
    setSelectedActivityDetails(data);
    setLiDetailsModalShow(true);
  };

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
        title="Update Mapped Activity"
        closable={true}
        footer={null}
        onCancel={closeMappedActivityUpdateModal}
        visible={mappedActivityUpdateModalShow}
        destroyOnClose={true}
      >
        <UpdateMappedFmActivity
          selectedMappedActivityDetails={selectedMappedActivityDetails}
          setMappedActivityUpdateModalShow={setMappedActivityUpdateModalShow}
          setLoadAgain={setLoadAgain}
          selectedTechnicalId={props.selectedTechnicalId}
          loadAgain={loadAgain}
          closeMapLIModal={props.closeMapLIModal}
        />
      </Modal>

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

export default MappedFmActivityList;
