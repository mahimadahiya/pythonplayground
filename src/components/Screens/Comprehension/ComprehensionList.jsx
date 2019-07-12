import React from "react";
import { connect } from "react-redux";
import {
  Table,
  Card,
  Pagination,
  Row,
  Button,
  Col,
  Form,
  Switch,
  Input
} from "antd";
import { fetchComprehensionsList } from "../../../actions";
import history from "../../../history";
// import pyLearningApi from "../../../../apis/pylearning";
import Filters from "../../Elements/Helper/Filters";
import Categories from "../../Elements/Categories";
import Parameters from "../../Elements/Parameters";

//TODO: Filters not working yet

class ComprehensionList extends React.Component {
  state = {
    loading: true,
    searchText: "",
    entity_type: null,
    status: null,
    parameterId: null,
    categoryId: null,
    comprehension_type: 1,
    articleId: null
  };

  componentWillMount = async () => {
    if (this.props.list.length === 0) {
      await this.props.fetchComprehensionsList(this.props.user.Authorization, {
        offset: 0,
        fields: { comprehension_type: this.state.comprehension_type }
      });
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
    }
  };

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
    const fields = {
      comprehension_type: this.state.comprehension_type,
      comprehensionfmarticle__fmarticle_id: this.state.articleId
    };
    await this.props.fetchComprehensionsList(this.props.user.Authorization, {
      offset,
      searchText: this.state.searchText,
      fields
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
          const fields = {
            comprehension_type: this.state.comprehension_type,
            comprehensionfmarticle__fmarticle_id: this.state.articleId
          };
          await this.props.fetchComprehensionsList(
            this.props.user.Authorization,
            {
              offset: 0,
              searchText: this.state.searchText,
              fields
            }
          );
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
    await this.props.fetchComprehensionsList(this.props.user.Authorization, {
      searchText: this.state.searchText,
      fields: {
        comprehension_type: this.state.comprehension_type,
        comprehensionfmarticle__fmarticle_id: this.state.articleId
      },
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

  onComprehensionTypeChange = async val => {
    await this.setState({
      comprehension_type: val === true ? 2 : 1,
      loading: true
    });
    await this.props.fetchComprehensionsList(this.props.user.Authorization, {
      offset: 0,
      fields: { comprehension_type: this.state.comprehension_type }
    });
    await this.setState({ loading: false });
  };

  onArticleChange = e => {
    this.setState({
      articleId: e.target.value
    });
  };

  render() {
    const columnName = this.tableColumnName();
    return (
      <div>
        <Card title={<div className="card-title">Filters</div>}>
          <Row>
            <Filters fields={this.fields} />
            <Col span={8} style={{ padding: "0 24px" }}>
              <Form.Item label="Comprehension Type">
                <Switch
                  unCheckedChildren="BM"
                  checkedChildren="FM"
                  checked={this.state.comprehension_type === 2}
                  onChange={this.onComprehensionTypeChange}
                />
              </Form.Item>
            </Col>
          </Row>
          {this.state.comprehension_type === 1 ? (
            <Row>
              <Form>
                <Col span={8} style={{ padding: "0 24px" }}>
                  <Categories
                    onChange={this.onCategoryChange}
                    mode="single"
                    value={this.state.categoryId}
                  />
                </Col>
                <Col span={8} style={{ padding: "0 24px" }}>
                  <Parameters
                    onChange={this.onParameterChange}
                    mode="single"
                    categories={[this.state.categoryId]}
                    value={this.state.parameterId}
                  />
                </Col>
              </Form>
            </Row>
          ) : (
            <Col span={8} style={{ padding: "0 24px" }}>
              <label htmlFor="article">Article ID</label>
              <Input
                placeholder="FM Article ID"
                name="article"
                onChange={this.onArticleChange}
                value={this.state.articleId}
              />
            </Col>
          )}

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
          style={{ marginTop: 20 }}
          title={<div className="card-title">Comprehension List</div>}
        >
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
