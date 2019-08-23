import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Card, Row, Modal, Button } from "antd";
import { fetchOptionsList } from "../../../actions";
import moment from "moment";
import { dateFormat } from "../Form/FieldFormats";
import OptionCreate from "./OptionCreate";

const OptionsList = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // const [id, setId] = useState(null);

  const user = useSelector(state => state.userAuth);
  const options = useSelector(state => state.trait.options);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filter) {
      setLoading(true);
      dispatch(fetchOptionsList(user.Authorization));
      setFilter(false);
    }
  }, [user, filter, dispatch]);

  if (loading && options.length > 0) setLoading(false);

  const column = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
      // render: id => {
      //   return <Link to={`/category/${id}`}>{id}</Link>;
      // }
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
      width: "60%",
      render: text => {
        return <div style={{ minHeight: "60px" }}>{text}</div>;
      }
    },
    {
      title: "Option Type",
      dataIndex: "option_type",
      key: "option_type"
      // width: "60%",
      // render: text => {
      //   return <div style={{ minHeight: "60px" }}>{text}</div>;
      // }
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
      <Card title={<div className="card-title">Options List</div>}>
        <Row style={{ marginBottom: 20 }}>
          <Button
            shape="round"
            type="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create Option
          </Button>
        </Row>
        <Row>
          <Table
            loading={loading}
            dataSource={options}
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
        <OptionCreate setFilter={setFilter} />
      </Modal>
    </div>
  );
};
export default OptionsList;
