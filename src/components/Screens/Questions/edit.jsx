import React from "react";
import { connect } from "react-redux";
import {
  Card,
  Select,
  Form,
  Descriptions
} from "antd";

import { fetchQuestionDetail, updateQuestion } from "../../../actions";
import MButton from "../../Elements/MButton";

class QuestionEdit extends React.Component {
  state = { quiz_type: "", loading: true };
  componentWillMount = async () => {
    await this.props.fetchQuestionDetail(
      this.props.match.params.id,
      this.props.user.Authorization
    );
    this.setState({ loading: false })
  };

  onStatusChange = value => {
    this.setState({ quiz_type: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.updateQuestion(
      this.props.match.params.id,
      this.props.user.Authorization,
      this.state
    );
  };

  renderQuestionDescription = () => {
    if (this.props.question.question) {
      const {
        id,
        text,
        media_type,
        media_url,
        status,
        quiz_type,
        flag
      } = this.props.question.question;
      return (
        <Descriptions bordered title="Details" border size="small">
          <Descriptions.Item label="ID">{id}</Descriptions.Item>
          <Descriptions.Item label="Media Type">{media_type}</Descriptions.Item>
          <Descriptions.Item label="Media URL">{media_url}</Descriptions.Item>
          <Descriptions.Item label="Status">{status}</Descriptions.Item>
          <Descriptions.Item label="Quiz Type">{quiz_type}</Descriptions.Item>
          <Descriptions.Item label="Flag">{flag}</Descriptions.Item>
          <Descriptions.Item label="Text" span="3">{text}</Descriptions.Item>
        </Descriptions>
      );
    }
  };

  renderFormItems = () => {
    return (
      <div>
        <Form.Item>
          <Select
            allowClear
            showSearch
            placeholder="Set Question Type"
            onChange={this.onStatusChange}
          >
            <Select.Option key="dd" value="dd">
              Drag and Drop
            </Select.Option>
            <Select.Option key="kp" value="kp">
              Key Phrase
            </Select.Option>
            <Select.Option key="mcq" value="mcq">
              MCQ
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <MButton>Update Question</MButton>
        </Form.Item>
      </div>
    );

  }

  render() {
    return (
      <div>
        <Card title="Edit Question">
          <Card loading={this.state.loading}>{this.renderQuestionDescription()}</Card>
          <Card title="Update">
            <Form onSubmit={this.onSubmit}>{this.renderFormItems()}</Form>
          </Card>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    question: state.question.questionDetail
  };
};

export default connect(
  mapStateToProps,
  { fetchQuestionDetail, updateQuestion }
)(QuestionEdit);
