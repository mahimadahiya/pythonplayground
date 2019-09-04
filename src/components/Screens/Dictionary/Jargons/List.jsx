import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, Card, Row, Modal, Button, message } from "antd";
import { fetchJargonList, deleteJargon } from "../../../../actions";
import CreateJargon from "./Create";

const JargonsList = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);

  const user = useSelector(state => state.userAuth);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const list = await fetchJargonList(user.Authorization);
      setList(list);
      setLoading(false);
    };
    if (filter) {
      fetchList();
      setFilter(false);
    }
  }, [user, filter]);

  const onDelete = async id => {
    try {
      await deleteJargon(user.Authorization, id);
      message.success("Deleted successfully");
    } catch (err) {
      message.error("Some error occured");
    }
  };

  const column = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: id => <Link to={`/jargons/${id}`}>{id}</Link>
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: text => {
        return <div style={{ minHeight: "60px" }}>{text}</div>;
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "60%",
      render: text => {
        return <div style={{ minHeight: "60px" }}>{text}</div>;
      }
    },
    {
      title: "Actions",
      render: record => (
        <div>
          <Button
            icon="delete"
            type="link"
            onClick={() => onDelete(record.id)}
          />
        </div>
      )
    }
  ];

  const onCloseModal = () => {
    setShowModal(false);
    setFilter(true);
  };

  return (
    <div>
      <Card
        style={{ marginTop: 20 }}
        title={<div className="card-title">Jargons List</div>}
      >
        <Row style={{ marginBottom: 20 }}>
          <Button
            shape="round"
            type="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create Jargon
          </Button>
        </Row>
        <Row>
          <Table
            loading={loading}
            dataSource={list}
            columns={column}
            rowKey={row => row.id}
          />
        </Row>
      </Card>
      <Modal
        title="Create Jargon"
        visible={showModal}
        footer={null}
        destroyOnClose={true}
        onCancel={onCloseModal}
        closable={true}
        width="1000px"
      >
        <CreateJargon id={id} onCloseModal={onCloseModal} />
      </Modal>
    </div>
  );
};
export default JargonsList;
