import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Table } from "antd";
import moment from "moment";
import { getOrgnizationAssesmentDetails } from "../../../actions";

const TechnicalAssesmentDetails = props => {
  const user = useSelector(state => state.userAuth);
  const AuthToken = user.Authorization;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
          props.match.params.id,
          AuthToken
        );
        // console.log(response.data.result);
        setData(response.data.result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    callDetailsApi();
  }, [props.match.params.id]);

  return (
    <div>
      <Card
        title={<div className="card-title">Organisation Assesment List</div>}
        style={{ borderRadius: "5px" }}
        bodyStyle={{ borderRadius: "5px" }}
      >
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

export default TechnicalAssesmentDetails;
