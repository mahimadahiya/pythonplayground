import React, { Component } from "react";
import { Form, Input, Card, Switch, Icon, Button, Upload, message } from "antd";
import pyLearningApi from "../../../apis/pylearning";
import { connect } from "react-redux";
import qs from "querystring";
import MButton from "../../Elements/MButton";

class UploadComponent extends Component {
  state = {
    entityType: 1,
    type: "text",
    choice1: null,
    choice2: null
  };

  componentDidMount() {
    this.props.heading("DonDon Upload");
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
    if (info.file.status === "uploading") {
      message.loading(`{info.file.name} uploading...`);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({ choice2: info.file.response.url });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, formProps) => {
      if (!err) {
        if (this.state.type === "image") {
          const data = {
            ...formProps,
            entity_type: this.state.entityType,
            type: this.state.type,
            choice1: this.state.choice1,
            choice2: this.state.choice2
          };
          pyLearningApi(this.props.user.Authorization).post(
            "/v2/game/dondon/upload/",
            qs.stringify(data)
          );
        } else {
          const data = {
            ...formProps,
            entity_type: this.state.entityType,
            type: this.state.type
          };
          pyLearningApi(this.props.user.Authorization).post(
            "/v2/game/dondon/upload/",
            qs.stringify(data)
          );
        }
      } else {
        console.log(err);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card>
        <Form onSubmit={this.onSubmit}>
          <Form.Item label="Text">
            {getFieldDecorator("text", {
              rules: [{ required: true, message: "Please enter text" }]
            })(<Input size="large" />)}
          </Form.Item>
          <Form.Item label="Instruction">
            {getFieldDecorator("instruction", {
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
          <Form.Item label="Entity Type">
            <Switch
              unCheckedChildren="Text"
              checkedChildren="Input"
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
              </Form.Item>
            </div>
          )}
          <div style={{ textAlign: "right" }}>
            <MButton>Upload</MButton>
          </div>
        </Form>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth
  };
};

export default connect(mapStateToProps)(Form.create()(UploadComponent));
