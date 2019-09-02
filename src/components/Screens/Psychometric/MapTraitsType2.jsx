import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Card, Row, message } from "antd";
import { fetchOptionsList, mapOption } from "../../../actions";
import Traits from "../../Elements/Traits";

const MapTraitsType2 = props => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(true);

  const user = useSelector(state => state.userAuth);
  const options = useSelector(state => state.trait.options);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchList = () => {
      setLoading(true);
      dispatch(fetchOptionsList(user.Authorization, props.id));
    };
    if (filter) {
      fetchList();
      setFilter(false);
    }
  }, [user, filter, props.id, dispatch]);

  if (options.length > 0 && list.length === 0) {
    setList(options);
    setLoading(false);
  }

  const onTraitSelect = async (traitId, optionId) => {
    const data = {
      payload: JSON.stringify([{ option_id: optionId, trait_id: traitId }])
    };
    await mapOption(user.Authorization, data);
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
            onChange={value => onTraitSelect(value, record.id)}
          />
        </span>
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
