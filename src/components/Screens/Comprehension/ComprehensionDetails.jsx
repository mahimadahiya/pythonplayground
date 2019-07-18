import React, { useState } from "react";
import { fetchComprehensionDetail } from "../../../actions";
import { Card, Button, Modal, Descriptions, Steps, Form } from "antd";
import { useFetchComprehensionDetail } from "../../hooks/Comprehension/";
import AddQuestion from "../Questions/AddQuestion"

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
      <Descriptions.Item label="Media URL">{url}</Descriptions.Item>
      <Descriptions.Item label="Media Type">{type}</Descriptions.Item>
      <Descriptions.Item label="Status">{status}</Descriptions.Item>
      <Descriptions.Item label="Complexity">{complexity}</Descriptions.Item>
      <Descriptions.Item label="Created At">{created_at}</Descriptions.Item>
    </Descriptions>
  );
};

const renderQuestionSteppedForm = (currentStep, setCurrentStep) => {
  const steps = [
    {
      title: "Add Question",
      content: <AddQuestion/>
    },
    {
      title: "Parameters",
      content: <div>Set question details</div>
    },
    {
      title: "Tags",
      content: <div>enter choices</div>
    }
  ];
  return (
    <div>
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form>
        <div>{steps[currentStep].content}</div>
      </Form>
      <div className="steps-action">
        {currentStep < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <div>
            <Button type="primary" onClick={this.onSubmit}>
              Submit
            </Button>
          </div>
        )}
        {currentStep > 0 && (
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

const ComprehensionDetail = props => {
  console.log(props);
  const comprehensionDetails = useFetchComprehensionDetail(
    props.match.params.id
  );
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  console.log(comprehensionDetails);
  return (
    <div>
      <Card title="Comprehension Details">
        {comprehensionDetails &&
          renderComprehensionDescription(comprehensionDetails.comprehension)}
        <Button onClick={() => setShowModal(true)}>Show Modal </Button>
      </Card>
      <Modal
        title="Add Question"
        visible={showModal}
        onOk={() => {
          setShowModal(false);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
        width="1000px"
      >
        {renderQuestionSteppedForm(currentStep, setCurrentStep)}
      </Modal>
    </div>
  );
};

export default ComprehensionDetail;
