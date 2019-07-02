import React, { Component } from "react";
import { Form, Input, Card, Switch, Icon, Button, Upload, message } from "antd";
import pyLearningApi from "../../../../apis/pylearning";
import { connect } from "react-redux";
import qs from "querystring";
import MButton from "../../../Elements/MButton";
import { fetchDonDonDetails } from "../../../../actions";
import history from "../../../../history";

class Edit extends Component {
  state = {
    entityType: 1,
    type: "text",
    choice1: null,
    choice2: null,
    status: 1,
    id: null,
    loading: true
  };

  async componentDidMount() {
    this.props.heading("DonDon Edit");
    const id = this.props.match.params.id;
    await this.props.fetchDonDonDetails(this.props.user.Authorization, id);
    const { details } = this.props;
    this.props.form.setFieldsValue({
      text: details.text,
      instructions: details.instructions,
      entity_id: details.entity_id,
      bucket1: details.bucket1,
      bucket2: details.bucket2
    });
    this.setState({
      entityType: details.entity_type,
      type: details.type,
      status: details.status,
      id
    });

    if (details.type === "text") {
      this.props.form.setFieldsValue({
        choice1: details.choice1,
        choice2: details.choice2
      });
    } else {
      this.setState({
        choice1: details.choice1,
        choice2: details.choice2
      });
    }
    this.setState({ loading: false });
  }

  setEntityType = e => {
    this.setState({
      entityType: e === true ? 2 : 1
    });
  };

  setType = e => {
    this.setState({
      type: e === true ? "image" : "text"
    });
  };

  uploadProps = {
    name: "file",
    data: { folder_name: "extras/" },

    action: "https://pylearning-api.iaugmentor.com/file_upload/",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMtYXBpLmlhdWdtZW50b3IuY29tL3YxL2F1dGgvc2lnbmluIiwianRpIjoiNmM2OWU2Nzk0NzFmM2RjNmE2OTA1MTc1ZTNlYmU4NTQiLCJleHAiOjE1OTE2OTQzOTEsImlhdCI6MTU2MDEzODU5MSwibmJmIjoxNTYwMTM4NTkxfQ.L1vLFQIhdtW0U1wMlOAkNrjDUOL7zE0Glc2ogRbXhBY",
      key: "TcS99L07QkDezB5n4Qdw"
    },
    accept: ".png,.jpg"
  };

  onUploadChangeChoice1 = info => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({ choice1: info.file.response.url });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  onUploadChangeChoice2 = info => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({ choice2: info.file.response.url });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, formProps) => {
      if (!err) {
        if (this.state.type === "image") {
          const data = {
            ...formProps,
            entity_type: this.state.entityType,
            type: this.state.type,
            choice1: this.state.choice1,
            choice2: this.state.choice2,
            id: this.state.id,
            status: this.state.status
          };
          await pyLearningApi(this.props.user.Authorization).post(
            "/v2/game/dondon/upload/edit",
            qs.stringify(data)
          );
        } else {
          const data = {
            ...formProps,
            entity_type: this.state.entityType,
            type: this.state.type,
            id: this.state.id,
            status: this.state.status
          };
          await pyLearningApi(this.props.user.Authorization).post(
            "/v2/game/dondon/upload/edit",
            qs.stringify(data)
          );
        }
        history.push("/games/dondon");
      } else {
        console.log(err);
      }
    });
  };

  setStatus = e => {
    this.setState({ status: e === true ? 1 : 2 });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card loading={this.state.loading}>
        <Form onSubmit={this.onSubmit}>
          <Form.Item label="Text">
            {getFieldDecorator("text", {
              rules: [{ required: true, message: "Please enter text" }]
            })(<Input size="large" />)}
          </Form.Item>
          <Form.Item label="Instructions">
            {getFieldDecorator("instructions", {
              rules: [{ required: true, message: "Please enter instruction" }]
            })(<Input size="large" />)}
          </Form.Item>
          <Form.Item label="Entity ID">
            {getFieldDecorator("entity_id", {
              rules: [{ required: true, message: "Please enter Entity ID" }]
            })(<Input size="large" type="number" />)}
          </Form.Item>
          <Form.Item label="Entity Type">
            <Switch
              unCheckedChildren="BM"
              checkedChildren="FM"
              checked={this.state.entityType === 1 ? false : true}
              onChange={this.setEntityType}
            />
          </Form.Item>
          <Form.Item label="Bucket 1">
            {getFieldDecorator("bucket1", {
              rules: [{ required: true, message: "Please enter Bucket 1" }]
            })(<Input size="large" />)}
          </Form.Item>
          <Form.Item label="Bucket 2">
            {getFieldDecorator("bucket2", {
              rules: [{ required: true, message: "Please enter Bucket 2" }]
            })(<Input size="large" />)}
          </Form.Item>
          <Form.Item label="Status">
            <Switch
              unCheckedChildren="Draft"
              checkedChildren="Live"
              checked={this.state.status === 1 ? true : false}
              onChange={this.setStatus}
            />
          </Form.Item>
          <Form.Item label="Type">
            <Switch
              unCheckedChildren="Text"
              checkedChildren="Image"
              checked={this.state.type === "text" ? false : true}
              onChange={this.setType}
            />
          </Form.Item>
          {this.state.type === "text" ? (
            <div>
              <Form.Item label="Choice 1">
                {getFieldDecorator("choice1", {
                  rules: [{ required: true, message: "Please enter Choice 1" }]
                })(<Input size="large" />)}
              </Form.Item>
              <Form.Item label="Choice 2">
                {getFieldDecorator("choice2", {
                  rules: [{ required: true, message: "Please enter Choice 2" }]
                })(<Input size="large" />)}
              </Form.Item>
            </div>
          ) : (
            <div>
              <Form.Item label="Choice 1">
                <Upload
                  {...this.uploadProps}
                  onChange={this.onUploadChangeChoice1}
                >
                  <Button>
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
                <div>
                  {this.state.choice1 ? (
                    <img
                      src={this.state.choice1}
                      alt="choice 1"
                      height="100px"
                      width="100px"
                    />
                  ) : null}
                </div>
              </Form.Item>
              <Form.Item label="Choice 2">
                <Upload
                  {...this.uploadProps}
                  onChange={this.onUploadChangeChoice2}
                >
                  <Button>
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
                <div>
                  {this.state.choice2 ? (
                    <img
                      src={this.state.choice2}
                      alt="choice 2"
                      height="100px"
                      width="100px"
                    />
                  ) : null}
                </div>
              </Form.Item>
            </div>
          )}
          <div style={{ textAlign: "right" }}>
            <MButton>Update</MButton>
          </div>
        </Form>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    details: state.dondon.dondonDetails
  };
};

export default connect(
  mapStateToProps,
  { fetchDonDonDetails }
)(Form.create()(Edit));
