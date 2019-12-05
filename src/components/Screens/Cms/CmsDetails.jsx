{
  /* import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Table, Input, Button, Modal, Icon } from "antd";
import moment from "moment";
import { getOrgnizationAssesmentDetails } from "../../../actions";

const CmsDetails = props => {
  const user = useSelector(state => state.userAuth);
  const AuthToken = user.Authorization;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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
    }
  ];

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
  }, [search]);

  const onBackToCmsListClick = () => {
    props.setScreenType("cmsList");
  };

  const onSearchInputChange = async e => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <Card
        title={
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }} className="card-title">
              Cms Details
            </div>
            <div style={{ width: "50%", textAlign: "right" }}>
              <Button
                onClick={onBackToCmsListClick}
                style={{ fontSize: "16px", fontWeight: 700 }}
                type="link"
              >
                <Icon type="arrow-left" />
                Back To Cms List
              </Button>
            </div>
          </div>
        }
        style={{ borderRadius: "5px" }}
        bodyStyle={{ borderRadius: "5px" }}
      >
        <div>
          <Input
            onChange={onSearchInputChange}
            placeholder="Search by Name"
            style={{ width: "50%" }}
          />
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
    </div>
  );
};

export default CmsDetails;

*/
}
