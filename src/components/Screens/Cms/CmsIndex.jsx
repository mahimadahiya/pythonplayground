{
  /* import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getTechnicalAssesmentList } from "../../../actions";
import { Card, Table, Input } from "antd";
import CmsDetails from "./CmsDetails";

const CmsIndex = () => {
  const user = useSelector(state => state.userAuth);
  const AuthToken = user.Authorization;
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, SetSearch] = useState("");
  const [screenType, setScreenType] = useState("cmsList");
  const [selectedOrganizationData, setSelectedOrganizationData] = useState([]);

  const onSearchInputChange = async e => {
    SetSearch(e.target.value);
  };

  useEffect(() => {
    const callTechAssListApi = async () => {
      setScreenType("cmsList");
      setLoading(true);
      try {
        const response = await getTechnicalAssesmentList(AuthToken, search);
        setTableData(response.data.result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    callTechAssListApi();
  }, [AuthToken, search]);

  const onDetailsPageClick = data => {
    setSelectedOrganizationData(data);
    //console.log(data);
    setScreenType("cmsDetails");
  };

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
                onClick={() => onDetailsPageClick(record)}
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
      {screenType === "cmsList" ? (
        <Card
          title={<div className="card-title">Cms List</div>}
          style={{ borderRadius: "5px" }}
          bodyStyle={{ borderRadius: "5px" }}
        >
          <div>
            <Input
              onChange={onSearchInputChange}
              placeholder="search by id and name"
              style={{
                width: "50%"
              }}
            />
          </div>
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
      ) : null}
      {screenType === "cmsDetails" ? (
        <CmsDetails
          selectedOrganizationData={selectedOrganizationData}
          setScreenType={setScreenType}
        />
      ) : null}
    </div>
  );
};

export default CmsIndex;

*/
}
