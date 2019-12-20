import React from "react";
import { connect } from "react-redux";
import Complexity from "../../Elements/Complexity";
import { Link } from "react-router-dom";
import {
  Divider,
  Card,
  Table,
  Pagination,
  Button,
  Popconfirm,
  Form,
  Row,
  Col,
  Icon,
  Tag,
  message,
  Modal
} from "antd";
import { fetchQuestionList, updateQuestion } from "../../../actions";
import Filters from "../../Elements/Helper/Filters";
import MButton from "../../Elements/MButton";
import Categories from "../../Elements/Categories";
import Parameters from "../../Elements/Parameters";

class QuestionList extends React.Component {
  state = {
    loading: true,
    searchText: "",
    parameterId: null,
    categoryId: null,
    quizType: null,
    complexity: null,
    status: null,
    offset: 0,
    choiceMediaUrl: "",
    openChoiceMediaModal: false
  };

  componentWillMount = async () => {
    this.fetchRequest = await this.props.fetchQuestionList(
      this.props.user.Authorization,
      {
        offset: 0,
        fields: {}
      }
    );
    this.setState({ loading: false });
  };

  onSearch = e => {
    this.setState(
      {
        searchText: e.target.value,
        loading: true
      },
      () => {
        setTimeout(async () => {
          await this.props.fetchQuestionList(this.props.user.Authorization, {
            searchText: this.state.searchText,
            offset: 0,
            fields: {}
          });
          this.setState({ loading: false });
        }, 1000);
      }
    );
  };

  onCategoryChange = value => {
    this.setState({
      categoryId: value
    });
  };

  onParameterChange = value => {
    this.setState({
      parameterId: value
    });
  };

  onQuizTypeChange = val => {
    this.setState({
      quizType: val
    });
  };

  onStatusChange = val => {
    this.setState({
      status: val
    });
  };

  onComplexityChange = val => {
    this.setState({
      complexity: val
    });
  };

  clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }

  onFilterClick = async () => {
    const data = {
      questionsparameters__parameter_id: this.state.parameterId,
      questionscategories__category_id: this.state.categoryId,
      complexity: this.state.complexity,
      quiz_type: this.state.quizType,
      status: this.state.status
    };
    const fields = data;

    this.clean(fields);

    await this.props.fetchQuestionList(this.props.user.Authorization, {
      searchText: this.state.searchText,
      fields,
      offset: 0
    });
    this.setState({ loading: false });
  };

  fields = [
    {
      key: "1",
      type: "input",
      label: "Search Question",
      placeholder: "Search Question",
      onChange: this.onSearch
    },

    {
      key: "4",
      type: "select",
      label: "Quiz Type",
      labelInValue: false,
      placeholder: "Select Quiz Type",
      onChange: this.onQuizTypeChange,
      options: [
        {
          key: "all",
          value: null,
          label: "All"
        },
        {
          key: "mcq",
          value: "mcq",
          label: "MCQ"
        },
        {
          key: "dd",
          value: "dd",
          label: "Drag & Drop"
        },
        {
          key: "kp",
          value: "kp",
          label: "Key Phrases"
        }
      ]
    },
    {
      key: "5",
      type: "select",
      label: "Status",
      placeholder: "Select status",
      onChange: this.onStatusChange,
      options: [
        {
          key: "all",
          value: null,
          label: "All"
        },
        {
          key: "live",
          value: 2,
          label: "Live"
        },
        {
          key: "draft",
          value: 1,
          label: "Draft"
        }
      ]
    }
  ];

  onPublish = async id => {
    this.setState({ loading: true });
    await this.props.updateQuestion(id, this.props.user.Authorization, {
      status: 2
    });
    const data = {
      questionsparameters__parameter_id: this.state.parameterId,
      questionscategories__category_id: this.state.categoryId,
      quiz_type: this.state.quizType,
      status: this.state.status
    };
    const fields = data;

    this.clean(fields);

    await this.props.fetchQuestionList(this.props.user.Authorization, {
      searchText: this.state.searchText,
      fields,
      offset: this.state.offset
    });
    this.setState({ loading: false });
  };

  onUnpublish = async id => {
    this.setState({ loading: true });
    await this.props.updateQuestion(id, this.props.user.Authorization, {
      status: 1
    });
    const data = {
      questionsparameters__parameter_id: this.state.parameterId,
      questionscategories__category_id: this.state.categoryId,
      quiz_type: this.state.quizType,
      status: this.state.status
    };
    const fields = data;

    this.clean(fields);

    await this.props.fetchQuestionList(this.props.user.Authorization, {
      searchText: this.state.searchText,
      fields,
      offset: this.state.offset
    });
    this.setState({ loading: false });
  };

  onDelete = async id => {
    this.setState({ loading: true });
    await this.props.updateQuestion(id, this.props.user.Authorization, {
      flag: 0
    });
    const data = {
      questionsparameters__parameter_id: this.state.parameterId,
      questionscategories__category_id: this.state.categoryId,
      quiz_type: this.state.quizType,
      status: this.state.status
    };
    const fields = data;

    this.clean(fields);

    await this.props.fetchQuestionList(this.props.user.Authorization, {
      searchText: this.state.searchText,
      fields,
      offset: this.state.offset
    });
    this.setState({ loading: false });
  };

  tableColumnName = () => {
    const column = [
      {
        title: "ID",
        key: "id",
        render: record => <a href={`/question/${record.id}`}>{record.id}</a>
      },
      {
        title: "Text",
        dataIndex: "text",
        key: "text"
      },
      {
        title: "Question Type",
        dataIndex: "quiz_type",
        key: "quiz_type",
        width: 100
      },
      {
        title: "Answer",
        key: "answer",
        render: (record, i) => (
          <span key={i} style={{ maxWidth: "385px" }}>
            {Array.isArray(record.choices3) === true ? (
              record.choices3.length === 0 ? null : (
                record.choices3.map(item => {
                  let style = {
                    marginTop: "7px",
                    background: "#fff",
                    border: "0.5px solid #999999",
                    color: "#222222",
                    maxWidth: "200px",
                    whiteSpace: "normal"
                  };

                  if (item.id === record.answer) {
                    style = {
                      marginTop: "7px",
                      background: "rgba(46, 220, 60, 1)",
                      border: "0.5px solid #2edc3c",
                      color: "#ffffff",
                      maxWidth: "200px",
                      whiteSpace: "normal"
                    };
                  }

                  return (
                    <span key={item.id}>
                      {item.type === "text" ? (
                        <span>
                          {item.choice ? (
                            <Tag key={item.id} style={style}>
                              {item.choice}
                            </Tag>
                          ) : null}
                        </span>
                      ) : (
                        <span>
                          {item.media.media_type === "image" ? (
                            <Icon
                              onClick={() =>
                                this.openChoiceMediaView(item.media)
                              }
                              type="file-image"
                              style={{
                                background:
                                  item.id === record.answer
                                    ? "rgba(46, 220, 60, 1)"
                                    : "#fff",
                                cursor: "pointer",
                                borderRadius: "5px",
                                padding: "3px 5px",
                                marginTop: "7px",
                                marginRight: "7px",
                                border: "0.5px solid #999999"
                              }}
                            />
                          ) : null}
                        </span>
                      )}
                    </span>
                  );
                })
              )
            ) : (
              <span>No Choices Available</span>
            )}
          </span>
        )
      },
      {
        title: "Actions",
        key: "action",
        width: 180,
        render: record => (
          <span>
            <Link to={`/question/edit/${record.id}`}>
              <Icon type="edit" theme="filled" style={{ fontSize: "16px" }} />
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              title="Delete"
              onConfirm={() => this.onDelete(record.id)}
            >
              {/* <Button type="link">Delete</Button> */}
              <Icon
                type="delete"
                theme="filled"
                style={{ fontSize: "16px", color: "red" }}
              />
            </Popconfirm>
            <Divider type="vertical" />
            <Link to={`/question/map/choices/${record.id}`}>Map Choices</Link>
            <Divider type="vertical" />
            <Popconfirm
              title={record.status === 1 ? "Publish" : "Unpublish"}
              onConfirm={
                record.status === 1
                  ? () => this.onPublish(record.id)
                  : () => this.onUnpublish(record.id)
              }
            >
              <Button
                type="link"
                style={
                  record.status === 1 ? { color: "#22a4ef" } : { color: "red" }
                }
              >
                {record.status === 1 ? "Publish" : "Unpublish"}
              </Button>
            </Popconfirm>
          </span>
        )
      }
    ];
    return column;
  };

  openChoiceMediaView = media => {
    if (
      media.media_url === null ||
      media.media_url === "" ||
      media.media_url === " " ||
      media.media_url === undefined
    ) {
      message.warning("No Media Image");
    } else {
      this.setState({ choiceMediaUrl: media.media_url });
      this.setState({ openChoiceMediaModal: true });
    }
  };

  handlePageChange = async pageNumber => {
    const offset = pageNumber * 10 - 10;
    this.setState({ loading: true });
    const data = {
      questionsparameters__parameter_id: this.state.parameterId,
      questionscategories__category_id: this.state.categoryId,
      quiz_type: this.state.quizType,
      status: this.state.status
    };
    const fields = data;

    this.clean(fields);

    await this.props.fetchQuestionList(this.props.user.Authorization, {
      searchText: this.state.searchText,
      fields,
      offset: offset
    });
    this.setState({ loading: false, offset });
  };

  render() {
    const columnName = this.tableColumnName();
    const tableData = this.props.questions;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title={<div className="card-title">Filters</div>}>
          <Row>
            <Filters fields={this.fields} />
          </Row>
          <Row>
            <Form>
              <Col span={8} style={{ padding: "0 24px" }}>
                <Form.Item label="Complexity">
                  {getFieldDecorator("complexity", {
                    initialValue: this.state.complexity
                  })(
                    <Complexity
                      onChange={this.onComplexityChange}
                      mode="single"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "0 24px" }}>
                <Form.Item label="Categories">
                  {getFieldDecorator("category", {
                    initialValue: this.state.categoryId
                  })(
                    <Categories
                      onChange={this.onCategoryChange}
                      mode="single"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "0 24px" }}>
                <Form.Item label="Parameters">
                  {getFieldDecorator("parameter", {
                    initialValue: this.state.parameterId
                  })(
                    <Parameters
                      onChange={this.onParameterChange}
                      mode="single"
                      categories={[this.state.categoryId]}
                    />
                  )}
                </Form.Item>
              </Col>
            </Form>
          </Row>

          <div style={{ textAlign: "right" }}>
            <Button
              onClick={this.onFilterClick}
              type="primary"
              shape="round"
              size="large"
              style={{ marginTop: 10, marginRight: 10 }}
            >
              Filter
            </Button>
          </div>
        </Card>
        <Card
          type="inner"
          style={{ marginTop: 20 }}
          title={<div className="card-title">Questions List</div>}
        >
          <MButton>
            <Link to="/questions/add">Add Question</Link>
          </MButton>
          <Table
            dataSource={tableData}
            loading={this.state.loading}
            columns={columnName}
            rowKey={row => row.id}
            pagination={false}
          />
          <div style={{ marginTop: "20px" }}>
            Showing {this.state.offset + 1}-{this.state.offset + 10} results
            from {this.props.count} records
            <span style={{ textAlign: "right" }}>
              <Pagination
                current={(this.state.offset + 10) / 10}
                onChange={this.handlePageChange}
                total={this.props.count}
              />
            </span>
          </div>
        </Card>
        <Modal
          closable={true}
          onCancel={() => this.setState({ openChoiceMediaModal: false })}
          visible={this.state.openChoiceMediaModal}
          footer={false}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={this.state.choiceMediaUrl}
              alt="choiceMediaUrl"
              style={{ maxHeight: "500px" }}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    questions: Object.values(state.question.questionsList),
    count: state.question.count
  };
};

export default connect(mapStateToProps, { fetchQuestionList, updateQuestion })(
  Form.create()(QuestionList)
);
