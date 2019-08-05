import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Card, Row, message, Col, Button } from "antd";
import { fetchTraitsQuestionsList, mapTrait } from "../../../actions";
import Traits from "../../Elements/Traits";

const MapTraitsType2 = props => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(true);
  const [choices, setChoices] = useState({});

  const user = useSelector(state => state.userAuth);
  const traits = useSelector(state => state.trait.traits);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const list = await fetchTraitsQuestionsList(user.Authorization, props.id);
      console.log(traits);
      setList(list);
    };
    if (traits.length > 0) {
      setLoading(false);
    }
    if (filter) {
      fetchList();
      setFilter(false);
    }
  }, [user, filter, traits.length]);

  const onTraitSelect = async (traitId, choice, questionId) => {
    const newChoices = choices;
    if (
      newChoices[questionId] === undefined ||
      newChoices[questionId] === null
    ) {
      newChoices[questionId] = [];
    }
    newChoices[questionId] = [
      ...newChoices[questionId],
      {
        option_id: choice,
        trait_id: traitId
      }
    ];
    setChoices(newChoices);
  };

  const onSubmit = async id => {
    const values = {
      question_id: id,
      trait_options: JSON.stringify(choices[id])
    };
    await mapTrait(user.Authorization, {
      type: 2,
      ...values
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
      width: "50%",
      render: text => {
        return <div style={{ minHeight: "60px" }}>{text}</div>;
      }
    },
    {
      title: "Choices",
      key: "action",
      width: "40%",
      render: record => (
        <Row>
          <Col span={20}>
            <div style={{ marginBottom: 5 }}>
              Choice 1:
              <Traits
                loading={loading}
                style={{ width: "70%", marginLeft: 10 }}
                onChange={value =>
                  onTraitSelect(value, "a", record.question_id)
                }
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              Choice 2:
              <Traits
                loading={loading}
                style={{ width: "70%", marginLeft: 10 }}
                onChange={value =>
                  onTraitSelect(value, "b", record.question_id)
                }
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              Choice 3:
              <Traits
                loading={loading}
                style={{ width: "70%", marginLeft: 10 }}
                onChange={value =>
                  onTraitSelect(value, "c", record.question_id)
                }
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              Choice 4:
              <Traits
                loading={loading}
                style={{ width: "70%", marginLeft: 10 }}
                onChange={value =>
                  onTraitSelect(value, "d", record.question_id)
                }
              />
            </div>
          </Col>
          <Col span={4}>
            <Button onClick={() => onSubmit(record.question_id)}>Submit</Button>
          </Col>
        </Row>
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
export default MapTraitsType2;
