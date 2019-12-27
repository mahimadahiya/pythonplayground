import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Select,
  Divider,
  Popconfirm,
  message,
  Icon,
  Modal
} from "antd";
import { useSelector } from "react-redux";
import {
  wyrSeasonsList,
  wyrSeasonDelete,
  wyrSeasonStatusUpdate
} from "../../../../actions";
import SeasonCreate from "./SeasonCreate";
import SeasonUpdate from "./SeasonUpdate";

const SeasonIndex = props => {
  const seriesId = props.selectedSeriesDetailsForSeason.id;
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);
  const [loadAgain, setLoadAgain] = useState(false);
  const [list, setList] = useState([]);
  const [createNewModalShow, setCreateNewModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [updateSeasonDetails, setUpdateSeasonDetails] = useState([]);

  useEffect(() => {
    setLoading(true);
    const callDataApi = async () => {
      try {
        const response = await wyrSeasonsList(user.Authorization, seriesId);
        // console.log(response.data.result);
        setList(response.data.result.wyr_season_list);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    callDataApi();
  }, [user.Authorization, seriesId, loadAgain]);

  const columnName = [
    {
      title: "ID",
      // dataIndex: "id",
      key: "id",
      render: record => {
        return (
          <div>
            {record === null || record === "" || record === undefined ? (
              "-"
            ) : (
              <Button
                type="link"
                // onClick={() => onGoToSeasonPage(record)}
              >
                {record.id}
              </Button>
            )}
          </div>
        );
      }
    },
    {
      title: "Series",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        // return <div>{record === 1 ? "Draft" : "Live"}</div>;
        return (
          <div>
            {text === 1 ? (
              <Button.Group>
                <Button
                  style={{
                    color: "#fff",
                    background: "red",
                    border: "1px solid red"
                  }}
                >
                  Draft
                </Button>
                <Popconfirm
                  title="Are you sure you want to change status to Live ?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => changeCurrentActionStatus(record)}
                >
                  <Button
                    style={{
                      color: "green",
                      background: "#fff",
                      border: "1px solid green"
                    }}
                  >
                    Live
                  </Button>
                </Popconfirm>
              </Button.Group>
            ) : (
              <Button.Group>
                <Popconfirm
                  title="Are you sure you want to change status to Draft ?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => changeCurrentActionStatus(record)}
                >
                  <Button
                    style={{
                      color: "red",
                      background: "#fff",
                      border: "1px solid red"
                    }}
                  >
                    Draft
                  </Button>
                </Popconfirm>
                <Button
                  style={{
                    color: "#fff",
                    background: "green",
                    border: "1px solid green"
                  }}
                >
                  Live
                </Button>
              </Button.Group>
            )}
          </div>
        );
      }
    },
    {
      title: "Actions",
      key: "action",
      render: record => (
        <span>
          <span>
            <Button
              type="link"
              //onClick={() => onMappingParameters(record)}
              style={{ padding: 0, marginRight: "10px" }}
            >
              Map Parameters
            </Button>
            <Divider type="vertical" />
          </span>

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

  const goBackToSeriesScreen = () => {
    props.setScreenType("seriesScreen");
  };

  const createNew = () => {
    setCreateNewModalShow(true);
  };

  const closeCreateNewSeasonModal = () => {
    setCreateNewModalShow(false);
  };

  const changeCurrentActionStatus = async data => {
    let actionId = data.id;
    setLoading(true);
    try {
      await wyrSeasonStatusUpdate(user.Authorization, actionId);
      message.success("Status Updated");
      setLoading(false);
      setLoadAgain(!loadAgain);
    } catch (error) {
      message.warning("Internal Server Error!!");
      setLoading(false);
    }
  };

  const onDelete = async item => {
    try {
      let selectedId = item.id;
      setLoading(true);
      await wyrSeasonDelete(user.Authorization, selectedId);
      message.success("Season Deleted");
      setLoading(false);
      setLoadAgain(!loadAgain);
    } catch (error) {
      setLoading(false);
    }
  };

  const onEdit = data => {
    console.log(data);
    setUpdateSeasonDetails(data);
    setEditModalShow(true);
  };

  const closeEditSeasonModal = () => {
    setEditModalShow(false);
  };

  return (
    <div>
      <Card
        style={{ borderRadius: "5px" }}
        bodyStyle={{ borderRadius: "5px" }}
        title={
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <span style={{ fontSize: "20px" }}>SEASONS</span>
            </div>
            <div style={{ width: "50%", textAlign: "right" }}>
              <Button
                style={{ fontWeight: 900 }}
                onClick={goBackToSeriesScreen}
              >
                <Icon type="arrow-left" /> Back
              </Button>
            </div>
          </div>
        }
      >
        <div style={{ textAlign: "right", marginBottom: "40px" }}>
          <Button type="primary" onClick={() => createNew()}>
            Create New season
          </Button>
        </div>
        <div>
          <Table
            loading={loading}
            dataSource={list}
            columns={columnName}
            rowKey={row => row.id}
            pagination={false}
          />
        </div>
      </Card>

      {/* create new modal starts */}
      <Modal
        style={{ minWidth: "600px" }}
        title="Create New Season"
        closable={true}
        footer={null}
        onCancel={closeCreateNewSeasonModal}
        visible={createNewModalShow}
        destroyOnClose={true}
      >
        <SeasonCreate
          setCreateNewModalShow={setCreateNewModalShow}
          setLoadAgain={setLoadAgain}
          loadAgain={loadAgain}
          seriesId={seriesId}
        />
      </Modal>
      {/* create new modal end  */}

      <Modal
        style={{ minWidth: "600px" }}
        title="Edit Season"
        closable={true}
        footer={null}
        onCancel={closeEditSeasonModal}
        visible={editModalShow}
        destroyOnClose={true}
      >
        <SeasonUpdate
          setEditModalShow={setEditModalShow}
          seasonDetails={updateSeasonDetails}
          loadAgain={loadAgain}
          setLoadAgain={setLoadAgain}
        />
      </Modal>
    </div>
  );
};

export default SeasonIndex;
