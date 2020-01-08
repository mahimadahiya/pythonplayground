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
  Descriptions
} from "antd";
import { useSelector } from "react-redux";
import {
  getWyrEpisodeSceneList,
  wyrEpisodeSceneDelete,
  wyrTreeList
} from "../../../../actions";
import SceneCreate from "./SceneCreate";
import history from "../../../../history";
import SceneUpdate from "./SceneUpdate";
import MapScenarioModal from "./MapScenario";

const SceneIndex = props => {
  //console.log(props.match.params.techId);
  const user = useSelector(state => state.userAuth);

  const [sceneList, setSceneList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createNewModalShow, setCreateNewModalShow] = useState(false);
  const [loadAgain, setLoadAgain] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [updateSceneDetails, setUpdateSceneDetails] = useState([]);
  const [episodeDetailsData, setEpisodeDetailsData] = useState([]);

  const [mapScenarioSceneDetails, setMapScenarioSceneDetails] = useState([]);
  const [mapScenarioModalShow, setMapScenarioModalShow] = useState(false);

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
      title: "Scene",
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
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: record => {
        return (
          <div>
            {record === null || record === "" || record === undefined ? (
              "-"
            ) : (
              <span>
                <span
                  style={{ maxWidth: "200px" }}
                  className="verticalTwoLineEllipsis"
                >
                  {record}
                </span>
                ...
              </span>
            )}
          </div>
        );
      }
    },
    {
      title:
        JSON.parse(props.match.params.techId) === 1 ? "Competency" : "Chapter",
      dataIndex:
        JSON.parse(props.match.params.techId) === 1
          ? "parameter__name"
          : "chapter__name",
      key:
        JSON.parse(props.match.params.techId) === 1
          ? "parameter__name"
          : "chapter__name",
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
            type="link"
            style={{ padding: 0, marginRight: "10px" }}
            onClick={() => onMapScenario(record)}
          >
            Map Scenarios
          </Button>
        </span>
      )
    }
  ];

  useEffect(() => {
    const callDataApi = async () => {
      setLoading(true);
      try {
        const response = await getWyrEpisodeSceneList(
          user.Authorization,
          props.match.params.id
        );
        setSceneList(response.data.result.wyr_scene_list);

        const episodeDetailsResponse = await wyrTreeList(user.Authorization);
        let tempList = [];
        for (
          let i = 0;
          i < episodeDetailsResponse.data.result.wyr_episode_list.length;
          i++
        ) {
          if (
            episodeDetailsResponse.data.result.wyr_episode_list[i].id ===
            JSON.parse(props.match.params.id)
          ) {
            tempList.push(
              episodeDetailsResponse.data.result.wyr_episode_list[i]
            );
          }
        }
        // console.log(tempList);
        setEpisodeDetailsData(tempList[0]);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    callDataApi();
    return () => {
      setSceneList([]);
    };
  }, [props.match.params.id, loadAgain]);

  // console.log("details", episodeDetailsData);

  const goBackToEpisodeList = () => {
    history.push("/wyr/episode");
  };

  const createNew = () => {
    setCreateNewModalShow(true);
  };

  const closeCreateNewSceneModal = () => {
    setCreateNewModalShow(false);
  };

  const onEdit = data => {
    setUpdateSceneDetails(data);
    setEditModalShow(true);
  };

  const closeEditEpisodeModal = () => {
    setEditModalShow(false);
  };

  const onMapScenario = data => {
    setMapScenarioSceneDetails(data);
    setMapScenarioModalShow(true);
  };

  const closeMapScenarioEpisodeModal = () => {
    setMapScenarioModalShow(false);
  };

  const onDelete = async item => {
    try {
      let selectedId = item.id;
      setLoading(true);
      await wyrEpisodeSceneDelete(user.Authorization, selectedId);
      message.success("Scene Deleted");
      setLoadAgain(!loadAgain);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const renderFields = data => {
    return (
      <>
        <Descriptions bordered size="small">
          <Descriptions.Item label="Episode Id">{data.id}</Descriptions.Item>
          <Descriptions.Item label="Episode Name">
            {data.name}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {data.description}
          </Descriptions.Item>
        </Descriptions>
      </>
    );
  };

  return (
    <div>
      <Card
        loading={loading}
        style={{ marginBottom: "30px" }}
        title={<div className="card-title">Episode Details</div>}
      >
        {renderFields(episodeDetailsData)}
      </Card>
      <Card
        title={
          <div style={{ display: "flex" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, width: "50%" }}>
              Episode/Scene
            </div>
            <div style={{ width: "50%", textAlign: "right" }}>
              <Button style={{ fontWeight: 900 }} onClick={goBackToEpisodeList}>
                <Icon type="arrow-left" /> Back
              </Button>
            </div>
          </div>
        }
        style={{ borderRadius: "5px" }}
        bodyStyle={{ borderRadius: "5px" }}
      >
        <div style={{ textAlign: "right", marginBottom: "40px" }}>
          <Button type="primary" onClick={() => createNew()}>
            Create New Scene
          </Button>
        </div>
        <Table
          loading={loading}
          dataSource={sceneList}
          columns={columnName}
          rowKey={row => row.id}
          pagination={false}
        />
      </Card>

      {/* create new modal starts */}
      {createNewModalShow === true ? (
        <Modal
          style={{ minWidth: "600px" }}
          title="Create New Scene"
          closable={true}
          footer={null}
          onCancel={closeCreateNewSceneModal}
          visible={createNewModalShow}
          destroyOnClose={true}
        >
          <SceneCreate
            technicalServiceId={props.match.params.techId}
            episodeId={props.match.params.id}
            setCreateNewModalShow={setCreateNewModalShow}
            setLoadAgain={setLoadAgain}
            loadAgain={loadAgain}
          />
        </Modal>
      ) : null}
      {/* create new modal end  */}

      {/* Update modal starts */}
      {editModalShow === true ? (
        <Modal
          style={{ minWidth: "600px" }}
          title="Edit Scene"
          closable={true}
          footer={null}
          onCancel={closeEditEpisodeModal}
          visible={editModalShow}
          destroyOnClose={true}
        >
          <SceneUpdate
            episodeId={props.match.params.id}
            technicalServiceId={props.match.params.techId}
            setEditModalShow={setEditModalShow}
            sceneDetails={updateSceneDetails}
            setLoadAgain={setLoadAgain}
            loadAgain={loadAgain}
          />
        </Modal>
      ) : null}
      {/* Update modal ends */}

      {/* map scenario modal starts */}
      {mapScenarioModalShow === true ? (
        <Modal
          style={{ minWidth: "600px" }}
          title="Map Scenario"
          closable={true}
          footer={null}
          onCancel={closeMapScenarioEpisodeModal}
          visible={mapScenarioModalShow}
          destroyOnClose={true}
        >
          <MapScenarioModal
            episodeId={props.match.params.id}
            technicalServiceId={props.match.params.techId}
            setMapScenarioModalShow={setMapScenarioModalShow}
            sceneDetails={mapScenarioSceneDetails}
            setLoadAgain={setLoadAgain}
            loadAgain={loadAgain}
          />
        </Modal>
      ) : null}
      {/*  map scenario modal ends */}
    </div>
  );
};

export default SceneIndex;
