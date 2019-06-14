import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Card, Pagination, Input, Row, Form, Select } from "antd";
import { fetchDonDonList } from "../../../../actions";
// import MButton from "../../Elements/MButton";

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

  componentDidMount() {
    this.props.heading("Don Don List");
  }

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
        key: "text"
      },
      {
        title: "Instructions",
        dataIndex: "instructions",
        key: "instructions"
      },
      {
        title: "Actions",
        key: "action",

        render: record => (
          <span>
            <Link to="/edit">Edit</Link>
          </span>
        )
      }
    ];
    return column;
  };

  handlePageChange = pageNumber => {
    const offset = pageNumber * 10 - 10;
    this.props.fetchDonDonList(
      this.props.user.Authorization,
      {
        searchText: this.state.searchText,
        entity_type: this.state.entity_type,
        status: this.state.status
      },
      offset
    );
  };

  onSearch = e => {
    this.setState(
      {
        searchText: e.target.value
      },
      () => {
        this.props.fetchDonDonList(
          this.props.user.Authorization,
          {
            searchText: this.state.searchText,
            entity_type: this.state.entity_type,
            status: this.state.status
          },
          0
        );
      }
    );
  };

  onEntityChange = value => {
    this.setState(
      {
        entity_type: value.key
      },
      () => {
        this.props.fetchDonDonList(
          this.props.user.Authorization,
          {
            searchText: this.state.searchText,
            entity_type: this.state.entity_type,
            status: this.state.status
          },
          0
        );
      }
    );
  };

  onStatusChange = value => {
    this.setState(
      {
        status: value.key
      },
      () => {
        this.props.fetchDonDonList(
          this.props.user.Authorization,
          {
            searchText: this.state.searchText,
            entity_type: this.state.entity_type,
            status: this.state.status
          },
          0
        );
      }
    );
  };

  render() {
    const columnName = this.tableColumnName();
    return (
      <div>
        <Card type="inner" loading={this.state.loading}>
          <Row>
            <Form.Item label="Search Input">
              <Input
                placeholder="Search by ID or Text"
                width="20"
                onPressEnter={this.onSearch}
                onChange={this.onSearchChange}
              />
            </Form.Item>
            <Form
              layout="inline"
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              <Form.Item label="Entity Type">
                <Select
                  placeholder="Filter by Entity Type"
                  onChange={this.onEntityChange}
                  style={{ minWidth: "300px" }}
                  labelInValue
                >
                  <Select.Option value={1} key={1}>
                    BM
                  </Select.Option>
                  <Select.Option value={2} key={2}>
                    FM
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Status">
                <Select
                  placeholder="Filter by Status"
                  onChange={this.onStatusChange}
                  style={{ minWidth: "300px" }}
                  labelInValue
                >
                  <Select.Option value={1} key={1}>
                    Live
                  </Select.Option>
                  <Select.Option value={2} key={2}>
                    Draft
                  </Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Row>
          <Row>
            <Table
              dataSource={this.props.list}
              columns={columnName}
              rowKey={row => row.id}
              pagination={false}
              // footer={() => (
              //   <MButton>
              //     <Link to="/tracks/create">Create Track</Link>
              //   </MButton>
              // )}
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
