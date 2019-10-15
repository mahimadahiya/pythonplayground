import React, { useState, useEffect } from "react";
import { rolePlayList, addRolePlay } from "../../../actions";
import { useSelector } from "react-redux";
import { Table, Card, Pagination, Row, Button } from "antd";
import moment from "moment";
import CreateRolePlayModal from "./CreateRolePlayModal";

const RolePlay = () => {
  const [loading, setLoading] = useState(true);
  const [List, setList] = useState([]);
  const [showCreateRolePlayModal, setShowCreateRolePlayModal] = useState(false);
  const user = useSelector(state => state.userAuth);
  const [loadAgain, setLoadAgain] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const response = await rolePlayList(user.Authorization);
      setList(response.rp_article_details);
      setLoading(false);
    };
    fetchList();
  }, [user, loadAgain]);

  const onCloseRolePLayModal = () => {
    setShowCreateRolePlayModal(false);
  };

  const column = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: id => {
        return <a href={``}>{id}</a>;
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "60%",
      render: text => {
        return <div style={{ minHeight: "60px" }}>{text}</div>;
      }
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: date => {
        return moment(date).format("YYYY-MM-DD");
      }
    }
  ];

  return (
    <div>
      <Card
        style={{ marginTop: 20 }}
        title={<div className="card-title">Role-Play List</div>}
      >
        <Row style={{ marginBottom: 20 }}>
          <Button
            style={{ float: "right" }}
            shape="round"
            type="primary"
            onClick={() => {
              setShowCreateRolePlayModal(true);
            }}
          >
            Create Role-Play
          </Button>
        </Row>
        <Row>
          <Table
            loading={loading}
            dataSource={List}
            columns={column}
            rowKey={row => row.id}
            pagination={false}
          />
        </Row>
      </Card>

      <CreateRolePlayModal
        visible={showCreateRolePlayModal}
        onCancel={onCloseRolePLayModal}
        onModalClose={onCloseRolePLayModal}
        setLoadAgain={setLoadAgain}
        loadAgain={loadAgain}
      />
    </div>
  );
};
export default RolePlay;
