import { Steps } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ArticleUpload from "./Upload";
import ArticleEdit from "./Edit";
import MapCategoriesArticle from "./MapCategoriesArticle";

const { Step } = Steps;

const ArticleCreate = props => {
  const step = useSelector(state => state.article.step);
  const [id, setId] = useState(null);

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

  return (
    <div>
      <Steps current={step}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div
        className="steps-content"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        {steps[step].content}
      </div>
    </div>
  );
};

export default ArticleCreate;
