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
import { getWyrEpisodeSceneList } from "../../../../actions";

const SceneIndex = props => {
  const user = useSelector(state => state.userAuth);

  const [sceneList, setSceneList] = useState([]);
  const [loading, setLoading] = useState(false);

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
  }, [props.match.params.id]);

  return (
    <div>
      <Card
        title={
          <span style={{ fontSize: "22px", fontWeight: 700 }}>
            Episode/Scene
          </span>
        }
        style={{ borderRadius: "5px" }}
        bodyStyle={{ borderRadius: "5px" }}
      >
        <Table
          loading={loading}
          dataSource={sceneList}
          columns={columnName}
          rowKey={row => row.id}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default SceneIndex;
