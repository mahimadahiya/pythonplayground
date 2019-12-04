import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getTechnicalAssesmentList } from "../../../actions";
import { Card, Table } from "antd";

const CmsIndex = () => {
  const user = useSelector(state => state.userAuth);
  const AuthToken = user.Authorization;
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const callTechAssListApi = async () => {
      setLoading(true);
      try {
        const response = await getTechnicalAssesmentList(AuthToken);
        setTableData(response.data.result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    callTechAssListApi();
  }, [AuthToken]);

  const columnName = [
    {
      title: "ID",
      // dataIndex: "id",
      key: "id",
      render: record => {
        return (
          <div>
            {record.id === null ||
            record.id === "" ||
            record.id === undefined ? (
              "-"
            ) : (
              <a
              //onClick={() => onDetailsPageClick(record)}
              // href={`/techAss/detail/${record.id}`}
              >
                {record.id}
              </a>
            )}
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
      <Card
        title={<div className="card-title">Cms List</div>}
        style={{ borderRadius: "5px" }}
        bodyStyle={{ borderRadius: "5px" }}
      >
        <div style={{ margin: "40px 0px", textAlign: "center" }}>
          <Table
            loading={loading}
            dataSource={tableData}
            columns={columnName}
            rowKey={row => row.id}
            pagination={true}
          />
        </div>
      </Card>
    </div>
  );
};

export default CmsIndex;
