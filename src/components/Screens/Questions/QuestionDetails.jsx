import React from "react";
import { connect } from "react-redux";
import { Descriptions, Card } from "antd";
import { fetchQuestionDetail } from "../../../actions";

const getQuestionDetails = async (id, user, fetchQuestionDetail) => {
  await fetchQuestionDetail(id, user);
};

const QuestionDetails = props => {
  const id = props.match.params.id;
  React.useEffect(() => {
    getQuestionDetails(id, props.user.Authorization, props.fetchQuestionDetail);
  }, [id]);

  if (props.question) {
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
    return <Card loading />;
  }
};

const mapStateToProps = state => {
  return {
    question: state.question.questionDetail,
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { fetchQuestionDetail }
)(QuestionDetails);
