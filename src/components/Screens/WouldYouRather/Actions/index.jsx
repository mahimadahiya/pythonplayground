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
import moment from "moment";
import {
  wyrActionList,
  wyrActionDelete,
  wyrActionStatusUpdate
} from "../../../../actions";
import Create from "./Create";
import ActionMapParameters from "./MapParameters";
import ActionMapCourses from "./MapCourses";
import Edit from "./Edit";

const WyrActionIndex = props => {
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [selectedTechnicalId, setSelectedTechnicalId] = useState(null);

  // create new Modal
  const [createNewModalShow, setCreateNewModalShow] = useState(false);

  // mapping parameters
  const [paramActionId, setParamActionId] = useState(null);
  const [showMapParametersModal, setShowMapParametersModal] = useState(false);

  // mapping courses
  const [courseActionId, setCourseActionId] = useState(null);
  const [showMapCoursesModal, setShowMapCoursesModal] = useState(false);

  // update action
  const [updateActionDetails, setUpdateActionDetails] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);

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
      title: "Action",
      dataIndex: "action",
      key: "actions",
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
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: record => {
        return (
          <div>
            {record === null || record === "" || record === undefined
              ? "-"
              : moment(record).format("DD-MM-YYYY")}
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
                onClick={() => onMappingCourses(record)}
                style={{ padding: 0, marginRight: "10px" }}
              >
                Map Courses
              </Button>
              <Divider type="vertical" />
            </span>
          )}

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

  // changeCurrentActionStatus starts
  const changeCurrentActionStatus = async data => {
    let actionId = data.id;
    setLoading(true);
    try {
      await wyrActionStatusUpdate(user.Authorization, actionId);
      message.success("Status Updated");
      setLoading(false);
      onChangeFetchList(selectedTechnicalId);
    } catch (error) {
      message.warning("Internal Server Error!!");
      setLoading(false);
    }
  };
  // changeCurrentActionStatus end

  // mapping parameters modal funtion starts
  const onMappingParameters = data => {
    setParamActionId(data.id);
    setShowMapParametersModal(true);
  };
  const onCloseParametersModal = () => {
    setShowMapParametersModal(false);
    onChangeFetchList(selectedTechnicalId);
  };
  // mapping parameters modal funtion end

  // mapping courses modal funtion starts
  const onMappingCourses = data => {
    setCourseActionId(data.id);
    setShowMapCoursesModal(true);
  };
  const onCloseCoursesModal = () => {
    setShowMapCoursesModal(false);
    onChangeFetchList(selectedTechnicalId);
  };
  // mapping courses modal funtion ends

  const onChangeFetchList = async value => {
    if (value === undefined || value === null) {
      setSelectedTechnicalId(null);
    } else {
      try {
        setLoading(true);
        setSelectedTechnicalId(value);
        const response = await wyrActionList(user.Authorization, value);

        if (response.result.wyr_action_list.length > 0) {
          setList(response.result.wyr_action_list);
        } else {
          setList([]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  // edit/update action starts
  const onEdit = async item => {
    setUpdateActionDetails(item);
    setEditModalShow(true);
  };

  const closeEditNewActionModal = () => {
    setEditModalShow(false);
  };

  const submitEditAction = techId => {
    if (techId === null || techId === undefined) {
      setSelectedTechnicalId(null);
    } else {
      setSelectedTechnicalId(techId);
      onChangeFetchList(techId);
    }
  };

  // edit/update action ends

  const onDelete = async item => {
    try {
      let selectedId = item.id;
      setLoading(true);
      await wyrActionDelete(user.Authorization, selectedId);
      message.success("Action Deleted");
      setLoading(false);
      onChangeFetchList(selectedTechnicalId);
    } catch (error) {
      setLoading(false);
    }
  };

  // create new actions functions
  const createNew = () => {
    setCreateNewModalShow(true);
  };
  const closeCreateNewActionModal = () => {
    setCreateNewModalShow(false);
  };
  const submitCreateNewAction = techincalService => {
    if (techincalService === null || techincalService === undefined) {
      setSelectedTechnicalId(null);
    } else {
      setSelectedTechnicalId(techincalService);
      onChangeFetchList(techincalService);
    }
  };

  return (
    <div>
      <Card style={{ borderRadius: "5px" }} bodyStyle={{ borderRadius: "5px" }}>
        <div style={{ textAlign: "right", marginBottom: "40px" }}>
          <Button type="primary" onClick={() => createNew()}>
            Create New Action
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

      {/* create new modal starts */}
      <Modal
        style={{ minWidth: "600px" }}
        title="Create New Action"
        closable={true}
        footer={null}
        onCancel={closeCreateNewActionModal}
        visible={createNewModalShow}
        destroyOnClose={true}
      >
        <Create
          submitCreateNewAction={submitCreateNewAction}
          setCreateNewModalShow={setCreateNewModalShow}
        />
      </Modal>
      {/* create new modal end  */}

      {/* mapping Parameters start */}
      {showMapParametersModal === true ? (
        <ActionMapParameters
          visible={showMapParametersModal}
          onCancel={onCloseParametersModal}
          onValuesSubmit={onCloseParametersModal}
          selectedTechnicalId={selectedTechnicalId}
          actionId={paramActionId}
        />
      ) : null}
      {/* mapping parameters end */}

      {/* mapping courses start */}
      {showMapCoursesModal === true ? (
        <ActionMapCourses
          visible={showMapCoursesModal}
          onCancel={onCloseCoursesModal}
          onValuesSubmit={onCloseCoursesModal}
          selectedTechnicalId={selectedTechnicalId}
          actionId={courseActionId}
        />
      ) : null}
      {/* mapping parameters end */}

      {/* edit new modal starts */}
      <Modal
        style={{ minWidth: "600px" }}
        title="Edit Action"
        closable={true}
        footer={null}
        onCancel={closeEditNewActionModal}
        visible={editModalShow}
        destroyOnClose={true}
      >
        <Edit
          submitEditAction={submitEditAction}
          selectedTechnicalId={selectedTechnicalId}
          setEditModalShow={setEditModalShow}
          actionDetails={updateActionDetails}
        />
      </Modal>
      {/* edit new modal end  */}
    </div>
  );
};

export default WyrActionIndex;
