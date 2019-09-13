import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  Form,
  Input,
  Switch,
  Upload,
  message,
  Button,
  Icon,
  Row,
  Col
} from "antd";
import MButton from "../../Elements/MButton";
import adminPanelApi from "../../../apis/adminPanel";
import history from "../../../history";
import qs from "querystring";

class AddResponse extends Component {
  state = {
    mediaType: 0,
    file_url: null
  };

  setMediaType = value => {
    this.setState({
      mediaType: value === true ? 1 : 0
    });
  };

  componentWillMount() {
    this.id = this.props.match.params.id;
  }

  uploadPropsAudio = {
    name: "file",
    data: { folder_name: "extras/" },

    action: "https://pylearning-api.iaugmentor.com/file_upload/",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMtYXBpLmlhdWdtZW50b3IuY29tL3YxL2F1dGgvc2lnbmluIiwianRpIjoiNmM2OWU2Nzk0NzFmM2RjNmE2OTA1MTc1ZTNlYmU4NTQiLCJleHAiOjE1OTE2OTQzOTEsImlhdCI6MTU2MDEzODU5MSwibmJmIjoxNTYwMTM4NTkxfQ.L1vLFQIhdtW0U1wMlOAkNrjDUOL7zE0Glc2ogRbXhBY",
      key: "TcS99L07QkDezB5n4Qdw"
    },
    accept: ".mp3"
  };

  uploadPropsVideo = {
    name: "file",
    data: { folder_name: "extras/" },

    action: "https://pylearning-api.iaugmentor.com/file_upload/",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMtYXBpLmlhdWdtZW50b3IuY29tL3YxL2F1dGgvc2lnbmluIiwianRpIjoiNmM2OWU2Nzk0NzFmM2RjNmE2OTA1MTc1ZTNlYmU4NTQiLCJleHAiOjE1OTE2OTQzOTEsImlhdCI6MTU2MDEzODU5MSwibmJmIjoxNTYwMTM4NTkxfQ.L1vLFQIhdtW0U1wMlOAkNrjDUOL7zE0Glc2ogRbXhBY",
      key: "TcS99L07QkDezB5n4Qdw"
    },
    accept: ".mp4"
  };

  onUploadMedia = info => {
    if (info.file.status === "done") {
      console.log(info.file.response.url);
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({ file_url: info.file.response.url });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, formProps) => {
      if (!err) {
        const values = {
          name: formProps.name,
          keywords: formProps.keywords,
          media_type: this.state.mediaType === 0 ? "audio" : "video",
          question_id: this.id,
          file_url: this.state.file_url
        };
        await adminPanelApi(this.props.user.Authorization).post(
          "/v1/admin/upload/expert_response",
          qs.stringify(values)
        );
        history.push("/simulation");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Card title={<div className="card-title">Add Response</div>}>
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Name is required"
                  }
                ]
              })(<Input placeholder="Enter Name" size="large" />)}
            </Form.Item>
            <Form.Item label="Keywords">
              {getFieldDecorator("keywords", {
                rules: [
                  {
                    required: true,
                    message: "Keywords are required"
                  }
                ]
              })(<Input placeholder="Enter keywords" size="large" />)}
            </Form.Item>
            <Row gutter={48}>
              <Col span={4}>
                <Form.Item label="Media Type">
                  <Switch
                    unCheckedChildren="Audio"
                    checkedChildren="Video"
                    onChange={this.setMediaType}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Media">
                  {this.state.mediaType === 0 ? (
                    <Upload
                      {...this.uploadPropsAudio}
                      onChange={this.onUploadMedia}
                    >
                      <Button>
                        <Icon type="upload" /> Click to Upload
                      </Button>
                    </Upload>
                  ) : (
                    <Upload
                      {...this.uploadPropsVideo}
                      onChange={this.onUploadMedia}
                    >
                      <Button>
                        <Icon type="upload" /> Click to Upload
                      </Button>
                    </Upload>
                  )}
                </Form.Item>
              </Col>
            </Row>
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

export default connect(mapStateToProps)(Form.create()(AddResponse));
