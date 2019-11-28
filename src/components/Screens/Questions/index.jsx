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
  Icon
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
    offset: 0
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
        key: "quiz_type"
      },
      {
        title: "Actions",
        key: "action",
        width: 360,
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
      offset: this.state.offset
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
