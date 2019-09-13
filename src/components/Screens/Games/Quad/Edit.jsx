import React, { Component } from "react";
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Icon,
  Switch,
  Select,
  message,
  Button,
  Upload
} from "antd";
import MButton from "../../../Elements/MButton";
import { editQuad, fetchQuadDetails } from "../../../../actions";
import { connect } from "react-redux";
import history from "../../../../history";

class Edit extends Component {
  state = {
    entity_type: 1,
    entity_id: null,
    choices1: [
      {
        type: "text",
        data: "",
        id: 1
      },
      {
        type: "text",
        data: "",
        id: 2
      },
      {
        type: "text",
        data: "",
        id: 3
      },
      {
        type: "text",
        data: "",
        id: 4
      }
    ],
    choices2Count: 1,
    choices2: [
      {
        type: "text",
        choice: "",
        id: 1
      }
    ],
    answers: [
      {
        choices: null,
        quad_id: 1
      },
      {
        choices: null,
        quad_id: 2
      },
      {
        choices: null,
        quad_id: 3
      },
      {
        choices: null,
        quad_id: 4
      }
    ],
    loading: true,
    status: 1
  };

  async componentDidMount() {
    await this.props.fetchQuadDetails(
      this.props.user.Authorization,
      this.props.match.params.id
    );
    const { quadDetail } = this.props;
    this.props.form.setFieldsValue({
      text: quadDetail.text,
      entity_id: quadDetail.entity_id
    });
    const choices1Count = quadDetail.quadrant_details.length;
    const choices1 = [];
    for (let i = 0; i < choices1Count; i++) {
      choices1.push(quadDetail.quadrant_details[i]);
    }
    const choices2Count = quadDetail.choices.length;
    const choices2 = [];
    for (let i = 0; i < choices2Count; i++) {
      choices2.push(quadDetail.choices[i]);
    }
    const answersCount = quadDetail.answers.length;
    const answers = [];
    for (let i = 0; i < answersCount; i++) {
      answers.push(quadDetail.answers[i]);
    }
    this.setState({
      entity_type: quadDetail.entity_type,
      status: quadDetail.status,
      choices1,
      choices2Count,
      choices2,
      answers,
      loading: false
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, formProps) => {
      const column2 = this.state.choices2.map((choice, i) => {
        return {
          ...choice,
          id: i + 1
        };
      });
      if (!err) {
        const values = {
          ...formProps,
          entity_type: this.state.entity_type,
          quadrant_details: JSON.stringify(this.state.choices1),
          choices: JSON.stringify(column2),
          answers: JSON.stringify(this.state.answers),
          id: this.props.match.params.id,
          status: this.state.status
        };
        this.props.editQuad(this.props.user.Authorization, values);
      }
      history.push("/games/quad");
    });
  };

  onTypeChange = (value, i) => {
    let choices1 = [...this.state.choices1];
    choices1[i] = { ...choices1[i], type: value === true ? "image" : "text" };
    this.setState({ choices1 });
  };

  onTypeChange2 = (value, i) => {
    let choices2 = [...this.state.choices2];
    choices2[i] = { ...choices2[i], type: value === true ? "image" : "text" };
    this.setState({ choices2 });
  };

  onChoiceChange = (e, i) => {
    let choices1 = [...this.state.choices1];
    choices1[i] = { ...choices1[i], data: e.target.value };
    this.setState({ choices1 });
  };

  onChoiceChange2 = (e, i) => {
    let choices2 = [...this.state.choices2];
    choices2[i] = { ...choices2[i], choice: e.target.value };
    this.setState({ choices2 });
  };

  onAddChoice2 = () => {
    this.setState({
      choices2Count: this.state.choices2Count + 1,
      choices2: [
        ...this.state.choices2,
        {
          id: this.state.choices2Count + 1,
          choice: "",
          type: "text"
        }
      ]
    });
  };

  onAnswerChange = (value, id) => {
    let answers = this.state.answers;
    answers[id].choices = value;
    answers[id].quad_id = id + 1;
    this.setState({
      answers
    });
  };

  onDelete2 = id => {
    let choices2 = this.state.choices2;
    choices2 = choices2.filter((choice, i) => {
      return choice.id !== id;
    });

    this.setState({
      choices2,
      choices2Count: this.state.choices2Count - 1
    });
  };

