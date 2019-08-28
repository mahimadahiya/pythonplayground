import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Card, Row, message, Col, Button } from "antd";
import { mapTrait, fetchOptionsList } from "../../../actions";
import Traits from "../../Elements/Traits";

const MapTraitsType2 = props => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(true);
  const [choices, setChoices] = useState({});

  const user = useSelector(state => state.userAuth);
  const options = useSelector(state => state.trait.options);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchList = () => {
      dispatch(fetchOptionsList(user.Authorization));
    };
    if (filter) {
      fetchList();
      setFilter(false);
    }
  }, [user, filter, dispatch]);

  if (options.length > 0 && list.length === 0) {
    setLoading(false);
    setList(options);
  }

  const onTraitSelect = async (traitId, choice, id) => {
    const newChoices = choices;
    if (newChoices[id] === undefined || newChoices[id] === null) {
      newChoices[id] = [];
    }
    newChoices[id] = [
      ...newChoices[id],
      {
        option_id: choice,
        trait_id: traitId
      }
    ];
    setChoices(newChoices);
  };

  const onSubmit = async id => {
    const values = {
      id,
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
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
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
                onChange={value => onTraitSelect(value, "a", record.id)}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              Choice 2:
              <Traits
                loading={loading}
                style={{ width: "70%", marginLeft: 10 }}
                onChange={value => onTraitSelect(value, "b", record.id)}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              Choice 3:
              <Traits
                loading={loading}
                style={{ width: "70%", marginLeft: 10 }}
                onChange={value => onTraitSelect(value, "c", record.id)}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              Choice 4:
              <Traits
                loading={loading}
                style={{ width: "70%", marginLeft: 10 }}
                onChange={value => onTraitSelect(value, "d", record.id)}
              />
            </div>
          </Col>
          <Col span={4}>
            <Button onClick={() => onSubmit(record.id)}>Submit</Button>
          </Col>
        </Row>
      )
    }
  ];

  return (
    <div>
      <Card title={<div className="card-title">Options List</div>}>
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
