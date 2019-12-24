import React, { useState, useEffect } from "react";
import { Table, Card } from "antd";

const MappedActivityDetails = props => {
  const selectedActivityDetails = props.selectedActivityDetails;

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTableData(selectedActivityDetails.mapped_entity);
    setLoading(false);
  }, [selectedActivityDetails]);

  const renderColumns = selectedActivityDetails => {
    switch (selectedActivityDetails.activity__slug) {
      case "simulation":
        return [
          {
            title: "Id",
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
            title: "Text",
            dataIndex: "text",
            key: "text",
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
      case "game":
        return [
          {
            title: "Id",
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
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
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
            title: "Attempt",
            dataIndex: "n_attempt",
            key: "n_attempt",
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
      case "article":
        return [
          {
            title: "Id",
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
      default:
        return null;
    }
  };

  return (
    <div>
      <Card
        bodyStyle={{ padding: 0, fontSize: "15px" }}
        // loading={mappedActivityLoading}
        bordered={false}
      >
        <Table
          loading={loading}
          dataSource={tableData}
          columns={renderColumns(selectedActivityDetails)}
          rowKey={row => row.id}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default MappedActivityDetails;
