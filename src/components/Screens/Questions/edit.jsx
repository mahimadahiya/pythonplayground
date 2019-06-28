import React from "react";
import { connect } from "react-redux";
import { Card, Select, Form, Descriptions, Input } from "antd";

import { fetchQuestionDetail, updateQuestion } from "../../../actions";
import MButton from "../../Elements/MButton";
import Region from "../../Elements/Region";
import State from "../../Elements/State";

class QuestionEdit extends React.Component {
  state = { quiz_type: "", loading: true, regions: [], states: [] };
  componentWillMount = async () => {
    await this.props.fetchQuestionDetail(
      this.props.match.params.id,
      this.props.user.Authorization
    );
    this.setState({ loading: false });
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
          <Descriptions.Item label="Text" span="3">
            {text}
          </Descriptions.Item>
        </Descriptions>
      );
    }
  };

  onChangeRegion = val => {
    this.setState({ regions: val });
  };

  onChangeState = val => {
    this.setState({ states: val });
  };

  renderFormItems = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form.Item label="Text">
          {getFieldDecorator("text", {
            rules: [
              {
                required: true,
                message: "Text is required"
              }
            ]
          })(<Input placeholder="Enter text" />)}
        </Form.Item>
        <Form.Item label="Keywords">
          {getFieldDecorator("keywords", {
            rules: [
              {
                required: true,
                message: "Keywords are required"
              }
            ]
          })(<Input placeholder="Enter keywords separated by commas" />)}
        </Form.Item>
        <Form.Item label="Article">
          {getFieldDecorator("article", {
            rules: [
              {
                required: true,
                message: "Article is required"
              }
            ]
          })(<Input placeholder="Enter article" />)}
        </Form.Item>
        <Region mode="multiple" onChange={this.onChangeRegion} />
        <State
          mode="multiple"
          regions={this.state.regions}
          onChange={this.onChangeState}
        />
        <Form.Item>
          <MButton>Update Question</MButton>
        </Form.Item>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Card title="Edit Question">
          <Card loading={this.state.loading}>
            {this.renderQuestionDescription()}
          </Card>
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
)(Form.create()(QuestionEdit));
