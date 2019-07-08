import React from "react";
import { connect } from "react-redux";
import qs from "querystring";
import { Table, Card, Pagination, Row, Button, Col, Form } from "antd";
import { fetchComprehensionsList } from "../../../actions";
import history from "../../../history";
// import pyLearningApi from "../../../../apis/pylearning";
import Filters from "../../Elements/Helper/Filters";
import Categories from "../../Elements/Categories";

//TODO: Filters not working yet

class ComprehensionList extends React.Component {
  state = {
    loading: true,
    searchText: "",
    entity_type: null,
    status: null,
    parameterId: null,
    categoryId: null
  };

  componentWillMount = async () => {
    if (this.props.list.length === 0) {
      await this.props.fetchComprehensionsList(this.props.user.Authorization, {
        offset: 0,
        fields: "{}"
      });
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.props.heading("Comprehensions List");
  }

  onEdit = record => {
    history.push("/comprehensions/edit/" + record.id);
  };

  tableColumnName = () => {
    const column = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "60%",
        render: text => {
          return <div style={{ minHeight: "60px" }}>{text}</div>;
        }
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type"
      },
      {
        title: "Complexity",
        dataIndex: "complexity",
        key: "complexity"
      }
      // {
      //   title: "Actions",
      //   key: "action",

      //   render: record => (
      //     <span>
      //       <Button
      //         type="link"
      //         onClick={() => this.onEdit(record)}
      //         style={{ marginRight: 10 }}
      //       >
      //         Edit
      //       </Button>
      //       <Icon type="delete" onClick={() => this.onDelete(record)} />
      //     </span>
      //   )
      // }
    ];
    return column;
  };

  // onDelete = async record => {
  //   await pyLearningApi(this.props.user.Authorization).post(
  //     "/v2/game/dondon/upload/delete",
  //     qs.stringify({ id: record.id })
  //   );
  //   this.props.fetchDonDonList(
  //     this.props.user.Authorization,
  //     { searchText: "" },
  //     0
  //   );
  // };

  handlePageChange = async pageNumber => {
    const offset = pageNumber * 10 - 10;
    this.setState({ loading: true });
    await this.props.fetchQuestionList(this.props.user.Authorization, {
      offset
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

  onCategoryChange = value => {
    this.setState({
      categoryId: value
    });
  };

  onParameterChange = e => {
    this.setState({
      parameterId: e.target.value
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
      quiz_type: this.state.quizType,
      status: this.state.status
    };
    const fields = data;

    this.clean(fields);

    await this.props.fetchComprehensionsList(this.props.user.Authorization, {
      searchText: this.state.searchText,
      fields: JSON.stringify(fields),
      offset: 0
    });
    this.setState({ loading: false });
  };

  fields = [
    {
      key: "1",
      type: "input",
      label: "Search by Name or ID",
      placeholder: "Search by Name or ID",
      onChange: this.onSearch
    },
    {
      key: "2",
      type: "input",
      inputType: "number",
      label: "Parameter ID",
      placeholder: "Enter Parameter ID",
      onChange: this.onParameterChange
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

  render() {
    const columnName = this.tableColumnName();
    return (
      <div>
        <Card>
          <Filters fields={this.fields} />
          <Form>
            <Row>
              <Col span={12} style={{ padding: "0 24px" }}>
                <Categories
                  onChange={this.onCategoryChange}
                  mode="single"
                  value={this.state.categoryId}
                />
              </Col>
            </Row>
          </Form>
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
        <Card style={{ marginTop: 20 }}>
          <Row>
            <Table
              loading={this.state.loading}
              dataSource={this.props.list}
              columns={columnName}
              rowKey={row => row.id}
              pagination={false}
            />
          </Row>
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
    list: state.comprehension.list,
    count: state.comprehension.count,
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { fetchComprehensionsList }
)(ComprehensionList);
