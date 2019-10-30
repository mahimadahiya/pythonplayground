import React, { useState } from "react";
import {
  Table,
  Card,
  Button,
  Select,
  Icon,
  Divider,
  Popconfirm,
  message
} from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import { wyrActionList, wyrActionDelete } from "../../../../actions";

const WyrActionIndex = props => {
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [selectedTechnicalId, setSelectedTechnicalId] = useState(null);

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
      render: record => {
        return <div>{record === 1 ? "Draft" : "Live"}</div>;
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
            style={{ marginRight: 10 }}
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
            <Button type="link" style={{ marginRight: 10, color: "red" }}>
              Delete
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ];

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

  const onEdit = async item => {
    console.log(item);
  };

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

  return (
    <div>
      <Card style={{ borderRadius: "5px" }} bodyStyle={{ borderRadius: "5px" }}>
        {/* <div style={{ textAlign: "right", marginBottom: "40px" }}>
          <Button type="primary">Map Users</Button>
        </div> */}
        <div style={{ width: "100%", textAlign: "center" }}>
          <Select
            style={{ maxWidth: "300px", width: "100%" }}
            placeholder="Select technical service"
            onChange={onChangeFetchList}
            allowClear={true}
          >
            <Select.Option value="1">Behavioral Module</Select.Option>
            <Select.Option value="2">Functional Module</Select.Option>
          </Select>
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
    </div>
  );
};

export default WyrActionIndex;
