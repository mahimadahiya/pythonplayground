import React from "react";
import {
  Button,
  Card,
  Input,
  Form,
  Upload,
  Icon,
  message,
  Switch,
  Row,
  Col
} from "antd";
import { connect } from "react-redux";
import { updateQuestion, fetchQuestionDetail } from "../../../actions";
import history from "../../../history";

const mapAlphabet = {
  0: `a`,
  2: "c",
  3: "d",
  4: "e",
  1: "b",
  5: "f"
};

const reverseMapAlphabet = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5
};

class MapQuestionChoices extends React.Component {
  state = {
    choices: [
      {
        choice: "",
        id: "",
        type: "text",
        media_type: "",
        media_url: ""
      }
    ],
    correctChoice: "",
    loadedChoices: false,
    loading: true,
    questionDetail: {}
  };

  async componentDidMount() {
    await this.props.fetchQuestionDetail(
      this.props.match.params.id,
      this.props.user.Authorization
    );
    this.setState({ loading: false });
  }

  componentDidUpdate() {
    if (
      this.props.questionDetail.question.final_choices.length !== 0 &&
      !this.state.loadedChoices
    )
      this.setState({
        choices: this.props.questionDetail.question.final_choices,
        correctChoice: this.props.questionDetail.question.answer,
        loadedChoices: true
      });
  }

  addClick = () => {
    if (this.state.choices.length < 5) {
      this.setState(prevState => ({
        choices: [
          ...prevState.choices,
          {
            choice: "",
            id: "",
            type: "text",
            media_type: "",
            media_url: ""
          }
        ]
      }));
    } else {
      message.error("Can't add more than 5 options");
    }
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
    accept: ".png,.jpg,.mp4,.mp3"
  };

  onUploadChange = (i, info) => {
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      const type = info.file.type.split("/")[0];
      let choices = [...this.state.choices];
      choices[i] = {
        ...choices[i],
        media_type: type,
        media_url: info.file.response.url,
        type: "media",
        id: mapAlphabet[i]
      };
      this.setState({
        choices
      });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  handleChange = (i, e) => {
    const { name, value } = e.target;
    let choices = [...this.state.choices];
    choices[i] = { ...choices[i], [name]: value };
    choices[i] = { ...choices[i], id: mapAlphabet[i] };
    this.setState({ choices });
  };

  handleSwitch = (i, value) => {
    if (value) {
      this.setState({
        correctChoice: mapAlphabet[i]
      });
    } else {
      this.setState({
        correctChoice: ""
      });
    }
  };

  removeClick = i => {
    let choices = [...this.state.choices];
    choices.splice(i, 1);
    this.setState({ choices });
  };

  createUI = () => {
    return this.state.choices.map((el, i) => (
      <Col span={8} style={{ marginTop: 10 }} key={i}>
        <div>
          <Card
            title={`Choice ${i + 1}`}
            size="small"
            headStyle={{ textAlign: "center" }}
          >
            <Form.Item label="Choice Text">
              <Input
                placeholder="Text"
                name="choice"
                value={el.choice || ""}
                size="large"
                onChange={value => this.handleChange(i, value)}
              />
            </Form.Item>
            <Form.Item label="Upload Media">
              <Upload
                {...this.uploadProps}
                onChange={info => this.onUploadChange(i, info)}
              >
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Answer">
              <Switch
                disabled={
                  this.state.correctChoice !== "" &&
                  i !== reverseMapAlphabet[this.state.correctChoice]
                    ? true
                    : false
                }
                checked={
                  this.state.correctChoice !== "" &&
                  i === reverseMapAlphabet[this.state.correctChoice]
                    ? true
                    : false
                }
                unCheckedChildren="Incorrect"
                title="Answer"
                onChange={value => this.handleSwitch(i, value)}
                checkedChildren="Correct"
              />
            </Form.Item>
            <div style={{ textAlign: "right" }}>
              <Button
                shape="circle"
                size="large"
                type="danger"
                onClick={() => this.removeClick(i)}
              >
                <Icon type="close" />
              </Button>
            </div>
          </Card>
        </div>
      </Col>
    ));
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.correctChoice === "") {
      return message.error("No correct answer selected");
    }
    const choices = this.state.choices.filter(choice => {
      if (choice.media_url.length > 0 || choice.choice.length > 0) {
        return true;
      }
      return false;
    });

    if (choices.length < 2) {
      message.warning("Please add atleast two choices");
      return;
    }

    const query = {
      choices: JSON.stringify(choices),
      correct_choice: this.state.correctChoice
    };
    await this.props.updateQuestion(
      this.props.match.params.id,
      this.props.user.Authorization,
      query
    );
    history.push("/question/map/" + this.props.match.params.id);
  };

  render() {
    return (
      <div>
        <Card
          loading={this.state.loading}
          title={<div className="card-title">Map Choices</div>}
        >
          <Form onSubmit={this.handleSubmit}>
            <Row type="flex" justify="space-around" gutter={16}>
              {this.createUI()}
            </Row>
            <Row type="flex" justify="space-around" style={{ marginTop: 60 }}>
              <Col span={12}>
                <Form.Item>
                  <Button
                    onClick={this.addClick}
                    shape="circle"
                    size="large"
                    icon="plus"
                    type="primary"
                    style={{ textAlign: "center" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12} style={{ textAlign: "end" }}>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    size="large"
                    shape="round"
                    type="primary"
                    disabled={this.state.choices.length === 0 ? true : false}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    questionDetail: state.question.questionDetail
  };
};

export default connect(
  mapStateToProps,
  { updateQuestion, fetchQuestionDetail }
)(MapQuestionChoices);
