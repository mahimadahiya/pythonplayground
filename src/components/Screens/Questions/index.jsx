import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Divider, Card, Table, Pagination } from "antd";
import { fetchQuestionList } from "../../../actions";
import Filters from "../../Elements/Helper/Filters";
import MButton from "../../Elements/MButton";

class QuestionList extends React.Component {
  state = {
    loading: true
  };

  componentWillMount = async () => {
    this.props.heading("Questions");
    await this.props.fetchQuestionList(this.props.user.Authorization, {
      offset: 0
    });
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
            offset: 0
          });
          this.setState({ loading: false });
        }, 1000);
      }
    );
  };

  fields = [
    {
      key: "1",
      type: "input",
      label: "Search Question",
      placeholder: "Search Question",
      onChange: this.onSearch
    }
  ];

  tableColumnName = () => {
    const column = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
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
            <Link to={`/question/edit/${record.id}`}>Edit</Link>
            <Divider type="vertical" />
            <Link to={`/tracks/delete/${record.id}`}>Delete</Link>
            <Divider type="vertical" />
            <Link to={`/question/map/choices/${record.id}`}>Map Choices</Link>
            <Divider type="vertical" />
          </span>
        )
      }
    ];
    return column;
  };

  handlePageChange = async pageNumber => {
    const offset = pageNumber * 10 - 10;
    this.setState({ loading: true });
    await this.props.fetchQuestionList(this.props.user.Authorization, {
      offset
    });
    this.setState({ loading: false });
  };

  render() {
    const columnName = this.tableColumnName();
    const tableData = this.props.questions;
    return (
      <div>
        <Filters fields={this.fields} />
        <Card
          type="inner"
          loading={this.state.loading}
          style={{ marginTop: 20 }}
        >
          <Table
            dataSource={tableData}
            columns={columnName}
            rowKey={row => row.id}
            pagination={false}
            footer={() => (
              <MButton>
                <Link to="/questions/add">Add Question</Link>
              </MButton>
            )}
          />
          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <Pagination
              onChange={this.handlePageChange}
              total={this.props.count}
            />
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

export default connect(
  mapStateToProps,
  { fetchQuestionList }
)(QuestionList);