  uploadProps = {
    name: "file",
    data: { folder_name: "choice_media/images/" },

    action: "https://pylearning-api.iaugmentor.com/file_upload/",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMtYXBpLmlhdWdtZW50b3IuY29tL3YxL2F1dGgvc2lnbmluIiwianRpIjoiNmM2OWU2Nzk0NzFmM2RjNmE2OTA1MTc1ZTNlYmU4NTQiLCJleHAiOjE1OTE2OTQzOTEsImlhdCI6MTU2MDEzODU5MSwibmJmIjoxNTYwMTM4NTkxfQ.L1vLFQIhdtW0U1wMlOAkNrjDUOL7zE0Glc2ogRbXhBY",
      key: "TcS99L07QkDezB5n4Qdw"
    },
    accept: ".png,.jpg"
  };

  onUploadChangeChoice1 = (i, info) => {
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      let choices1 = [...this.state.choices1];
      choices1[i] = {
        ...choices1[i],
        data: info.file.response.url
      };
      this.setState({
        choices1
      });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  onUploadChangeChoice2 = (i, info) => {
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      let choices2 = [...this.state.choices2];
      choices2[i] = {
        ...choices2[i],
        choice: info.file.response.url
      };
      this.setState({
        choices2
      });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  createColumn1 = () => {
    return this.state.choices1.map((col, i) => {
      return (
        <div key={i} style={{ marginBottom: 15 }}>
          <Row>
            <Col span={2} style={{ fontSize: 18 }}>
              {this.state.choices1[i].id}
            </Col>
            <Col span={2}>
              <Switch
                unCheckedChildren="Text"
                checkedChildren="Image"
                checked={this.state.choices1[i].type === "image"}
                onChange={value => this.onTypeChange(value, i)}
              />
            </Col>
            <Col span={20}>
              {col.type === "text" ? (
                <Input
                  placeholder="Enter choice"
                  value={col.data}
                  onChange={e => this.onChoiceChange(e, i)}
                  size="large"
                />
              ) : (
                <Upload
                  {...this.uploadProps}
                  onChange={info => this.onUploadChangeChoice1(i, info)}
                >
                  <Button>
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
              )}
            </Col>
          </Row>
        </div>
      );
    });
  };

  createColumn2 = () => {
    return this.state.choices2.map((col, i) => {
      return (
        <div key={i} style={{ marginBottom: 15 }}>
          <Row>
            <Col span={2} style={{ fontSize: 18 }}>
              {i + 1}
            </Col>
            <Col span={2}>
              <Switch
                unCheckedChildren="Text"
                checkedChildren="Image"
                checked={this.state.choices2[i].type === "image"}
                onChange={value => this.onTypeChange2(value, i)}
              />
            </Col>
            <Col span={18}>
              {col.type === "text" ? (
                <Input
                  placeholder="Enter choice"
                  value={col.choice}
                  onChange={e => this.onChoiceChange2(e, i)}
                  size="large"
                />
              ) : (
                <Upload
                  {...this.uploadProps}
                  onChange={info => this.onUploadChangeChoice2(i, info)}
                >
                  <Button>
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
              )}
            </Col>
            <Col span={2} style={{ paddingLeft: 15 }}>
              <Icon
                onClick={() => this.onDelete2(col.id)}
                type="minus-circle"
                theme="twoTone"
                twoToneColor="red"
                style={{ fontSize: 35 }}
              />
            </Col>
          </Row>
        </div>
      );
    });
  };

  createAnswers = () => {
    return this.state.choices1.map((choice1, i) => {
      return (
        <div key={i}>
          <Row>
            <Col style={{ fontSize: 18 }} span={2}>
              {i + 1}
            </Col>
            <Col span={22}>
              <Form.Item>
                <Select
                  mode="multiple"
                  value={this.state.answers[i].choices}
                  placeholder="Select options from column 2"
                  onChange={value => this.onAnswerChange(value, i)}
                >
                  {this.state.choices2.map((choice, idx) => {
                    return (
                      <Select.Option key={idx} value={idx + 1}>
                        {idx + 1}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>
      );
    });
  };

  onEntityTypeChange = value => {
    this.setState({
      entity_type: value === true ? 2 : 1
    });
  };

  setStatus = e => {
    this.setState({ status: e === true ? 1 : 2 });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Card loading={this.state.loading} title={<div className="card-title">Edit Quad</div>}>
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="Text">
              {getFieldDecorator("text", {
                rules: [{ required: true, message: "Please enter text" }]
              })(<Input placeholder="Enter text" size="large" />)}
            </Form.Item>
            <Form.Item label="Status">
              <Switch
                unCheckedChildren="Draft"
                checkedChildren="Live"
                checked={this.state.status === 1 ? true : false}
                onChange={this.setStatus}
              />
            </Form.Item>
            <Form.Item label="Entity Type">
              <Switch
                unCheckedChildren="BM"
                checkedChildren="FM"
                checked={this.state.entity_type === 2}
                onChange={this.onEntityTypeChange}
              />
            </Form.Item>
            {this.state.entity_type === 1 ? (
              <Form.Item label="Parameter ID">
                {getFieldDecorator("entity_id", {
                  rules: [{ required: true, message: "Enter Parameter ID" }]
                })(
                  <Input
                    placeholder="Enter Parameter ID"
                    type="number"
                    size="large"
                  />
                )}
              </Form.Item>
            ) : (
              <Form.Item label="Course ID">
                {getFieldDecorator("entity_id", {
                  rules: [{ required: true, message: "Enter Course ID" }]
                })(
                  <Input
                    placeholder="Enter Course ID"
                    type="number"
                    size="large"
                  />
                )}
              </Form.Item>
            )}
            <Row>
              <Col span={22}>
                <Form.Item label="Quadrants">{this.createColumn1()}</Form.Item>
              </Col>
              <Col span={2}>
                <div onClick={this.onAddChoice} style={{ marginTop: 40 }}>
                  <Icon
                    type="plus-circle"
                    theme="twoTone"
                    style={{ marginLeft: 15, fontSize: 35 }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <Form.Item label="Choices">{this.createColumn2()}</Form.Item>
              </Col>
              <Col span={2}>
                <div onClick={this.onAddChoice2} style={{ marginTop: 40 }}>
                  <Icon
                    type="plus-circle"
                    theme="twoTone"
                    style={{ marginLeft: 15, fontSize: 35 }}
                  />
                </div>
              </Col>
            </Row>
            <Form.Item label="Match">{this.createAnswers()}</Form.Item>
            <MButton>Edit</MButton>
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    quadDetail: state.quad.quadDetail
  };
};

export default connect(
  mapStateToProps,
  { editQuad, fetchQuadDetails }
)(Form.create()(Edit));
