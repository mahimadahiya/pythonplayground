import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Card, Row, Modal, Button } from "antd";
import { fetchTraitsList } from "../../../actions";
import moment from "moment";
import { dateFormat } from "../Form/FieldFormats";
import TraitCreate from "./TraitCreate";

const TraitsList = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // const [id, setId] = useState(null);

  const user = useSelector(state => state.userAuth);
  const traits = useSelector(state => state.trait.traits);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filter) {
      setLoading(true);
      dispatch(fetchTraitsList(user.Authorization));
      setFilter(false);
    }
  }, [user, filter, dispatch]);

  if (loading && traits.length > 0) setLoading(false);

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
      width: "60%",
      render: text => {
        return <div style={{ minHeight: "60px" }}>{text}</div>;
      }
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: date => {
        return (
          <div style={{ minHeight: "60px" }}>
            {moment(date).format(dateFormat)}
          </div>
        );
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
    // setId(null);
    setFilter(true);
  };

  return (
    <div>
      <Card title={<div className="card-title">Traits List</div>}>
        <Row style={{ marginBottom: 20 }}>
          <Button
            shape="round"
            type="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create Trait
          </Button>
        </Row>
        <Row>
          <Table
            loading={loading}
            dataSource={traits}
            columns={column}
            rowKey={row => row.id}
          />
        </Row>
      </Card>
      <Modal
        title="Create Trait"
        visible={showModal}
        footer={null}
        destroyOnClose={true}
        onCancel={onCloseModal}
        closable={true}
        width="1000px"
      >
        <TraitCreate setFilter={setFilter} />
      </Modal>
    </div>
  );
};
export default TraitsList;
