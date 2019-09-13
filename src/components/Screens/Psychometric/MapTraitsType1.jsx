import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Card, Row, message } from "antd";
import { fetchTraitsQuestionsList, mapTrait } from "../../../actions";
import Traits from "../../Elements/Traits";

const MapTraitsType1 = props => {
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
  }, [user, filter, props.id]);

  const onTraitSelect = async (traitId, questionId) => {
    await mapTrait(user.Authorization, {
      type: 1,
      trait_id: traitId,
      question_id: questionId
    });
    message.success("Mapped successfully");
  };

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
      title: "Map Trait",
      key: "action",
      width: 360,
      render: record => (
        <span>
          <Traits
            style={{ width: "80%" }}
            onChange={value => onTraitSelect(value, record.question_id)}
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
export default MapTraitsType1;
