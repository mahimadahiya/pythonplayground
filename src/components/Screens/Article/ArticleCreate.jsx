import { Steps, Button } from "antd";
import React, { useState, useEffect } from "react";
import ArticleUpload from "./Upload";
import ArticleEdit from "./Edit";
import MapCategoriesArticle from "./MapCategoriesArticle";

const { Step } = Steps;

const ArticleCreate = props => {
  const [current, setStep] = useState(0);
  const [id, setId] = useState(null);
  useEffect(() => {
    console.log(props.step);
    if (current !== props.step) setStep(props.step);
  }, []);
  const steps = [
    {
      title: "Create",
      content: <ArticleUpload setId={setId} />
    },
    {
      title: "Edit",
      content: <ArticleEdit id={id || props.id} />
    },
    {
      title: "Map",
      content: <MapCategoriesArticle id={id || props.id} />
    }
  ];

  const next = () => {
    setStep(current + 1);
  };

  return (
    <div>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div
        className="steps-content"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        {steps[current].content}
      </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default ArticleCreate;
