import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Filters from "../../../Elements/Helper/Filters";
import { Table, Card, Pagination, Row, Modal, Button } from "antd";
import { fetchOrganizationList } from "../../../../actions";
import OrganizationCreate from "./OrganizationCreate";

const OrganizationList = () => {
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
      const result = await fetchOrganizationList(user.Authorization, {
        offset,
        searchText
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
        return <a href={`/organization/detail/${id}`}>{id}</a>;
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "60%",
      render: text => {
        return (
          <div>
            {text === null || text === "" ? (
              <span style={{ color: "black", fontWeight: "bold" }}>-</span>
            ) : (
              text
            )}
          </div>
        );
      }
    },
    {
      title: "Course ID",
      dataIndex: "course",
      key: "course",
      render: text => {
        return (
          <div>
            {text === null ? (
              <span style={{ color: "black", fontWeight: "bold" }}>-</span>
            ) : (
              text
            )}
          </div>
        );
      }
    },
    {
      title: "Region",
      key: "region",
      dataIndex: "region_details",
      render: region =>
        region ? (
          <div>{`${region[0].name} (${region[0].id})`}</div>
        ) : (
          <span style={{ color: "black", fontWeight: "bold" }}>-</span>
        )
    },
    {
      title: "Industry type",
      dataIndex: "organization_type",
      key: "organization_type",
      render: text => {
        return (
          <div>
            {text === null ? (
              <span style={{ color: "black", fontWeight: "bold" }}>-</span>
            ) : (
              text
            )}
          </div>
        );
      }
    }
    /*
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

        </span>
      )
    }*/
  ];

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
      label: "Search by Name or ID",
      placeholder: "Search by Name or ID",
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
        title={<div className="card-title">Organization List</div>}
      >
        <Row style={{ marginBottom: 20 }}>
          <Button
            shape="round"
            type="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create Organization
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
        title="Create Organization"
        visible={showModal}
        footer={null}
        destroyOnClose={true}
        onCancel={onCloseModal}
        closable={true}
        width="1000px"
      >
        <OrganizationCreate id={id} onCloseModal={onCloseModal} />
      </Modal>
    </div>
  );
};
export default OrganizationList;
