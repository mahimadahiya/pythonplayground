import React, { useState } from "react";
import { Card, Button, Modal, Descriptions, Table } from "antd";
import { useFetchComprehensionDetail } from "../../hooks/Comprehension/";
import MapComprehensionQuestions from "./MapComprehensionQuestions";

const renderComprehensionDescription = ({
  name,
  status,
  type,
  url,
  complexity,
  created_at
}) => {
  return (
    <Descriptions bordered size="small">
      <Descriptions.Item label="Name">{name}</Descriptions.Item>
      <Descriptions.Item label="Media">
        <a href={url}>View Media</a>
      </Descriptions.Item>
      <Descriptions.Item label="Media Type">{type}</Descriptions.Item>
      <Descriptions.Item label="Status">{status}</Descriptions.Item>
      <Descriptions.Item label="Complexity">{complexity}</Descriptions.Item>
      <Descriptions.Item label="Created At">{created_at}</Descriptions.Item>
    </Descriptions>
  );
};

const ComprehensionDetail = props => {
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      key: "id",
      title: "ID",
      render: record => {
        return record.id;
      }
    },
    {
      key: "text",
      title: "Text",
      render: record => {
        return record.text;
      }
    }
  ];

  const { comprehension, mappedQuestions } = useFetchComprehensionDetail(
    props.match.params.id
  );

  if (comprehension && mappedQuestions && loading) setLoading(false);

  const [showModal, setShowModal] = useState(false);
  return (
    <Card loading={loading}>
      <Card title="Comprehension Details">
        {comprehension &&
          renderComprehensionDescription(comprehension.comprehension)}
        <Button style={{ marginTop: 20 }} onClick={() => setShowModal(true)}>
          Map Questions
        </Button>
      </Card>
      <Card title="Mapped Questions" style={{ marginTop: 25 }}>
        <Table
          rowKey={record => record.id}
          pagination={false}
          columns={columns}
          dataSource={mappedQuestions}
        />
      </Card>
      <Modal
        title="Map Questions"
        visible={showModal}
        footer={null}
        onCancel={() => setShowModal(false)}
        closable={true}
        width="1000px"
      >
        <MapComprehensionQuestions />
      </Modal>
    </Card>
  );
};

export default ComprehensionDetail;
