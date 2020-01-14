import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Select,
  Divider,
  Popconfirm,
  message,
  Modal
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { wyrSeriesList } from "../../../../actions";

const SeriesIndex = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);
  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    const callData = async () => {
      setLoading(true);
      try {
        const response = await wyrSeriesList(user.Authorization);
        // console.log(response.data.result.wyr_series_list);
        setSeriesList(response.data.result.wyr_series_list);
      } catch (error) {}
      setLoading(false);
    };
    callData();
  }, [user]);
  //console.log(series);

  //TABLE COLUMN START
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
      title: "Series",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        // return <div>{record === 1 ? "Draft" : "Live"}</div>;
        return (
          <div>
            {text === 1 ? (
              <Button.Group>
                <Button
                  style={{
                    color: "#fff",
                    background: "red",
                    border: "1px solid red"
                  }}
                >
                  Draft
                </Button>
                <Popconfirm
                  title="Are you sure you want to change status to Live ?"
                  okText="Yes"
                  cancelText="No"
                  //  onConfirm={() => changeCurrentActionStatus(record)}
                >
                  <Button
                    style={{
                      color: "green",
                      background: "#fff",
                      border: "1px solid green"
                    }}
                  >
                    Live
                  </Button>
                </Popconfirm>
              </Button.Group>
            ) : (
              <Button.Group>
                <Popconfirm
                  title="Are you sure you want to change status to Draft ?"
                  okText="Yes"
                  cancelText="No"
                  //  onConfirm={() => changeCurrentActionStatus(record)}
                >
                  <Button
                    style={{
                      color: "red",
                      background: "#fff",
                      border: "1px solid red"
                    }}
                  >
                    Draft
                  </Button>
                </Popconfirm>
                <Button
                  style={{
                    color: "#fff",
                    background: "green",
                    border: "1px solid green"
                  }}
                >
                  Live
                </Button>
              </Button.Group>
            )}
          </div>
        );
      }
    },
    {
      title: "Actions",
      key: "action",
      render: record => (
        <span>
          {/* 
          selectedTechnicalId === 1 ? (
            <span>
              <Button
                type="link"
                //onClick={() => onMappingParameters(record)}
                style={{ padding: 0, marginRight: "10px" }}
              >
                Map Parameters
              </Button>
              <Divider type="vertical" />
            </span>
          ) : (
            <span>
              <Button
                type="link"
                // onClick={() => onMappingCourses(record)}
                style={{ padding: 0, marginRight: "10px" }}
              >
                Map Courses
              </Button>
              <Divider type="vertical" />
            </span>
          )
        */}

          <Divider type="vertical" />
          <Button
            type="link"
            // onClick={() => onEdit(record)}
            style={{ padding: 0, marginRight: "10px" }}
          >
            Update
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure you want to delete ?"
            okText="Yes"
            cancelText="No"
            // onConfirm={() => onDelete(record)}
          >
            <Button
              type="link"
              style={{ color: "red", padding: 0, marginRight: "10px" }}
            >
              Delete
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ];

  //TABLE COLUMN ENDS

  return (
    <div>
      <Card
        style={{ borderRadius: "5px" }}
        bodyStyle={{ borderRadius: "5px" }}
        title={<span style={{ fontSize: "20px" }}>SERIES</span>}
      >
        <div style={{ textAlign: "right", marginBottom: "40px" }}>
          <Button
            type="primary"
            // onClick={() => createNew()}
          >
            Create New Series
          </Button>
        </div>
        <div>
          <Table
            loading={loading}
            dataSource={seriesList}
            columns={columnName}
            rowKey={row => row.id}
            pagination={false}
          />
        </div>
      </Card>
    </div>
  );
};

export default SeriesIndex;
