import React, { useState, useEffect } from "react";
import { rolePlayList, deleteRolePLay } from "../../../actions";
import { useSelector } from "react-redux";
import {
  Table,
  Card,
  Row,
  Button,
  Divider,
  Popconfirm,
  message,
  Col,
  Input,
  Icon
} from "antd";
import moment from "moment";
import CreateRolePlayModal from "./CreateRolePlayModal";
import MapRolePlayParametersModal from "./MapRolePlayParametersModal";
import MapRolePlayChaptersModal from "./MapRolePlayChaptersModal";
import history from "../../../history";

const RolePlay = () => {
  const [loading, setLoading] = useState(true);
  const [List, setList] = useState([]);
  const [userListData, setUserListData] = useState([]);
  const [showCreateRolePlayModal, setShowCreateRolePlayModal] = useState(false);
  const [
    showMapRolePlayParametersModal,
    setShowMapRolePlayParametersModal
  ] = useState(false);
  const [
    showMapRolePlayChapterModal,
    setShowMapRolePlayChapterModal
  ] = useState(false);
  const user = useSelector(state => state.userAuth);
  const [loadAgain, setLoadAgain] = useState(false);

  const [rpArticleId, setRpArticleId] = useState(null);
  const [SearchfilterString, setSearchfilterString] = useState("");

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
        setUserListData(response.rp_article_details);
        setList(response.rp_article_details);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      setSearchfilterString("");
    };
    fetchList();
  }, [user, loadAgain]);

  //serach starts

  const SearchValFromTable = filterString => {
    setSearchfilterString(filterString);
    if (filterString) {
      const list = userListData.filter(item =>
        item.name.toLowerCase().includes(filterString.toLowerCase())
      );
      // console.log(list);
      setList(list);
    } else {
      setList(userListData);
    }
  };

  //serach ends

  const onCloseRolePLayModal = () => {
    setShowCreateRolePlayModal(false);
  };

  const onMappingParameters = data => {
    setRpArticleId(data.id);
    setShowMapRolePlayParametersModal(true);
  };

  const onMappingChapters = data => {
    setRpArticleId(data.id);
    setShowMapRolePlayChapterModal(true);
  };

  const onCloseRolePlayParametersModal = () => {
    setShowMapRolePlayParametersModal(false);
  };

  const onCloseRolePlayChapterModal = () => {
    setShowMapRolePlayChapterModal(false);
  };

  const column = [
    {
      title: "",
      key: "key",
      width: 100,
      render: (text, record) => (
        <span>
          {record.technical_service_id === 1 ? (
            <span
              style={{
                background: "#604482",
                borderRadius: 5,
                color: "#fff",
                padding: "8px 23px"
              }}
            >
              BM
            </span>
          ) : (
            <span
              style={{
                background: "#ff8e32",
                borderRadius: 5,
                color: "#fff",
                padding: "8px 23px"
              }}
            >
              Fm
            </span>
          )}
        </span>
      )
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
      render: id => {
        return <span>{id}</span>;
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: text => {
        return <div style={{ minHeight: "60px" }}>{text}</div>;
      }
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 100,
      render: date => {
        return moment(date).format("YYYY-MM-DD");
      }
    },
    {
      title: "Actions",
      dataIndex: "Map",
      key: "Map",
      width: 230,
      render: (text, record) => (
        <span>
          {record.technical_service_id === 1 ? (
            <Button onClick={() => onMappingParameters(record)} type="primary">
              Map Parameters
            </Button>
          ) : (
            <Button type="primary" onClick={() => onMappingChapters(record)}>
              Map Chapters
            </Button>
          )}
          <Divider type="vertical" />
          <Button
            type="primary"
            onClick={() => goToConersation(record)}
            style={{ marginTop: "5px" }}
          >
            Conversation
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            onConfirm={() => onDeleteRolePlay(record.id)}
            okText="Delete"
            placement="bottomLeft"
            title={"Are you sure you want to delete?"}
          >
            <Button
              style={{
                color: "#fff",
                background: "red",
                border: "none",
                marginTop: "5px"
              }}
            >
              Delete
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ];

  const goToConersation = data => {
    // <a href={`/role-play/details/${id}`}>{id}</a>
    history.push(`/role-play/details/${data.id}`);
  };

  const onDeleteRolePlay = async id => {
    if (id === null || id === undefined || id === "") {
      message.warning("Please select role play");
      return;
    }

    let rpId = id;

    setLoading(true);
    try {
      setLoading(false);
      await deleteRolePLay(user.Authorization, rpId);
      message.success("Role Play deleted");
      setLoadAgain(!loadAgain);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card
        style={{ marginTop: 20 }}
        title={<div className="card-title">Role-Play List</div>}
      >
        <Row style={{ marginBottom: 20 }}>
          <Col span={12}>
            <div>
              <Input
                placeholder="Search by Name"
                prefix={
                  <Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                value={SearchfilterString}
                allowClear
                onChange={e =>
                  SearchValFromTable(e.target.value ? e.target.value : null)
                }
                style={{ width: 350, marginBottom: "30px" }}
              />
            </div>
          </Col>
          <Col span={12}>
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
          </Col>
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

      {showMapRolePlayChapterModal === true ? (
        <MapRolePlayChaptersModal
          visible={showMapRolePlayChapterModal}
          onCancel={onCloseRolePlayChapterModal}
          onValuesSubmit={onCloseRolePlayChapterModal}
          rpArticleId={rpArticleId}
          setLoadAgain={setLoadAgain}
          loadAgain={loadAgain}
        />
      ) : null}
    </div>
  );
};
export default RolePlay;
