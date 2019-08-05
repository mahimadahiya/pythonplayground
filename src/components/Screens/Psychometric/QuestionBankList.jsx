import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Card, Row, Modal, Button } from "antd";
import { fetchQuestionBankList } from "../../../actions";
import MapTraitsType1 from "./MapTraitsType1";
import MapTraitsType2 from "./MapTraitsType2";

const QuestionBankList = props => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);

  const user = useSelector(state => state.userAuth);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const list = await fetchQuestionBankList(user.Authorization);
      setList(list);
      setLoading(false);
    };
    if (filter) {
      fetchList();
      setFilter(false);
    }
  }, [user, filter]);

  const column = [
    {
      title: "ID",
      dataIndex: "question_bank_id",
      key: "question_bank_id"
    },
    {
      title: "Description",
      dataIndex: "question_bank__description",
      key: "question_bank__description",
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
          <Button
            type="link"
            onClick={() => {
              setId(record.question_bank_id);
              setShowModal(true);
            }}
          >
            Map Traits
          </Button>
        </span>
      )
    }
  ];

  const onCloseModal = () => {
    setShowModal(false);
    setId(null);
    setFilter(true);
  };

  return (
    <div>
      <Card title={<div className="card-title">Question Bank List</div>}>
        <Row>
          <Table
            loading={loading}
            dataSource={list}
            columns={column}
            rowKey={row => row.question_bank_id}
          />
        </Row>
      </Card>
      <Modal
        title="Map Traits"
        visible={showModal}
        footer={null}
        destroyOnClose={true}
        onCancel={onCloseModal}
        closable={true}
        width="90%"
      >
        {props.type === 1 ? (
          <MapTraitsType1 id={id} />
        ) : (
          <MapTraitsType2 id={id} />
        )}
      </Modal>
    </div>
  );
};
export default QuestionBankList;
