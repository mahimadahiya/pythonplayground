import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Select,
  Divider,
  Popconfirm,
  message,
  Modal,
  Icon,
  Tooltip,
  Spin
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  wyrSeasonList,
  wyrSeasonStatusUpdate,
  wyrSeasonDelete,
  wyrSeriesList
} from "../../../../actions";
import Create from "./Create";
import Edit from "./Edit";

const SeasonIndex = () => {
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);
  const [loadAgain, setLoadAgain] = useState(false);
  const [seasonList, setSeasonList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [selectedSeriesId, setSelectedSeriesId] = useState(null);
  const [isCreateNewDisable, setIsCreateNewDisable] = useState(true);
  //create
  const [createNewModalShow, setCreateNewModalShow] = useState(false);
  const [selectedSeriesName, setSelectedSeriesName] = useState("");
  //edit
  const [updateSeasonDetails, setUpdateSeasonDetails] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);

  useEffect(() => {
    const callData = async () => {
      setLoading(true);
      try {
        const response = await wyrSeasonList(
          user.Authorization,
          selectedSeriesId
        );
        setSeasonList(response.data.result.wyr_season_list);

        const seriesResponse = await wyrSeriesList(user.Authorization);
        setSeriesList(seriesResponse.data.result.wyr_series_list);
      } catch (error) {}
      setLoading(false);
    };
    callData();
  }, [loadAgain]);

  //TABLE COLUMNS STARTS
  const columnName = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      title: "Season",
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
          <Divider type="vertical" />
          <Button
            type="primary"
            // onClick={() => onGoToEpisodePage(record)}
            style={{ marginRight: "10px" }}
          >
            Episodes
          </Button>
        </span>
      )
    }
  ];
  //TABLE COLUMNS ENDS

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

  const renderSeries = () => {
    return seriesList.map((series, i) => {
      return (
        <Select.Option key={i} value={series.id}>
          {series.name}
        </Select.Option>
      );
    });
  };

  const onChangeSeries = val => {
    setSelectedSeriesId(val);
    setIsCreateNewDisable(false);
    const tempSeries = seriesList.find(item => {
      if (item.id === val) {
        return item;
      }
    });
    setSelectedSeriesName(tempSeries.name);

    setLoadAgain(!loadAgain);
  };

  const createNew = () => {
    setCreateNewModalShow(true);
  };

  const closeCreateNewSeasonModal = () => {
    setCreateNewModalShow(false);
  };

  const onEdit = data => {
    // console.log(data);
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
        title={<span style={{ fontSize: "20px" }}>Seasons</span>}
      >
        <div style={{ textAlign: "right", marginBottom: "40px" }}>
          <Spin spinning={loading}>
            <span>
              <Select
                placeholder="Select Series"
                mode="default"
                style={{ width: "200px", marginRight: "15px" }}
                onChange={onChangeSeries}
              >
                {renderSeries()}
              </Select>
            </span>
            <span>
              <Tooltip
                title={
                  isCreateNewDisable === true
                    ? "Select Series to Create New Season"
                    : null
                }
              >
                <Button
                  type="primary"
                  onClick={() => createNew()}
                  disabled={isCreateNewDisable}
                >
                  Create New season <Icon type="plus-circle" />
                </Button>
              </Tooltip>
            </span>
          </Spin>
        </div>
        <div>
          <Table
            loading={loading}
            dataSource={seasonList}
            columns={columnName}
            rowKey={row => row.id}
            pagination={false}
          />
        </div>
      </Card>

      {/* create new modal starts */}
      {createNewModalShow === true ? (
        <Modal
          style={{ minWidth: "600px" }}
          title="Create New Season"
          closable={true}
          footer={null}
          onCancel={closeCreateNewSeasonModal}
          visible={createNewModalShow}
          destroyOnClose={true}
        >
          <Create
            setCreateNewModalShow={setCreateNewModalShow}
            setLoadAgain={setLoadAgain}
            loadAgain={loadAgain}
            seriesId={selectedSeriesId}
            seriesName={selectedSeriesName}
          />
        </Modal>
      ) : null}
      {/* create new modal end  */}
      {/* Update modal starts  */}
      {editModalShow === true ? (
        <Modal
          style={{ minWidth: "600px" }}
          title="Edit Season"
          closable={true}
          footer={null}
          onCancel={closeEditSeasonModal}
          visible={editModalShow}
          destroyOnClose={true}
        >
          <Edit
            setEditModalShow={setEditModalShow}
            seasonDetails={updateSeasonDetails}
            loadAgain={loadAgain}
            setLoadAgain={setLoadAgain}
          />
        </Modal>
      ) : null}
      {/* Update modal starts  */}
    </div>
  );
};

export default SeasonIndex;
