import React from "react";
import { connect } from "react-redux";
import { Descriptions, Card, List, Row, Col, Divider } from "antd";
import { fetchQuestionDetail } from "../../../actions";

const getQuestionDetails = async (id, user, fetchQuestionDetail) => {
  await fetchQuestionDetail(id, user);
};

const renderCategories = categories => {
  return categories.map(category => {
    return (
      <List.Item key={category.category_id}>
        <strong>{category.category_id}</strong>
        <Divider type="vertical" /> {category.category__name}
      </List.Item>
    );
  });
};

const renderParameters = parameters => {
  return parameters.map(parameter => {
    return (
      <List.Item key={parameter.parameter_id}>
        <strong>{parameter.parameter_id}</strong>
        <Divider type="vertical" /> {parameter.parameter__name}
      </List.Item>
    );
  });
};

const renderTags = tags => {
  return tags.map(tag => {
    return (
      <List.Item key={tag.tag_id}>
        <strong>{tag.tag_id}</strong>
        <Divider type="vertical" /> {tag.tag__name}
      </List.Item>
    );
  });
};

const QuestionDetails = props => {
  const id = props.match.params.id;
  React.useEffect(() => {
    getQuestionDetails(id, props.user.Authorization, props.fetchQuestionDetail);
  }, [id, props.user, props.fetchQuestionDetail]);

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
        <Card title={<div className="card-title">Question Details</div>}>
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
          <Row style={{ marginTop: 20 }}>
            <Col span={8}>
              <List header={<h2>Categories</h2>}>
                {renderCategories(props.question.categories)}
              </List>
            </Col>
            <Col span={8}>
              <List header={<h2>Parameters</h2>}>
                {renderParameters(props.question.parameters)}
              </List>
            </Col>
            <Col span={8}>
              <List header={<h2>Tags</h2>}>
                {renderTags(props.question.tags)}
              </List>
            </Col>
          </Row>
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
