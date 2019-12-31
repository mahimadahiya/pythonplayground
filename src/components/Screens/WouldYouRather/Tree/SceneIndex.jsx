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
  Icon
} from "antd";
import { useSelector } from "react-redux";
import { getWyrEpisodeSceneList } from "../../../../actions";
import SceneCreate from "./SceneCreate";
import history from "../../../../history";

const SceneIndex = props => {
  const user = useSelector(state => state.userAuth);

  const [sceneList, setSceneList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createNewModalShow, setCreateNewModalShow] = useState(false);
  const [loadAgain, setLoadAgain] = useState(false);

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
      title: "Actions",
      key: "action",
      render: record => (
        <span>
          <Button
            type="link"
            // onClick={() => onEdit(record)}
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

  useEffect(() => {
    const callDataApi = async () => {
      setLoading(true);
      try {
        const response = await getWyrEpisodeSceneList(
          user.Authorization,
          props.match.params.id
        );
        setSceneList(response.data.result.wyr_scene_list);
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

  const goBackToEpisodeList = () => {
    history.push("/wyr/episode");
  };

  const createNew = () => {
    setCreateNewModalShow(true);
  };

  const closeCreateNewSceneModal = () => {
    setCreateNewModalShow(false);
  };

  return (
    <div>
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
            episodeId={props.match.params.id}
            setCreateNewModalShow={setCreateNewModalShow}
            setLoadAgain={setLoadAgain}
            loadAgain={loadAgain}
          />
        </Modal>
      ) : null}
      {/* create new modal end  */}
    </div>
  );
};

export default SceneIndex;
