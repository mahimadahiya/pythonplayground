import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, Card, Row, Modal, Button, message, Popconfirm } from "antd";
import { fetchKeywordsList, deleteKeyword } from "../../../../actions";
import CreateKeyword from "./Create";
import MapKeyword from "./Map";

const KeywordsList = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  const [id, setId] = useState(null);

  const user = useSelector(state => state.userAuth);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const list = await fetchKeywordsList(user.Authorization);
      setList(list);
      setLoading(false);
    };
    if (filter) {
      fetchList();
      setFilter(false);
    }
  }, [user, filter]);

  const onMapKeyword = id => {
    setId(id);
    setShowMapModal(true);
  };

  const onDelete = async id => {
    setLoading(true);
    try {
      await deleteKeyword(user.Authorization, id);
      message.success("Deleted successfully");
      setLoading(false);
      setFilter(true);
    } catch (err) {
      setLoading(false);
      message.error("Some error occured");
    }
  };

  const column = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
      // render: id => <Link to={`/jargons/${id}`}>{id}</Link>
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
          {/* <span>
            <Button type="link" onClick={() => onEditClick(record.id)}>
              Edit
            </Button>
          </span> */}
          <span>
            <Popconfirm
              onConfirm={() => onDelete(record.id)}
              okText="Delete"
              title={"Are you sure you want to delete?"}
            >
              <Button type="link" style={{ color: "red" }}>
                Delete
              </Button>
            </Popconfirm>
          </span>
          <span>
            <Button type="link" onClick={() => onMapKeyword(record.id)}>
              Map
            </Button>
          </span>
        </div>
      )
    }
  ];

  const onCloseModal = () => {
    setShowModal(false);
    setFilter(true);
    setId(null);
  };

  const onCloseMapModal = () => {
    setShowMapModal(false);
    setId(null);
  };

  return (
    <div>
      <Card
        style={{ marginTop: 20 }}
        title={<div className="card-title">Keywords List</div>}
      >
        <Row style={{ marginBottom: 20 }}>
          <Button
            shape="round"
            type="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create Keyword
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
        title={id ? "Edit" : "Create"}
        visible={showModal}
        footer={null}
        destroyOnClose={true}
        onCancel={onCloseModal}
        closable={true}
        width="1000px"
      >
        <CreateKeyword id={id} onCloseModal={onCloseModal} />
      </Modal>
      <Modal
        title="Map Keyword"
        visible={showMapModal}
        footer={null}
        destroyOnClose={true}
        onCancel={onCloseMapModal}
        closable={true}
        width="1000px"
      >
        <MapKeyword id={id} onCloseMapModal={onCloseMapModal} />
      </Modal>
    </div>
  );
};
export default KeywordsList;
