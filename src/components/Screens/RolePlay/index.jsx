import React, { useState, useEffect } from "react";
import { rolePlayList } from "../../../actions";
import { useSelector } from "react-redux";
import { Table, Card, Row, Button } from "antd";
import moment from "moment";
import CreateRolePlayModal from "./CreateRolePlayModal";
import MapRolePlayParametersModal from "./MapRolePlayParametersModal";

const RolePlay = () => {
  const [loading, setLoading] = useState(true);
  const [List, setList] = useState([]);
  const [showCreateRolePlayModal, setShowCreateRolePlayModal] = useState(false);
  const [
    showMapRolePlayParametersModal,
    setShowMapRolePlayParametersModal
  ] = useState(false);
  const user = useSelector(state => state.userAuth);
  const [loadAgain, setLoadAgain] = useState(false);

  const [rpArticleId, setRpArticleId] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);

      try {
        const response = await rolePlayList(user.Authorization);

        response.rp_article_details = response.rp_article_details
          // .sort((a, b) => {
          //   return (
          //     new Date(a.created_at).getTime() -
          //     new Date(b.created_at).getTime()
          //   );
          // })
          // .reverse();
          .sort(function(a, b) {
            if (
              new Date(a.created_at).getTime() >
              new Date(b.created_at).getTime()
            )
              return -1;
            if (
              new Date(a.created_at).getTime() <
              new Date(b.created_at).getTime()
            )
              return 1;
            return 0;
          });

        setList(response.rp_article_details);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchList();
  }, [user, loadAgain]);

  const onCloseRolePLayModal = () => {
    setShowCreateRolePlayModal(false);
  };

  const onMappingParameters = data => {
    setRpArticleId(data.id);
    setShowMapRolePlayParametersModal(true);
  };

  const onCloseRolePlayParametersModal = () => {
    setShowMapRolePlayParametersModal(false);
  };

  const column = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: id => {
        return <a href={`/role-play/details/${id}`}>{id}</a>;
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
    },
    {
      title: "Map Parameters",
      dataIndex: "Map",
      key: "Map",
      render: (text, record) => (
        <span
          onClick={() => onMappingParameters(record)}
          style={{ cursor: "pointer", color: "#22a4ef" }}
        >
          Map
        </span>
      )
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
            pagination={true}
          />
        </Row>
      </Card>

      {showCreateRolePlayModal === true ? (
        <CreateRolePlayModal
          visible={showCreateRolePlayModal}
          onCancel={onCloseRolePLayModal}
          onModalClose={onCloseRolePLayModal}
          setLoadAgain={setLoadAgain}
          loadAgain={loadAgain}
        />
      ) : null}

      {showMapRolePlayParametersModal === true ? (
        <MapRolePlayParametersModal
          visible={showMapRolePlayParametersModal}
          onCancel={onCloseRolePlayParametersModal}
          onValuesSubmit={onCloseRolePlayParametersModal}
          rpArticleId={rpArticleId}
          setLoadAgain={setLoadAgain}
          loadAgain={loadAgain}
        />
      ) : null}
    </div>
  );
};
export default RolePlay;
