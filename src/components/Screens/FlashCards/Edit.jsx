import React, { Component } from "react";
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Icon,
  message,
  Button,
  Upload
} from "antd";
import MButton from "../../Elements/MButton";
import { editFlashCard, fetchFlashDetails } from "../../../actions";
import { connect } from "react-redux";

class Edit extends Component {
  state = {
    entity_type: 1,
    entity_id: null,
    icon_url: null,
    content_data: [
      {
        id: 1,
        title: "",
        description: "",
        icon_url: ""
      }
    ],
    content_data_count: 1
  };

  async componentDidMount() {
    await this.props.fetchFlashDetails(
      this.props.user.Authorization,
      this.props.match.params.id
    );
    const flash = this.props.flash;
    this.props.form.setFieldsValue({
      title: flash.title,
      entity_id: flash.entity_id
    });
    this.setState({
      icon_url: flash.icon_url,
      content_data: flash.content_data,
      content_data_count: flash.content_data.length
    });
  }

  onDelete = id => {
    let content_data = this.state.content_data;
    content_data = content_data.filter((choice, i) => {
      return choice.id !== id;
    });

    this.setState({
      content_data,
      content_data_count: this.state.content_data_count - 1
    });
  };

  onAddContent = () => {
    this.setState({
      content_data_count: this.state.content_data_count + 1,
      content_data: [
        ...this.state.content_data,
        {
          id: this.state.content_data_count + 1,
          title: "",
          description: ""
        }
      ]
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
    accept: ".png,.jpg,.mp4,.mp3,.pdf,.3gp"
  };

  onUploadChangeContentIcons = (i, info) => {
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      let content_data = [...this.state.content_data];
      content_data[i] = {
        ...content_data[i],
        icon_url: info.file.response.url
      };
      this.setState({
        content_data
      });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  onUploadChangeIcon = info => {
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        icon_url: info.file.response.url
      });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  onInputContentTitle = (e, i) => {
    let content_data = [...this.state.content_data];
    content_data[i] = {
      ...content_data[i],
      title: e.target.value
    };
    this.setState({
      content_data
    });
  };

  onInputContentDescription = (e, i) => {
    let content_data = [...this.state.content_data];
    content_data[i] = {
      ...content_data[i],
      description: e.target.value
    };
    this.setState({
      content_data
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, formProps) => {
      if (!err) {
        const values = {
          ...formProps,
          icon_url: this.state.icon_url,
          entity_type: this.state.entity_type,
          content_data: JSON.stringify(this.state.content_data),
          flash_card_id: this.props.match.params.id
        };
        await this.props.editFlashCard(this.props.user.Authorization, values);
      }
    });
  };

  createContentData = () => {
    return this.state.content_data.map((col, i) => {
      return (
        <div key={i} style={{ marginBottom: 15 }}>
          <Row gutter={48}>
            <Col span={1} style={{ fontSize: 18 }}>
              {this.state.content_data[i].id}
            </Col>
            <Col span={23}>
              <Form.Item label="Title">
                <Input
                  placeholder="Enter title"
                  onChange={e => this.onInputContentTitle(e, i)}
                  value={this.state.content_data[i].title}
                />
              </Form.Item>
              <Form.Item label="Description">
                <Input
                  placeholder="Enter description"
                  onChange={e => this.onInputContentDescription(e, i)}
                  value={this.state.content_data[i].description}
                />
              </Form.Item>
              <Row type="flex" justify="space-between">
                <Col span={15}>
                  <Upload
                    {...this.uploadProps}
                    onChange={info => this.onUploadChangeContentIcons(i, info)}
                  >
                    <Button>
                      <Icon type="upload" /> Click to Upload
                    </Button>
                  </Upload>
                </Col>
                <Col span={2} style={{ paddingLeft: 15 }}>
                  <Icon
                    type="minus-circle"
                    onClick={() => this.onDelete(col.id)}
                    theme="twoTone"
                    twoToneColor="red"
                    style={{ fontSize: 35 }}
                  />
                </Col>
              </Row>
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

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Card title={<div className="card-title">Add Flash Card</div>}>
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="Title">
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "Please enter title" }]
              })(<Input placeholder="Enter title" size="large" />)}
            </Form.Item>
            <Form.Item label="Upload Icon">
              <Upload {...this.uploadProps} onChange={this.onUploadChangeIcon}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
              <a href={this.state.icon_url}>View Icon</a>
            </Form.Item>
            <Row>
              <Form.Item label="Content Data">
                {this.createContentData()}
              </Form.Item>
            </Row>
            <Row>
              <div
                onClick={this.onAddContent}
                style={{ marginBottom: 40, textAlign: "center" }}
              >
                <Icon
                  type="plus-circle"
                  theme="twoTone"
                  style={{ marginLeft: 15, fontSize: 55 }}
                />
              </div>
            </Row>

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
    flash: state.flashcard.flash
  };
};

export default connect(
  mapStateToProps,
  { editFlashCard, fetchFlashDetails }
)(Form.create()(Edit));
