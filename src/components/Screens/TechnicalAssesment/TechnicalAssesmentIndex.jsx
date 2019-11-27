import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Button, Table, Modal } from "antd";
import { getTechnicalAssesmentList } from "../../../actions";
import Create from "./Create";

const TechnicalAssesmentIndex = () => {
  const user = useSelector(state => state.userAuth);
  const AuthToken = user.Authorization;

  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadAgain, setLoadAgain] = useState(false);

  const [createNewModalShow, setCreateNewModalShow] = useState(false);

  useEffect(() => {
    const callTechAssListApi = async () => {
      setLoading(true);
      try {
        const response = await getTechnicalAssesmentList(AuthToken);
        setListData(response.data.result);
        setLoading(false);
        console.log(response.data.result);
      } catch (error) {
        setLoading(false);
      }
    };
    callTechAssListApi();
  }, [loadAgain]);

  const createNew = () => {
    setCreateNewModalShow(true);
  };
  const closeCreateNewActionModal = () => {
    setCreateNewModalShow(false);
  };

  const columnName = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: record => {
        return (
          <div>
            {record === null || record === "" || record === undefined
              ? "-"
              : record}
          </div>
        );
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: record => {
        return (
          <div>
            {record === null || record === "" || record === undefined
              ? "-"
              : record}
          </div>
        );
      }
    }
  ];

  return (
    <div>
      <Card style={{ borderRadius: "5px" }} bodyStyle={{ borderRadius: "5px" }}>
        <div style={{ textAlign: "right", marginBottom: "40px" }}>
          <Button type="primary" onClick={() => createNew()}>
            Create New Assesment
          </Button>
        </div>
        <div style={{ margin: "40px 0px", textAlign: "center" }}>
          <Table
            loading={loading}
            dataSource={listData}
            columns={columnName}
            rowKey={row => row.id}
            pagination={true}
          />
        </div>
      </Card>
      {/* create new modal starts */}
      <Modal
        style={{ minWidth: "600px" }}
        title="Create New Action"
        closable={true}
        footer={null}
        onCancel={closeCreateNewActionModal}
        visible={createNewModalShow}
        destroyOnClose={true}
      >
        <Create
          // submitCreateNewTechnicalService={submitCreateNewTechnicalService}
          setCreateNewModalShow={setCreateNewModalShow}
          setLoadAgain={setLoadAgain}
          loadAgain={loadAgain}
        />
      </Modal>
      {/* create new modal ends */}
    </div>
  );
};

export default TechnicalAssesmentIndex;
