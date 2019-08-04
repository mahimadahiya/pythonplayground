import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Card, Row, Modal } from "antd";
import { fetchModules } from "../../../actions";
import CategoryCreate from "../MasterTable/Category/CategoryCreate";

const ModuleList = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);

  const user = useSelector(state => state.userAuth);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const list = await fetchModules(user.Authorization);
      setList(list);
      setLoading(false);
    };
    if (filter) {
      fetchList();
      setFilter(false);
    }
  }, [user, filter]);

  const column = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: id => {
        return <Link to={`/category/${id}`}>{id}</Link>;
      }
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
    }
    // {
    //   title: "Actions",
    //   key: "action",
    //   width: 360,
    //   render: record => (
    //     <span>
    //       <Button
    //         type="link"
    //         onClick={() => {
    //           setId(record.id);
    //           setShowModal(true);
    //         }}
    //       >
    //         Edit
    //       </Button>
    //       <Divider type="vertical" />
    //       {/* <Popconfirm title="Delete" onConfirm={() => onDelete(record.id)}>
    //         <Button type="link">Delete</Button>
    //       </Popconfirm> */}
    //     </span>
    //   )
    // }
  ];

  // const onDelete = async id => {
  //   await deleteCategory(user.Authorization, id);
  //   setFilter(true);
  // };

  const onCloseModal = () => {
    setShowModal(false);
    setId(null);
    setFilter(true);
  };

  return (
    <div>
      <Card
        style={{ marginTop: 20 }}
        title={<div className="card-title">Module List</div>}
      >
        {/* <Row style={{ marginBottom: 20 }}>
          <Button
            shape="round"
            type="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create Module
          </Button>
        </Row> */}
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
        title="Create Module"
        visible={showModal}
        footer={null}
        destroyOnClose={true}
        onCancel={onCloseModal}
        closable={true}
        width="1000px"
      >
        <CategoryCreate id={id} />
      </Modal>
    </div>
  );
};
export default ModuleList;
