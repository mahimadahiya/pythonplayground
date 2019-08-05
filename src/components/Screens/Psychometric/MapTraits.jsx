import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Card, Row, Modal, Button, Form } from "antd";
import { fetchTraitsQuestionsList } from "../../../actions";
import Traits from "../../Elements/Traits";

const MapTraits = props => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(true);

  const user = useSelector(state => state.userAuth);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const list = await fetchTraitsQuestionsList(user.Authorization, props.id);
      setList(list);
      setLoading(false);
    };
    if (filter) {
      fetchList();
      setFilter(false);
    }
  }, [user, filter]);

  const onTraitSelect = (traitId, questionId) => {};

  const column = [
    {
      title: "ID",
      dataIndex: "question_id",
      key: "question_id"
    },
    {
      title: "Text",
      dataIndex: "question__text",
      key: "question__text",
      width: "60%",
      render: text => {
        return <div style={{ minHeight: "60px" }}>{text}</div>;
      }
    },
    {
      title: "Actions",
      key: "action",
      width: 360,
      render: record => (
        <span>
          <Traits
            style={{ width: "80%" }}
            onChange={value => onTraitSelect(value, record.id)}
          />
        </span>
      )
    }
  ];

  return (
    <div>
      <Card title={<div className="card-title">Questions List</div>}>
        <Row>
          <Table
            loading={loading}
            dataSource={list}
            columns={column}
            rowKey={row => row.question_id}
          />
        </Row>
      </Card>
    </div>
  );
};
export default MapTraits;
