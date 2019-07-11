import React, { Component } from "react";
import { Card, Form, Select, Upload, Button, Icon, message } from "antd";
import MButton from "../../Elements/MButton";
import { connect } from "react-redux";
import { createQuestion } from "../../../actions";

class AddQuestion extends Component {
  state = {
    file_url: null
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, formProps) => {
      if (!err) {
        const values = {
          ...formProps,
          media_url: this.state.file_url
        };
        this.props.createQuestion(this.props.user.Authorization, values);
      } else {
        console.log(err);
      }
    });
  };

  onUploadMedia = info => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({ file_url: info.file.response.url });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  onSelectMedia = val => {
    this.setState({
      type: val
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
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Card title={<div className="card-title">Add Question</div>}>
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="Quiz Type">
              {getFieldDecorator("quiz_type", {
                rules: [
                  {
                    required: true,
                    message: "Please select a Quiz Type"
                  }
                ]
              })(
                <Select placeholder="Select Quiz Type">
                  <Select.Option value="mcq" key="mcq">
                    MCQ
                  </Select.Option>
                  <Select.Option value="dd" key="dd">
                    Drag & Drop
                  </Select.Option>
                  <Select.Option value="kp" key="kp">
                    Key Phrases
                  </Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Quiz Type">
              {getFieldDecorator("media_type", {
                rules: [
                  {
                    required: true,
                    message: "Please select a Media Type"
                  }
                ]
              })(
                <Select
                  placeholder="Select Media Type"
                  onChange={this.onSelectMedia}
                >
                  <Select.Option value="text" key="text">
                    Text
                  </Select.Option>
                  <Select.Option value="image" key="image">
                    Image
                  </Select.Option>
                  <Select.Option value="audio" key="audio">
                    Audio
                  </Select.Option>
                  <Select.Option value="video" key="video">
                    Video
                  </Select.Option>
                </Select>
              )}
            </Form.Item>
            {/* {this.state.type === "text" ? null : ( */}
            <Form.Item label="Media">
              <Upload {...this.uploadProps} onChange={this.onUploadMedia}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            </Form.Item>
            {/* )} */}
            <MButton>Add</MButton>
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { createQuestion }
)(Form.create()(AddQuestion));
