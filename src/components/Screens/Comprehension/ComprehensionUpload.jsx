import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Select, Form, Card, Upload, Button, Icon, message } from "antd";

class ComprehensionUpload extends Component {
  state = {
    text: "",
    type: "image"
  };

  handleChange = val => {
    this.setState({ text: val });
  };

  onSelectType = val => {
    this.setState({ type: val });
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

  onUploadImage = info => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({ url: info.file.response.url });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Card title={<b>Upload Comprehension</b>} style={{ height: 800 }}>
          <Form.Item label="Type">
            <Select
              placeholder="Select type"
              style={{ minWidth: 100 }}
              onChange={this.onSelectType}
              value={this.state.type}
            >
              <Select.Option value="image">Image</Select.Option>
              <Select.Option value="video">Video</Select.Option>
              <Select.Option value="html">HTML</Select.Option>
            </Select>
          </Form.Item>
          {this.state.type === "image" ? (
            <div style={{ textAlign: "center" }}>
              <Upload {...this.uploadProps} onChange={this.onUploadImage}>
                <Button size="large">
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            </div>
          ) : null}
          {this.state.type === "video" ? <div>video</div> : null}
          {this.state.type === "html" ? (
            <ReactQuill onChange={this.handleChange} style={{ height: 300 }} />
          ) : null}
        </Card>
      </React.Fragment>
    );
  }
}

export default ComprehensionUpload;
