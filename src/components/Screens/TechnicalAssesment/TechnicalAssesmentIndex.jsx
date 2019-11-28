import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Button,
  Table,
  Modal,
  Input,
  Divider,
  Popconfirm,
  message
} from "antd";
import {
  getTechnicalAssesmentList,
  deleteTechnicalAssesment
} from "../../../actions";
import Create from "./Create";
import Edit from "./Edit";

const TechnicalAssesmentIndex = () => {
  const user = useSelector(state => state.userAuth);
  const AuthToken = user.Authorization;

  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadAgain, setLoadAgain] = useState(false);
  const [search, SetSearch] = useState("");
  const [selectedDetails, setSelectedDetails] = useState([]);

  const [createNewModalShow, setCreateNewModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const onDelete = async item => {
    try {
      let selectedId = item.id;
      // console.log(selectedId);
      setLoading(true);
      await deleteTechnicalAssesment(selectedId, user.Authorization);
      setLoadAgain(!loadAgain);
      message.success("Technical Assesment Deleted");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const callTechAssListApi = async () => {
      setLoading(true);
      try {
        const response = await getTechnicalAssesmentList(AuthToken, search);
        setListData(response.data.result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    callTechAssListApi();
  }, [AuthToken, loadAgain, search]);

  const createNew = () => {
    setCreateNewModalShow(true);
  };
  const closeCreateNewActionModal = () => {
    setCreateNewModalShow(false);
  };

  const onSearchInputChange = async e => {
    SetSearch(e.target.value);
  };

  const onEditTechAssesment = data => {
    // console.log(data);
    setSelectedDetails(data);
    setEditModalShow(true);
  };

  const closeEditModal = () => {
    setEditModalShow(false);
  };

  const columnName = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: id => {
        return (
          <div>
            {id === null || id === "" || id === undefined ? (
              "-"
            ) : (
              <a href={`/techAss/detail/${id}`}>{id}</a>
            )}
          </div>
        );
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      width: 360,
      render: record => (
        <span>
          <Button onClick={() => onEditTechAssesment(record)} type="link">
            Edit
          </Button>
          <Divider type="vertical" />
          <Popconfirm title="Delete" onConfirm={() => onDelete(record)}>
            <Button type="link">Delete</Button>
          </Popconfirm>
        </span>
      )
    }
  ];

  return (
    <div>
      <Card
        title={<div className="card-title">Technical Assesment List</div>}
        style={{ borderRadius: "5px" }}
        bodyStyle={{ borderRadius: "5px" }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: "45%" }}>
            <Input
              onChange={onSearchInputChange}
              placeholder="search by id and name"
            />
          </div>
          <div
            style={{ textAlign: "right", marginBottom: "40px", width: "50%" }}
          >
            <Button type="primary" onClick={() => createNew()}>
              Create New Assesment
            </Button>
          </div>
        </div>
        <div style={{ margin: "40px 0px", textAlign: "center" }}>
          <Table
            loading={loading}
            dataSource={listData}
            columns={columnName}
            rowKey={row => row.id}
            pagination={true}
          />
        </div>
      </Card>
      {/* create new modal starts */}
      <Modal
        style={{ minWidth: "600px" }}
        title="Create New Technical Assesment"
        closable={true}
        footer={null}
        onCancel={closeCreateNewActionModal}
        visible={createNewModalShow}
        destroyOnClose={true}
      >
        <Create
          // submitCreateNewTechnicalService={submitCreateNewTechnicalService}
          setCreateNewModalShow={setCreateNewModalShow}
          setLoadAgain={setLoadAgain}
          loadAgain={loadAgain}
        />
      </Modal>
      {/* create new modal ends */}
      {/* edit  modal starts */}
      <Modal
        style={{ minWidth: "600px" }}
        title="Edit Technical Assesment"
        closable={true}
        footer={null}
        onCancel={closeEditModal}
        visible={editModalShow}
        destroyOnClose={true}
      >
        <Edit
          selectedDetails={selectedDetails}
          setEditModalShow={setEditModalShow}
          loadAgain={loadAgain}
          setLoadAgain={setLoadAgain}
        />
      </Modal>

      {/* edit  modal ends */}
    </div>
  );
};

export default TechnicalAssesmentIndex;
