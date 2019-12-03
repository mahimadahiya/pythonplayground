import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Table, Input, Button, Modal, Icon } from "antd";
import moment from "moment";
import { getOrgnizationAssesmentDetails } from "../../../actions";
import CreateOrgAssesment from "./CreateOrgAssesment";
import EditOrgAssesment from "./EditOrgAssesment";

const TechnicalAssesmentDetails = props => {
  const user = useSelector(state => state.userAuth);
  const AuthToken = user.Authorization;

  const organizationId = props.selectedOrganizationData.organization_id;
  const organizationGroupId = props.selectedOrganizationData.id;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [loadAgain, setLoadAgain] = useState(false);
  const [selectedOrgDetails, setSelectedOrgDetails] = useState([]);

  const [createNewModalShow, setCreateNewModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const columnName = [
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
    },
    {
      title: "Going Live At",
      dataIndex: "going_live_at",
      key: "going_live_at",
      render: date => {
        return moment(date).format("YYYY-MM-DD");
      }
    },
    {
      title: "Actions",
      key: "action",
      width: 360,
      render: record => (
        <span>
          <Button onClick={() => onEditOrgAssesment(record)} type="link">
            Edit
          </Button>
        </span>
      )
    }
  ];

  const onEditOrgAssesment = data => {
    setSelectedOrgDetails(data);
    setEditModalShow(true);
  };

  const closeEditModal = () => {
    setEditModalShow(false);
  };

  const onSearchInputChange = async e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const callDetailsApi = async () => {
      setLoading(true);
      try {
        const response = await getOrgnizationAssesmentDetails(
          props.selectedOrganizationData.id,
          AuthToken,
          search
        );
        setData(response.data.result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    callDetailsApi();
  }, [search, loadAgain]);

  const closeCreateNewModal = () => {
    setCreateNewModalShow(false);
  };
  const createNew = () => {
    setCreateNewModalShow(true);
  };
  const onBackToTechListClick = () => {
    props.setScreenType("technicalAssesment");
  };

  return (
    <div>
      <Card
        title={
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }} className="card-title">
              Organisation Assesment List
            </div>
            <div style={{ width: "50%", textAlign: "right" }}>
              <Button
                onClick={onBackToTechListClick}
                style={{ fontSize: "16px", fontWeight: 700 }}
                type="link"
              >
                <Icon type="arrow-left" />
                Back To Tech List
              </Button>
            </div>
          </div>
        }
        style={{ borderRadius: "5px" }}
        bodyStyle={{ borderRadius: "5px" }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: "45%" }}>
            <Input
              onChange={onSearchInputChange}
              placeholder="Search by Name"
            />
          </div>
          <div
            style={{ textAlign: "right", marginBottom: "40px", width: "50%" }}
          >
            <Button type="primary" onClick={() => createNew()}>
              Create New
            </Button>
          </div>
        </div>
        <div style={{ margin: "40px 0px", textAlign: "center" }}>
          <Table
            loading={loading}
            dataSource={data}
            columns={columnName}
            rowKey={row => row.id}
            pagination={true}
          />
        </div>
      </Card>
      {/* create new modal starts */}
      <Modal
        style={{ minWidth: "600px" }}
        title="Create New "
        closable={true}
        footer={null}
        onCancel={closeCreateNewModal}
        visible={createNewModalShow}
        destroyOnClose={true}
      >
        <CreateOrgAssesment
          setCreateNewModalShow={setCreateNewModalShow}
          setLoadAgain={setLoadAgain}
          loadAgain={loadAgain}
          organizationId={organizationId}
          organizationGroupId={organizationGroupId}
        />
      </Modal>
      {/* create new modal ends */}
      {/* edit  modal starts */}
      <Modal
        style={{ minWidth: "600px" }}
        title="Edit Technical Assesment"
        closable={true}
        footer={null}
        onCancel={closeEditModal}
        visible={editModalShow}
        destroyOnClose={true}
      >
        <EditOrgAssesment
          selectedOrgDetails={selectedOrgDetails}
          setEditModalShow={setEditModalShow}
          loadAgain={loadAgain}
          setLoadAgain={setLoadAgain}
          organizationGroupId={organizationGroupId}
        />
      </Modal>

      {/* edit  modal ends */}
    </div>
  );
};

export default TechnicalAssesmentDetails;
