import React, { Component } from "react";
import { Card, Form, Input, Row, Col, Icon, Switch } from "antd";

class Add extends Component {
  state = {
    type: "text",
    choices1Count: 1,
    choices1: [
      {
        id: 1,
        choice: ""
      }
    ]
  };

  componentDidMount() {
    this.props.heading("MTF Add");
  }

  onSubmit = e => {
    e.preventDefault();
  };

  onTypeChange = (value, i) => {
    let choices1 = [...this.state.choices];
    choices1[i] = { ...choices1[i], type: value === true ? "image" : "text" };
    this.setState({ choices1 });
  };

  onChoiceChange = (e, i) => {
    let choices1 = [...this.state.choices1];
    choices1[i] = { ...choices1[i], choice: e.target.value };
    this.setState({ choices1 });
  };

  onAddChoice = () => {
    this.setState({
      choices1Count: this.state.choices1Count + 1,
      choices1: [
        ...this.state.choices1,
        {
          id: this.state.choices1Count + 1,
          value: "",
          type: "text"
        }
      ]
    });
  };

  createColumn1 = () => {
    return this.state.choices1.map((col, i) => {
      return (
        <div key={i}>
          <Row>
            <Col span={2} style={{ fontSize: 18 }}>
              <strong>ID:</strong> {this.state.choices1[i].id}
            </Col>
            <Col span={2}>
              <Switch
                unCheckedChildren="Text"
                checkedChildren="Image"
                onChange={value => this.onTypeChange(value, i)}
              />
            </Col>
            <Col span={18}>
              <Input
                placeholder="Enter choice"
                onChange={e => this.onChoiceChange(e, i)}
                size="large"
              />
            </Col>
            <Col span={2}>
              <div onClick={this.onAddChoice}>
                <Icon
                  type="plus-circle"
                  theme="twoTone"
                  style={{ marginLeft: 15, fontSize: 35 }}
                />
              </div>
            </Col>
          </Row>
        </div>
      );
    });
  };

  render() {
    console.log(this.state);
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        <Card>
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="Text">
              {getFieldDecorator("text", {
                rules: [{ required: true, message: "Please enter text" }]
              })(<Input placeholder="Enter text" size="large" />)}
            </Form.Item>
            <Form.Item label="Column 1">{this.createColumn1()}</Form.Item>
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}

export default Form.create()(Add);
