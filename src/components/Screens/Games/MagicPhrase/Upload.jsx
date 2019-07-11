import React, { Component } from "react";
import { Form, Input, Card, Switch, Icon, Button, Upload, message } from "antd";
import pyLearningApi from "../../../../apis/pylearning";
import { connect } from "react-redux";
import qs from "querystring";
import MButton from "../../../Elements/MButton";
import history from "../../../../history";

class UploadComponent extends Component {
  state = {
    entityType: 1,
    type: "text",
    choice1: null,
    choice2: null,
    media: null
  };

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

  onUploadMedia = info => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({ media: info.file.response.url });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
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

  onUploadChangeChoice3 = info => {
    if (info.file.status === "uploading") {
      message.loading(`{info.file.name} uploading...`);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({ choice3: info.file.response.url });
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
            choice2: this.state.choice2,
            media: this.state.media
          };
          pyLearningApi(this.props.user.Authorization).post(
            "/v2/game/ctp/upload_panel/add",
            qs.stringify(data)
          );
        } else {
          const data = {
            ...formProps,
            entity_type: this.state.entityType,
            type: this.state.type,
            media: this.state.media
          };
          pyLearningApi(this.props.user.Authorization).post(
            "/v2/game/ctp/upload_panel/add",
            qs.stringify(data)
          );
        }
      } else {
        console.log(err);
      }
      history.push("/games/magicphrase");
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card title={<div className="card-title">Upload MagicPhrase</div>}>
        <Form onSubmit={this.onSubmit}>
          <Form.Item label="Title">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "Please enter Title" }]
            })(<Input size="large" placeholder="Enter title" />)}
          </Form.Item>
          <Form.Item label="Entity ID">
            {getFieldDecorator("entity_id", {
              rules: [{ required: true, message: "Please enter Entity ID" }]
            })(
              <Input size="large" type="number" placeholder="Enter Entity ID" />
            )}
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
            })(<Input size="large" placeholder="Enter Bucket 1" />)}
          </Form.Item>
          <Form.Item label="Bucket 2">
            {getFieldDecorator("bucket2", {
              rules: [{ required: true, message: "Please enter Bucket 2" }]
            })(<Input size="large" placeholder="Enter Bucket 2" />)}
          </Form.Item>
          <Form.Item label="Bucket 3">
            {getFieldDecorator("bucket3", {
              rules: [{ required: true, message: "Please enter Bucket 3" }]
            })(<Input size="large" placeholder="Enter Bucket 3" />)}
          </Form.Item>

          <Form.Item label="Type">
            <Switch
              unCheckedChildren="Text"
              checkedChildren="Image"
              onChange={this.setType}
            />
          </Form.Item>
          {this.state.type === "text" ? (
            <div>
              <Form.Item label="Choice 1">
                {getFieldDecorator("choice1", {
                  rules: [{ required: true, message: "Please enter Choice 1" }]
                })(<Input size="large" placeholder="Enter choice 1" />)}
              </Form.Item>
              <Form.Item label="Choice 2">
                {getFieldDecorator("choice2", {
                  rules: [{ required: true, message: "Please enter Choice 2" }]
                })(<Input size="large" placeholder="Enter choice 2" />)}
              </Form.Item>
              <Form.Item label="Choice 3">
                {getFieldDecorator("choice3", {
                  rules: [{ required: true, message: "Please enter Choice 3" }]
                })(<Input size="large" placeholder="Enter choice 3" />)}
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
              <Form.Item label="Choice 3">
                <Upload
                  {...this.uploadProps}
                  onChange={this.onUploadChangeChoice3}
                >
                  <Button>
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          )}
          <Form.Item label="Media">
            <Upload {...this.uploadProps} onChange={this.onUploadMedia}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          </Form.Item>
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
