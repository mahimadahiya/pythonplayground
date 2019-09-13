import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Filters from "../../../Elements/Helper/Filters";
import { Link } from "react-router-dom";
import {
  Table,
  Card,
  Pagination,
  Row,
  Modal,
  Button,
  Divider,
  Popconfirm
} from "antd";
import { fetchTagList, deleteTag } from "../../../../actions";
import TagCreate from "./TagCreate";

const TagList = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [offset, setOffset] = useState(0);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);
  const [filter, setFilter] = useState(true);

  const user = useSelector(state => state.userAuth);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const result = await fetchTagList(user.Authorization, {
        searchText,
        offset
      });
      const list = result.list.filter(item => {
        return item.flag !== 0;
      });
      setList(list);
      setCount(result.count);
      setLoading(false);
    };
    if (filter) {
      fetchList();
      setFilter(false);
    }
  }, [user, offset, searchText, filter]);

  const column = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: id => {
        return <Link to={`/tag/${id}`}>{id}</Link>;
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
      title: "Actions",
      key: "action",
      width: 360,
      render: record => (
        <span>
          <Button
            type="link"
            onClick={() => {
              setId(record.id);
              setShowModal(true);
            }}
          >
            Edit
          </Button>
          <Divider type="vertical" />
          <Popconfirm title="Delete" onConfirm={() => onDelete(record.id)}>
            <Button type="link">Delete</Button>
          </Popconfirm>
        </span>
      )
    }
  ];

  const onDelete = async id => {
    await deleteTag(user.Authorization, id);
    setFilter(true);
  };

  const handlePageChange = async pageNumber => {
    const offset = pageNumber * 10 - 10;
    setOffset(offset);
    setFilter(true);
  };

  const onSearch = e => {
    setSearchText(e.target.value);
    setFilter(true);
  };

  const fields = [
    {
      key: "1",
      type: "input",
      label: "Search by ID",
      placeholder: "Search by ID",
      onChange: onSearch
    }
  ];

  const onCloseModal = () => {
    setShowModal(false);
    setId(null);
    setFilter(true);
  };

  return (
    <div>
      <Card title={<div className="card-title">Filters</div>}>
        <Row>
          <Filters fields={fields} />
        </Row>
      </Card>
      <Card
        style={{ marginTop: 20 }}
        title={<div className="card-title">Tags List</div>}
      >
        <Row style={{ marginBottom: 20 }}>
          <Button
            shape="round"
            type="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create Tag
          </Button>
        </Row>
        <Row>
          <Table
            loading={loading}
            dataSource={list}
            columns={column}
            rowKey={row => row.id}
            pagination={false}
          />
        </Row>
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <Pagination onChange={handlePageChange} total={count} />
        </div>
      </Card>
      <Modal
        title="Create Tag"
        visible={showModal}
        footer={null}
        destroyOnClose={true}
        onCancel={onCloseModal}
        closable={true}
        width="1000px"
      >
        <TagCreate id={id} onCloseModal={onCloseModal} />
      </Modal>
    </div>
  );
};
export default TagList;
