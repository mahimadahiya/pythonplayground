import React from "react";
import { connect } from "react-redux";
import { Card, Form, Descriptions, Input, Drawer, Row, Col } from "antd";

import { fetchQuestionDetail, updateQuestion } from "../../../actions";
import MButton from "../../Elements/MButton";
import Region from "../../Elements/Region";
import State from "../../Elements/State";
import Complexity from "../../Elements/Complexity";
import ContentComplexityLevel from "../../Elements/ContentComplexityLevel";

class QuestionEdit extends React.Component {
  state = {
    quiz_type: "",
    loading: true,
    regions: [],
    states: [],
    complexity: null,
    levels: []
  };
  componentWillMount = async () => {
    this.props.heading("Update Question");
    await this.props.fetchQuestionDetail(
      this.props.match.params.id,
      this.props.user.Authorization
    );
    this.props.form.setFieldsValue({
      text: this.props.question.question.text,
      keywords: this.props.question.question.keywords,
      article: this.props.question.question.article_id
    });
    this.setState({
      loading: false,
      complexity: this.props.question.question.complexity
    });
  };

  onStatusChange = value => {
    this.setState({ quiz_type: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, formProps) => {
      if (!err) {
        const values = {
          ...formProps,
          regions: JSON.stringify(this.state.regions),
          states: JSON.stringify(this.state.states),
          complexity: this.state.complexity,
          contentcomplexitylevels: JSON.stringify(this.state.levels)
        };
        this.props.updateQuestion(
          this.props.match.params.id,
          this.props.user.Authorization,
          values
        );
      }
    });
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

  onChangeComplexity = val => {
    this.setState({ complexity: val });
  };

  onChangeLevel = val => {
    this.setState({ levels: val });
  };

  renderFormItems = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form.Item label="Text">
          {getFieldDecorator("text")(<Input placeholder="Enter text" />)}
        </Form.Item>
        <Form.Item label="Keywords">
          {getFieldDecorator("keywords")(
            <Input placeholder="Enter keywords separated by commas" />
          )}
        </Form.Item>
        <Form.Item label="Article">
          {getFieldDecorator("article")(
            <Input placeholder="Enter article" type="number" />
          )}
        </Form.Item>
        <Region mode="multiple" onChange={this.onChangeRegion} />
        <Row>
          <Col>
            <State
              mode="multiple"
              regions={this.state.regions}
              onChange={this.onChangeState}
            />
          </Col>
          <Col>
            <Complexity
              onChange={this.onChangeComplexity}
              value={this.state.complexity}
            />
          </Col>
        </Row>
        <ContentComplexityLevel onChange={this.onChangeLevel} mode="multiple" />
        <Form.Item>
          <MButton>Update Question</MButton>
        </Form.Item>
      </div>
    );
  };

  render() {
    return (
      <div style={{}}>
        <Card title="Edit Question">
          <Card loading={this.state.loading}>
            {this.renderQuestionDescription()}
          </Card>
          <Card title="Update">
            <Form onSubmit={this.onSubmit}>{this.renderFormItems()}</Form>
          </Card>
        </Card>
        {/* <Drawer
          placement="right"
          visible={true}
          closable={false}
          zIndex={0}
          mask={false}
        /> */}
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
