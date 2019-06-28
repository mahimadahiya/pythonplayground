import React from "react";
import { connect } from "react-redux";
import { Descriptions, Card } from "antd";

const QuestionDetails = props => {
  if (props.question.question) {
    const {
      id,
      text,
      media_type,
      media_url,
      status,
      quiz_type,
      flag
    } = props.question.question;
    return (
      <div>
        <Card>
          <Descriptions bordered title="Details" border size="small">
            <Descriptions.Item label="ID">{id}</Descriptions.Item>
            <Descriptions.Item label="Media Type">
              {media_type}
            </Descriptions.Item>
            <Descriptions.Item label="Media URL">{media_url}</Descriptions.Item>
            <Descriptions.Item label="Status">{status}</Descriptions.Item>
            <Descriptions.Item label="Quiz Type">{quiz_type}</Descriptions.Item>
            <Descriptions.Item label="Flag">{flag}</Descriptions.Item>
            <Descriptions.Item label="Text" span="3">
              {text}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    );
  } else {
    return <div />;
  }
};

const mapStateToProps = state => {
  return {
    question: state.question.questionDetail
  };
};

export default connect(mapStateToProps)(QuestionDetails);
