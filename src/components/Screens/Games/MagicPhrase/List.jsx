import React from "react";
import { connect } from "react-redux";
import qs from "querystring";
import { Table, Card, Pagination, Row, Button, Icon } from "antd";
import { fetchMagicphraseList } from "../../../../actions";
import history from "../../../../history";
import pyLearningApi from "../../../../apis/pylearning";
import Filters from "../../../Elements/Helper/Filters";

class DonDonList extends React.Component {
  state = { loading: true, searchText: "", entity_type: null, status: null };

  componentWillMount = async () => {
    if (this.props.list.length === 0) {
      await this.props.fetchMagicphraseList(
        this.props.user.Authorization,
        { searchText: "" },
        0
      );
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.props.heading("MagicPhrase List");
  }

  onEdit = record => {
    history.push("/games/magicphrase/edit/" + record.id);
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
        title: "Title",
        dataIndex: "title",
        key: "title",

        width: "40%",
        render: text => {
          return <div style={{ minHeight: "100px" }}>{text}</div>;
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

  onDelete = record => {
    pyLearningApi(this.props.user.Authorization).post(
      "/v2/game/ctp/upload_panel/delete",
      qs.stringify({ id: record.id })
    );
  };

  handlePageChange = async pageNumber => {
    const offset = pageNumber * 10 - 10;
    this.setState({ loading: true });
    await this.props.fetchMagicphraseList(
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
          this.props.fetchMagicphraseList(
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
          this.props.fetchMagicphraseList(
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
          this.props.fetchMagicphraseList(
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
        { value: null, label: "None" },
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
      options: [{ value: 1, label: "Live" }, { value: 2, label: "Draft" }],
      key: 3
    }
  ];

  render() {
    const columnName = this.tableColumnName();
    return (
      <div>
        <Card type="inner" loading={this.state.loading}>
          <Row>
            <Filters fields={this.fields} />
          </Row>
          <Row>
            <Table
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
    list: state.magicphrase.list,
    count: state.magicphrase.count,
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { fetchMagicphraseList }
)(DonDonList);
