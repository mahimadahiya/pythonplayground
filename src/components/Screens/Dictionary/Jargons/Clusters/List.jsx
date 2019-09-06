import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Card, Row, Modal, Button, message } from "antd";
import CreateJargonCluster from "./Create";
import { fetchJargonClusterList } from "../../../../../actions";

const JargonClusterList = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const user = useSelector(state => state.userAuth);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const data = await fetchJargonClusterList(user.Authorization);
      setList(data.result.cluster_details);
      setLoading(false);
    };
    if (filter) {
      fetchList();
      setFilter(false);
    }
  }, [user, filter]);

  // const onDelete = async id => {
  //   try {
  //     await deleteJargon(user.Authorization, id);
  //     message.success("Deleted successfully");
  //     setFilter(true);
  //   } catch (err) {
  //     message.error("Some error occured");
  //   }
  // };

  const column = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: text => {
        return <div style={{ minHeight: "60px" }}>{text}</div>;
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "50%",
      render: text => {
        return <div style={{ minHeight: "60px" }}>{text}</div>;
      }
    }
    // {
    //   title: "Actions",
    //   render: record => (
    //     <div>
    //       <span>
    //         <Button type="link" onClick={() => onDelete(record.id)}>
    //           Delete
    //         </Button>
    //       </span>
    //     </div>
    //   )
    // }
  ];

  const onCloseModal = () => {
    setShowModal(false);
    setFilter(true);
  };

  return (
    <div>
      <Card
        style={{ marginTop: 20 }}
        title={<div className="card-title">Jargon Cluster List</div>}
      >
        {/* <Row style={{ marginBottom: 20 }}>
          <Button
            shape="round"
            type="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create Jargon Cluster
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
        title="Create Jargon Cluster"
        visible={showModal}
        footer={null}
        destroyOnClose={true}
        onCancel={onCloseModal}
        closable={true}
        width="1000px"
      >
        <CreateJargonCluster onCloseModal={onCloseModal} />
      </Modal>
    </div>
  );
};
export default JargonClusterList;
