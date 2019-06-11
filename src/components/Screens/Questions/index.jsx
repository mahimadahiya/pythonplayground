import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Divider, Card, Table } from "antd";

import { fetchQuestionList } from "../../../actions";

class QuestionList extends React.Component {
  componentWillMount = () => {
    this.props.heading("Questions");
    this.props.fetchQuestionList(this.props.user.Authorization);
  };

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
      // {
      //   title: "Choices",
      //   dataIndex: "choices2",
      //   key: "choices2"
      // },
      {
        title: "Actions",
        key: "action",
        width: 360,
        render: record => (
          <span>
            <Link to={`/tracks/edit/${record.id}`}>Edit</Link>
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

  render() {
    const columnName = this.tableColumnName();
    const tableData = this.props.questions;
    return (
      <div>
        <Card type="inner">
          <Table
            dataSource={tableData}
            columns={columnName}
            rowKey={row => row.id}
            // footer={() => (
            //   <MButton>
            //     <Link to="/tracks/create">Create Track</Link>
            //   </MButton>
            // )}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    questions: Object.values(state.question.questionsList)
  };
};

export default connect(
  mapStateToProps,
  { fetchQuestionList }
)(QuestionList);
