import React, { useState, useEffect } from "react";
import {rolePlayList} from "../../../actions";
import { useSelector, useDispatch } from "react-redux";
import {
    Table,
    Card,
    Pagination,
    Row,
    Button,
  } from "antd";
import moment from "moment";

const RolePlay = () => {
    const [loading, setLoading] = useState(true);
    const [List,setList] = useState([]);
    const user = useSelector(state => state.userAuth);

    useEffect(() => {
        const fetchList = async() => {
            setLoading(true);
            const response = await rolePlayList(user.Authorization);
            console.log(response);
            setList(response);
        }
        fetchList()
        
    },[]);


    const column = [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          render: id => {
            return <a href={``}>{id}</a>;
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
        
      ];



  return (
    <div>
             <Card
        style={{ marginTop: 20 }}
        title={<div className="card-title">Role-Play List</div>}
      >
        <Row style={{ marginBottom: 20 }}>
          <Button
            shape="round"
            type="primary"
            onClick={() => {
              
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
            pagination={false}
          />
        </Row>
      
      </Card>

    </div>
  );
};
export default RolePlay;
