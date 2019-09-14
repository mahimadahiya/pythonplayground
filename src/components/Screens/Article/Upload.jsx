import React, { useState } from "react";
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
  Row,
  Col
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import MButton from "../../Elements/MButton";
import { addArticle, setStep } from "../../../actions";
import { quillFormats, quillModules } from "../../Elements/Toolbar";

const ArticleUpload = props => {
  const dispatch = useDispatch();

  const [type, setType] = useState("image");
  const [html, setHTML] = useState();
  const [url, setURL] = useState("");
  const [accept, setAccept] = useState("jpg");
  const [fileExt, setFileExt] = useState("");

  const user = useSelector(state => state.userAuth);

  const handleHTMLChange = val => {
    setHTML(val);
  };

  const onSelectType = val => {
    setType(val);
    switch (val) {
      case "image":
        setAccept("jpg");
        break;
      case "audio":
        setAccept("mp3");
        break;
      case "video":
        setAccept("mp4");
        break;
      default:
        setAccept("*");
    }
  };

  const uploadProps = {
    name: "file",
    data: { folder_name: "extras/" },

    action: "https://pylearning-api.iaugmentor.com/file_upload/",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMtYXBpLmlhdWdtZW50b3IuY29tL3YxL2F1dGgvc2lnbmluIiwianRpIjoiNmM2OWU2Nzk0NzFmM2RjNmE2OTA1MTc1ZTNlYmU4NTQiLCJleHAiOjE1OTE2OTQzOTEsImlhdCI6MTU2MDEzODU5MSwibmJmIjoxNTYwMTM4NTkxfQ.L1vLFQIhdtW0U1wMlOAkNrjDUOL7zE0Glc2ogRbXhBY",
      key: "TcS99L07QkDezB5n4Qdw"
    },
    accept: `.${accept}`
  };

  const onUploadImage = info => {
    if (info.file.status === "done") {
      setFileExt(info.file.name.split(".")[1]);
      message.success(`${info.file.name} file uploaded successfully`);
      setURL(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formProps) => {
      if (!err) {
        if (accept !== fileExt.toLowerCase()) {
          return message.error("Invalid file");
        }
        let values = {
          ...formProps,
          type
        };
        switch (type) {
          case "image":
          case "audio":
          case "video":
            values = { ...values, url };
            break;
          default:
            break;
        }
        const data = await addArticle(user.Authorization, values, html);
        if (!data.err) {
          props.setId(data.id);
          message.success("Article created successfully");
          dispatch(setStep(1));
        }
      } else {
        console.log(err);
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <React.Fragment>
      <Card title={<b>Create Article</b>}>
        <Form onSubmit={onSubmit}>
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
                  onChange={onSelectType}
                  value={type}
                >
                  <Select.Option value="image">Image</Select.Option>
                  <Select.Option value="audio">Audio</Select.Option>
                  <Select.Option value="video">Video</Select.Option>
                  <Select.Option value="html">HTML</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {type === "image" ||
          type === "audio" ||
          type === "video" ||
          type === "pdf" ? (
            <div style={{ marginBottom: 30 }}>
              <Upload {...uploadProps} onChange={onUploadImage}>
                <Button size="large">
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            </div>
          ) : null}
          {type === "html" ? (
            <ReactQuill
              onChange={handleHTMLChange}
              modules={quillModules}
              formats={quillFormats}
              style={{ height: 300, marginBottom: 50 }}
            />
          ) : null}
          <MButton>Submit</MButton>
        </Form>
      </Card>
    </React.Fragment>
  );
};

export default Form.create()(ArticleUpload);
