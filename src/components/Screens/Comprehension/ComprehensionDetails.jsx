import React, { useState } from "react";
import { fetchComprehensionDetail } from "../../../actions";
import { Card, Button, Modal, Descriptions, Steps, Form } from "antd";
import { useFetchComprehensionDetail } from "../../hooks/Comprehension/";
import AddQuestion from "../Questions/AddQuestion";
import MapComprehensionQuestions from "./MapComprehensionQuestions";

const { Step } = Steps;

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
  console.log(props);
  const comprehensionDetails = useFetchComprehensionDetail(
    props.match.params.id
  );
  const [showModal, setShowModal] = useState(false);
  console.log(comprehensionDetails);
  return (
    <div>
      <Card title="Comprehension Details">
        {comprehensionDetails &&
          renderComprehensionDescription(comprehensionDetails.comprehension)}
        <Button style={{ marginTop: 20 }} onClick={() => setShowModal(true)}>
          Map Questions
        </Button>
      </Card>
      <Modal
        title="Map Questions"
        visible={showModal}
        onOk={() => {
          setShowModal(false);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
        width="1000px"
      >
        <MapComprehensionQuestions />
      </Modal>
    </div>
  );
};

export default ComprehensionDetail;
