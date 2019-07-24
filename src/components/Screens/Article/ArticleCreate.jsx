import { Steps } from "antd";
import React, { useState, useEffect } from "react";
import ArticleUpload from "./Upload";
import ArticleEdit from "./Edit";
import MapCategoriesArticle from "./MapCategoriesArticle";

const { Step } = Steps;

const ArticleCreate = props => {
  const [current, setStep] = useState(0);
  const [id, setId] = useState(null);
  useEffect(() => {
    if (current !== props.step) setStep(props.step);
  }, []);
  const steps = [
    {
      title: "Create",
      content: <ArticleUpload setId={setId} setStep={setStep} />
    },
    {
      title: "Edit",
      content: <ArticleEdit id={id || props.id} setStep={setStep} />
    },
    {
      title: "Map",
      content: <MapCategoriesArticle id={id || props.id} />
    }
  ];
  
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
    </div>
  );
};

export default ArticleCreate;
