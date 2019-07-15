import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card, Row, Col, Input } from "antd";
import Complexity from "../../Elements/Complexity";
import Gender from "../../Elements/Gender";
import history from "../../../history";
import MButton from "../../Elements/MButton";
import {
  updateComprehension,
  fetchComprehensionDetail
} from "../../../actions";

class ComprehensionEdit extends Component {
  state = {
    complexity: null,
    gender: null,
    loading: true
  };

  async componentDidMount() {
    await this.props.fetchComprehensionDetail(
      this.props.match.params.id,
      this.props.user.Authorization
    );
    const comprehension = this.props.comprehensionDetail.comprehension;
    this.setState({
      complexity: comprehension.complexity,
      gender: comprehension.gender,
      loading: false
    });
    this.props.form.setFieldsValue({
      name: comprehension.name
    });
  }

  onSubmit = e => {
    e.preventDefault();
  };

  onChangeComplexity = val => {
    this.setState({ complexity: val });
  };

  onChangeGender = val => {
    this.setState({ gender: val });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, formProps) => {
      if (!err) {
        const values = {
          complexity: this.state.complexity,
          gender: this.state.gender,
          name: formProps.name
        };
        await this.props.updateComprehension(
          this.props.match.params.id,
          this.props.user.Authorization,
          values
        );
        history.push("/comprehension/map/" + this.props.match.params.id);
      } else {
        console.log(err);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Card
          loading={this.state.loading}
          title={<div className="card-title">Edit Comprehension</div>}
        >
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "Name is required" }]
              })(<Input placeholder="Name" />)}
            </Form.Item>
            <Row gutter={48}>
              <Col span={8}>
                <Complexity
                  onChange={this.onChangeComplexity}
                  value={this.state.complexity}
                />
              </Col>
              <Col span={8}>
                <Gender
                  onChange={this.onChangeGender}
                  value={this.state.gender}
                />
              </Col>
            </Row>
            <MButton>Submit</MButton>
          </Form>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    comprehensionDetail: state.comprehension.comprehensionDetail
  };
};

export default connect(
  mapStateToProps,
  { updateComprehension, fetchComprehensionDetail }
)(Form.create()(ComprehensionEdit));
