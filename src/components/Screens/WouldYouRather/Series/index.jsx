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
import Create from "./Create";
import Edit from "./Edit";
import SeriesParameterMap from "./MapParameters";
import SeasonIndex from "./SeasonIndex";

const WyrSeriesIndex = props => {
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);
  const [selectedTechnicalId, setSelectedTechnicalId] = useState(null);
  const [list, setList] = useState([]);
  const [paramActionId, setParamActionId] = useState(null);
  const [updateSeriesDetails, setUpdateSeriesDetails] = useState([]);

  const [createNewModalShow, setCreateNewModalShow] = useState(false);
  const [showMapParametersModal, setShowMapParametersModal] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const [screenType, setScreenType] = useState("seriesScreen");
  const [
    selectedSeriesDetailsForSeason,
    setSelectedSeriesDetailsForSeason
  ] = useState([]);

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
              <Button type="link" onClick={() => onGoToSeasonPage(record)}>
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
          {selectedTechnicalId === 1 ? (
            <span>
              <Button
                type="link"
                onClick={() => onMappingParameters(record)}
                style={{ padding: 0, marginRight: "10px" }}
              >
                Map Parameters
              </Button>
              <Divider type="vertical" />
            </span>
          ) : (
            <span>
              <Button
                type="link"
                // onClick={() => onMappingCourses(record)}
                style={{ padding: 0, marginRight: "10px" }}
              >
                Map Courses
              </Button>
              <Divider type="vertical" />
            </span>
          )}

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

  const onGoToSeasonPage = data => {
    // console.log(data);
    setSelectedSeriesDetailsForSeason(data);
    setScreenType("seasonScreen");
  };

  const onChangeFetchList = async value => {
    if (value === undefined || value === null) {
      setSelectedTechnicalId(null);
    } else {
      try {
        setLoading(true);
        setSelectedTechnicalId(value);
        const response = await wyrSeriesList(user.Authorization, value);
        if (response.data.result.wyr_series_list.length > 0) {
          setList(response.data.result.wyr_series_list);
        } else {
          setList([]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const submitCreateNewSeries = techincalService => {
    if (techincalService === null || techincalService === undefined) {
      setSelectedTechnicalId(null);
    } else {
      setSelectedTechnicalId(techincalService);
      onChangeFetchList(techincalService);
    }
  };

  const createNew = () => {
    setCreateNewModalShow(true);
  };

  const closeCreateNewSeriesModal = () => {
    setCreateNewModalShow(false);
  };

  const onDelete = async item => {
    try {
      let selectedId = item.id;
      setLoading(true);
      await wyrSeriesDelete(user.Authorization, selectedId);
      message.success("Series Deleted");
      setLoading(false);
      onChangeFetchList(selectedTechnicalId);
    } catch (error) {
      setLoading(false);
    }
  };

  const changeCurrentActionStatus = async data => {
    let actionId = data.id;
    setLoading(true);
    try {
      await wyrSeriesStatusUpdate(user.Authorization, actionId);
      message.success("Status Updated");
      setLoading(false);
      onChangeFetchList(selectedTechnicalId);
    } catch (error) {
      message.warning("Internal Server Error!!");
      setLoading(false);
    }
  };

  const onMappingParameters = data => {
    setParamActionId(data.id);
    setShowMapParametersModal(true);
  };

  const onCloseParametersModal = () => {
    setShowMapParametersModal(false);
    onChangeFetchList(selectedTechnicalId);
  };

  const onEdit = data => {
    setUpdateSeriesDetails(data);
    setEditModalShow(true);
  };

  const closeEditEpisodeModal = () => {
    setEditModalShow(false);
  };

  return (
    <div>
      {screenType === "seriesScreen" ? (
        <Card
          style={{ borderRadius: "5px" }}
          bodyStyle={{ borderRadius: "5px" }}
          title={<span style={{ fontSize: "20px" }}>Series</span>}
        >
          <div style={{ textAlign: "right", marginBottom: "40px" }}>
            <Button type="primary" onClick={() => createNew()}>
              Create New Series
            </Button>
          </div>
          <div style={{ width: "100%", display: "flex" }}>
            <div
              style={{
                width: "calc(100% - 450px)",
                textAlign: "left",
                fontWeight: 600,
                fontSize: "16px"
              }}
            >
              {selectedTechnicalId === 1 ? "Behavioral Module" : null}
              {selectedTechnicalId === 2 ? "Functional Module" : null}
            </div>
            <div style={{ width: "450px", textAlign: "right" }}>
              <Select
                style={{ maxWidth: "300px", width: "100%" }}
                placeholder="Select technical service"
                value={selectedTechnicalId}
                onChange={onChangeFetchList}
                allowClear={true}
              >
                <Select.Option value={null} disabled>
                  Select technical service
                </Select.Option>
                <Select.Option value={1}>Behavioral Module</Select.Option>
                <Select.Option value={2}>Functional Module</Select.Option>
              </Select>
            </div>
          </div>

          <div style={{ margin: "40px 0px", textAlign: "center" }}>
            {selectedTechnicalId === null ? (
              <div style={{ fontWeight: 500 }}>
                Select technical service from dropdown to view list
              </div>
            ) : (
              <Table
                loading={loading}
                dataSource={list}
                columns={columnName}
                rowKey={row => row.id}
                pagination={false}
              />
            )}
          </div>
        </Card>
      ) : null}

      {/*season starts */}

      {screenType === "seasonScreen" ? (
        <SeasonIndex
          selectedSeriesDetailsForSeason={selectedSeriesDetailsForSeason}
          setScreenType={setScreenType}
        />
      ) : null}

      {/*season ends */}

      {/* create new modal starts */}
      <Modal
        style={{ minWidth: "600px" }}
        title="Create New Episode"
        closable={true}
        footer={null}
        onCancel={closeCreateNewSeriesModal}
        visible={createNewModalShow}
        destroyOnClose={true}
      >
        <Create
          submitCreateNewSeries={submitCreateNewSeries}
          setCreateNewModalShow={setCreateNewModalShow}
        />
      </Modal>
      {/* create new modal end  */}
      {/* mapping Parameters start */}
      {showMapParametersModal === true ? (
        <SeriesParameterMap
          visible={showMapParametersModal}
          onCancel={onCloseParametersModal}
          onValuesSubmit={onCloseParametersModal}
          selectedTechnicalId={selectedTechnicalId}
          actionId={paramActionId}
          // loadAgain={loadAgain}
          // setLoadAgain={setLoadAgain}
          setShowMapParametersModal={setShowMapParametersModal}
        />
      ) : null}
      {/* mapping parameters end */}
      <Modal
        style={{ minWidth: "600px" }}
        title="Edit Episode"
        closable={true}
        footer={null}
        onCancel={closeEditEpisodeModal}
        visible={editModalShow}
        destroyOnClose={true}
      >
        <Edit
          submitEditSeries={submitCreateNewSeries}
          selectedTechnicalId={selectedTechnicalId}
          setEditModalShow={setEditModalShow}
          seriesDetails={updateSeriesDetails}
        />
      </Modal>
    </div>
  );
};

export default WyrSeriesIndex;
