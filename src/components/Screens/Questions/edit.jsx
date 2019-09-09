import React from "react";
import { connect } from "react-redux";
import {
  Card,
  Form,
  Descriptions,
  Input,
  Row,
  Col,
  Select,
  message
} from "antd";

import {
  fetchQuestionDetail,
  updateQuestion,
  fetchAllComprehensions
} from "../../../actions";
import MButton from "../../Elements/MButton";
import Region from "../../Elements/Region";
import State from "../../Elements/State";
import Complexity from "../../Elements/Complexity";
import ContentComplexityLevel from "../../Elements/ContentComplexityLevel";
import history from "../../../history";

class QuestionEdit extends React.Component {
  state = {
    quiz_type: "",
    loading: true,
    regions: [],
    states: [],
    list: [],
    complexity: null,
    levels: [],
    comprehension_id: null
  };
  componentWillMount = async () => {
    await this.props.fetchAllComprehensions(this.props.user.Authorization);
    await this.props.fetchQuestionDetail(
      this.props.match.params.id,
      this.props.user.Authorization
    );
    await this.props.form.setFieldsValue({
      text: this.props.question.question.text,
      keywords: this.props.question.question.keywords,
      article: this.props.question.question.article_id,
      comments: this.props.question.question.comments
    });
    this.setState({
      loading: false,
      complexity: this.props.question.question.complexity,
      list: this.props.full_list,
      comprehension_id: this.props.question.question.comprehension_id
    });
  };

  onStatusChange = value => {
    this.setState({ quiz_type: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, formProps) => {
      if (!err) {
        const values = {
          text: formProps.text,
          keywords: formProps.keywords,
          comments: formProps.comments,
          article: formProps.article,
          regions: JSON.stringify(this.state.regions),
          states: JSON.stringify(this.state.states),
          complexity: this.state.complexity,
          contentcomplexitylevels: JSON.stringify(this.state.levels),
          comprehension_id: this.state.comprehension_id
        };
        await this.props.updateQuestion(
          this.props.match.params.id,
          this.props.user.Authorization,
          values
        );
        message.success("Updated successfully");
        history.push("/question/map/choices/" + this.props.match.params.id);
      }
    });
  };

  renderQuestionDescription = () => {
    if (this.props.question) {
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

  renderComprehensions = () => {
    return this.state.list.map(item => (
      <Select.Option value={item.id} key={item.id}>
        {item.name}
      </Select.Option>
    ));
  };

  filterComprehensions = (val, option) => {
    const filteredList = this.state.list.filter(({ name }) => {
      if (
        name.toLowerCase().includes(val) ||
        option.key.toString().includes(val)
      ) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].id.toString() === option.key.toString()) return true;
    }
    return false;
  };

  onComprehensionSelect = value => {
    this.setState({ comprehension_id: value });
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
        <Form.Item label="Comments">
          {getFieldDecorator("comments")(
            <Input placeholder="Enter comments" />
          )}
        </Form.Item>
        <Form.Item label="Article">
          {getFieldDecorator("article")(
            <Input placeholder="Enter article" type="number" />
          )}
        </Form.Item>
        <Row gutter={48}>
          <Col span={7}>
            <Form.Item label="Region">
              {getFieldDecorator("region")(
                <Region mode="multiple" onChange={this.onChangeRegion} />
              )}
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="State">
              {getFieldDecorator("state")(
                <State
                  mode="multiple"
                  regions={this.state.regions}
                  onChange={this.onChangeState}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Complexity">
              {getFieldDecorator("complexity", {
                initialValue: this.state.complexity
              })(<Complexity onChange={this.onChangeComplexity} />)}
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Comprehension ID">
              <Select
                placeholder="Select comprehension"
                showSearch
                value={this.state.comprehension_id}
                onChange={this.onComprehensionSelect}
                filterOption={this.filterComprehensions}
              >
                {this.state.list.length !== 0
                  ? this.renderComprehensions()
                  : null}
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <ContentComplexityLevel
              onChange={this.onChangeLevel}
              mode="multiple"
            />
          </Col>
        </Row>
        <Form.Item>
          <MButton>Update Question</MButton>
        </Form.Item>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Card
          title={<div className="card-title">Update Question</div>}
          loading={this.state.loading}
        >
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
    question: state.question.questionDetail,
    full_list: state.comprehension.full_list
  };
};

export default connect(
  mapStateToProps,
  { fetchQuestionDetail, updateQuestion, fetchAllComprehensions }
)(Form.create()(QuestionEdit));
