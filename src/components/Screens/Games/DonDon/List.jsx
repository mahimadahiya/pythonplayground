import React from "react";
import { connect } from "react-redux";
import qs from "querystring";
import { Table, Card, Pagination, Row, Button, Icon } from "antd";
import { fetchDonDonList } from "../../../../actions";
import history from "../../../../history";
import pyLearningApi from "../../../../apis/pylearning";
import Filters from "../../../Elements/Helper/Filters";

class DonDonList extends React.Component {
  state = { loading: true, searchText: "", entity_type: null, status: null };

  componentWillMount = async () => {
    if (this.props.list.length === 0) {
      await this.props.fetchDonDonList(
        this.props.user.Authorization,
        { searchText: "" },
        0
      );
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
    }
  };

  onEdit = record => {
    history.push("/games/dondon/edit/" + record.id);
  };

  tableColumnName = () => {
    const column = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "Entity ID",
        dataIndex: "entity_id",
        key: "entity_id"
      },
      {
        title: "Text",
        dataIndex: "text",
        key: "text",
        width: "60%",
        render: text => {
          return <div style={{ minHeight: "60px" }}>{text}</div>;
        }
      },
      {
        title: "Entity Type",
        dataIndex: "entity_type",
        key: "instructions",
        render: record => {
          return <div>{record === 1 ? "BM" : "FM"}</div>;
        }
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: record => {
          return <div>{record === 1 ? "Live" : "Draft"}</div>;
        }
      },
      {
        title: "Actions",
        key: "action",

        render: record => (
          <span>
            <Button
              type="link"
              onClick={() => this.onEdit(record)}
              style={{ marginRight: 10 }}
            >
              Edit
            </Button>
            <Icon type="delete" onClick={() => this.onDelete(record)} />
          </span>
        )
      }
    ];
    return column;
  };

  onDelete = async record => {
    await pyLearningApi(this.props.user.Authorization).post(
      "/v2/game/dondon/upload/delete",
      qs.stringify({ id: record.id })
    );
    this.props.fetchDonDonList(
      this.props.user.Authorization,
      { searchText: "" },
      0
    );
  };

  handlePageChange = async pageNumber => {
    const offset = pageNumber * 10 - 10;
    this.setState({ loading: true });
    await this.props.fetchDonDonList(
      this.props.user.Authorization,
      {
        searchText: this.state.searchText,
        entity_type: this.state.entity_type,
        status: this.state.status
      },
      offset
    );
    this.setState({ loading: false });
  };

  onSearch = e => {
    this.setState(
      {
        searchText: e.target.value
      },
      () => {
        setTimeout(() => {
          this.props.fetchDonDonList(
            this.props.user.Authorization,
            {
              searchText: this.state.searchText,
              entity_type: this.state.entity_type,
              status: this.state.status
            },
            0
          );
        }, 1000);
      }
    );
  };

  onEntityChange = value => {
    this.setState(
      {
        entity_type: value.key
      },
      () => {
        setTimeout(() => {
          this.props.fetchDonDonList(
            this.props.user.Authorization,
            {
              searchText: this.state.searchText,
              entity_type: this.state.entity_type,
              status: this.state.status
            },
            0
          );
        }, 1000);
      }
    );
  };

  onStatusChange = value => {
    this.setState(
      {
        status: value.key
      },
      () => {
        setTimeout(() => {
          this.props.fetchDonDonList(
            this.props.user.Authorization,
            {
              searchText: this.state.searchText,
              entity_type: this.state.entity_type,
              status: this.state.status
            },
            0
          );
        }, 1000);
      }
    );
  };

  fields = [
    {
      type: "input",
      label: "Search",
      placeholder: "Search by ID or Text",
      onChange: this.onSearch,
      key: 1
    },
    {
      type: "select",
      label: "Entity Type",
      placeholder: "Filter by Entity Type",
      onChange: this.onEntityChange,
      labelInValue: true,
      options: [
        { value: null, label: "All" },
        { value: 1, label: "BM" },
        { value: 2, label: "FM" }
      ],
      key: 2
    },
    {
      type: "select",
      label: "Status",
      placeholder: "Filter by Status",
      onChange: this.onStatusChange,
      labelInValue: true,

      options: [
        { value: null, label: "All" },
        { value: 1, label: "Live" },
        { value: 2, label: "Draft" }
      ],
      key: 3
    }
  ];

  render() {
    const columnName = this.tableColumnName();
    return (
      <div>
        <Card
          title={<div className="card-title">Filters</div>}
        >
          <Row>
            <Filters fields={this.fields} />
          </Row>
        </Card>
        <Card
          style={{ marginTop: 20 }}
          title={<div className="card-title">DonDon List</div>}
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
    list: state.dondon.list,
    count: state.dondon.count,
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { fetchDonDonList }
)(DonDonList);
