import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {
  Select,
  Form,
  Card,
  Upload,
  Button,
  Icon,
  message,
  Input,
  Switch,
  Row,
  Col
} from "antd";
import { connect } from "react-redux";
import MButton from "../../Elements/MButton";
import { addComprehension } from "../../../actions";
import { quillFormats, quillModules } from "../../Elements/Toolbar";
import history from "../../../history";

class ComprehensionUpload extends Component {
  state = {
    name: "",
    type: "image",
    fileExt: null,
    html: null,
    comprehension_type: 1,
    url: "",
    accept: "jpg"
  };

  handleChange = val => {
    this.setState({ html: val });
  };

  onSelectType = val => {
    this.setState({ type: val }, () => {
      switch (this.state.type) {
        case "image":
          this.setState({ accept: "jpg" });
          break;
        case "audio":
          this.setState({ accept: "mp3" });
          break;
        case "video":
          this.setState({ accept: "mp4" });
          break;
        case "pdf":
          this.setState({ accept: "pdf" });
          break;
        case "html":
          this.setState({ accept: "html" });
          break;
        default:
          this.setState({ accept: "*" });
      }
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

  onUploadImage = info => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        url: info.file.response.url,
        fileExt: info.file.name.split(".")[1]
      });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, formProps) => {
      if (!err) {
        if (!this.state.url) {
          return message.error("Media not uploaded");
        } else if (this.state.fileExt !== this.state.accept) {
          return message.error("Invalid file type");
        }
        let values = {
          ...formProps,
          type: this.state.type,
          comprehension_type: this.state.comprehension_type
        };
        switch (this.state.type) {
          case "image":
            values = { ...values, url: this.state.url };
            break;
          case "html":
            break;
          default:
            break;
        }
        await this.props.addComprehension(
          this.props.user.Authorization,
          values,
          this.state.html
        );
        history.push("/comprehension");
      } else {
        console.log(err);
      }
    });
  };

  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };

  onSelectComprehensionType = val => {
    this.setState({
      comprehension_type: val === true ? 2 : 1
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Card title={<b>Upload Comprehension</b>} style={{ height: 800 }}>
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "Name is required" }]
              })(<Input placeholder="Enter name" />)}
            </Form.Item>
            <Row gutter={48}>
              <Col span={8}>
                <Form.Item label="Type">
                  <Select
                    placeholder="Select type"
                    style={{ minWidth: 100 }}
                    onChange={this.onSelectType}
                    value={this.state.type}
                  >
                    <Select.Option value="image">Image</Select.Option>
                    <Select.Option value="audio">Audio</Select.Option>
                    <Select.Option value="video">Video</Select.Option>
                    <Select.Option value="pdf">PDF</Select.Option>
                    <Select.Option value="html">HTML</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Comprehension Type">
                  <Switch
                    unCheckedChildren="BM"
                    checkedChildren="FM"
                    onChange={this.onSelectComprehensionType}
                    checked={this.state.comprehension_type === 2}
                  />
                </Form.Item>
              </Col>
            </Row>
            {this.state.type === "image" ||
            this.state.type === "audio" ||
            this.state.type === "video" ||
            this.state.type === "pdf" ? (
              <div style={{ marginBottom: 30 }}>
                <Upload
                  {...this.uploadProps}
                  onChange={this.onUploadImage}
                  accept={`.${this.state.accept}`}
                >
                  <Button size="large">
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
              </div>
            ) : null}
            {this.state.type === "html" ? (
              <ReactQuill
                onChange={this.handleChange}
                formats={quillFormats}
                modules={quillModules}
                style={{ height: 300, marginBottom: 50 }}
              />
            ) : null}
            <MButton>Submit</MButton>
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
  { addComprehension }
)(Form.create()(ComprehensionUpload));
