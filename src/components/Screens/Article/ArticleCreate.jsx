import { Steps, Button, message } from "antd";
import React, { useState } from "react";
import ArticleUpload from "./Upload";

const { Step } = Steps;

const ArticleCreate = props => {
  const [current, setStep] = useState(0);
  const [id, setId] = useState(null);
  
  const steps = [
    {
      title: "Create",
      content: <ArticleUpload setId={setId} />
    },
    {
      title: "Second",
      content: "Second-content"
    },
    {
      title: "Last",
      content: "Last-content"
    }
  ];

  const next = () => {
    setStep(current + 1);
  };

  const prev = () => {
    setStep(current - 1);
  };

  return (
    <div>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ marginLeft: 8 }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default ArticleCreate;
