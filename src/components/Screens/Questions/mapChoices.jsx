import React from "react";
import { connect } from "react-redux";
import { Button, Card, Input, Form, Upload, Icon, message } from "antd";

const props = {
  name: "file",
  data: {folder_name: "choice_media/images/"},
  
  action: "https://pylearning-api.iaugmentor.com/file_upload/",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMtYXBpLmlhdWdtZW50b3IuY29tL3YxL2F1dGgvc2lnbmluIiwianRpIjoiNmM2OWU2Nzk0NzFmM2RjNmE2OTA1MTc1ZTNlYmU4NTQiLCJleHAiOjE1OTE2OTQzOTEsImlhdCI6MTU2MDEzODU5MSwibmJmIjoxNTYwMTM4NTkxfQ.L1vLFQIhdtW0U1wMlOAkNrjDUOL7zE0Glc2ogRbXhBY",
    key: "TcS99L07QkDezB5n4Qdw"
  },
  onChange(info) {
    console.log(info)
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

class MapQuestionChoices extends React.Component {
  state = {
    choices: [
      {
        choice: "",
        type: "",
        media_type: "",
        media_url: ""
      }
    ]
  };

  addClick = () => {
    this.setState(prevState => ({
      choices: [
        ...prevState.choices,
        {
          choice: "",
          type: "",
          media_type: "",
          media_url: ""
        }
      ]
    }));
  };

  handleChange = (i, e) => {
    console.log(i, e.target.value);
    const { name, value } = e.target;
    let choices = [...this.state.choices];
    choices[i] = { ...choices[i], [name]: value };
    this.setState({ choices }, () => {
      console.log(this.state);
    });
  };

  handleDraggerChange = info => {
    console.log(info);
    if (info.file.status === "uploading") {
      console.log("uploading");
    }
    if (info.file.status === "done") {
      console.log("done");
    }
  };

  beforeUpload = file => {
    console.log("Your upload file:", file);
    return true;
  };

  createUI = () => {
    return this.state.choices.map((el, i) => (
      <div key={i}>
        <Card>
          <Form.Item>
            <Input
              placeholder="Text"
              name="choice"
              value={el.choice || ""}
              onChange={value => this.handleChange(i, value)}
            />
          </Form.Item>
          <Form.Item label="Upload Media">
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
            ,
          </Form.Item>
        </Card>
      </div>
    ));
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <Card>
          <Form onSubmit={this.onSubmit}>
            {this.createUI()}
            <Form.Item>
              <Button onClick={this.addClick}> Add More </Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit"> Submit </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default MapQuestionChoices;
