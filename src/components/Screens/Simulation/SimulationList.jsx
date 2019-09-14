import React from "react";
import { connect } from "react-redux";
import { Table, Card, Pagination, Alert, Button, Row } from "antd";
import { fetchSimulationList } from "../../../actions";
import history from "../../../history";
import qs from "querystring";
import adminPanelApi from "../../../apis/adminPanel";
import { source } from "../../../apis/cancel";
import Filters from "../../Elements/Helper/Filters";

class SimulationList extends React.Component {
  state = {
    loading: true,
    offset: 0,
    searchText: ""
  };

  componentDidMount = async () => {
    await this.props.fetchSimulationList(this.props.user.Authorization, {
      offset: 0,
      searchText: this.state.searchText
    });
    this.setState({ loading: false });
  };

  onAddClick = (e, id) => {
    history.push("/simulation/add/" + id);
  };

  onEditClick = (e, id) => {
    history.push("/simulation/edit/" + id);
  };

  onDeleteClick = async (e, row) => {
    console.log(row);
    const formData = {
      id: row.expert_response_id,
      name: row.expert_response_name,
      flag: 0,
      keywords: row.expert_response_keywords
    };
    await adminPanelApi(this.props.user.Authorization).post(
      "/v1/admin/edit/expert_response",
      qs.stringify(formData)
    );
    this.props.fetchSimulationList(
      this.props.user.Authorization,
      this.state.offset
    );
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
        key: "text",
        width: "60%",
        render: (text, row) => {
          let status = null;
          let message = null;
          if (row.expert_response_status && row.expert_response_status <= 3) {
            status = "warning";
            message = "Under Process";
          } else if (row.expert_response_status === 4) {
            status = "success";
            message = row.expert_response_name;
          } else {
            status = "error";
            message = "No response found";
          }
          return (
            <div style={{ minHeight: "100px" }}>
              <div>{text}</div>
              {status ? (
                <div style={{ marginTop: 20 }}>
                  <Alert
                    message={message}
                    type={status}
                    showIcon
                    style={{
                      display: "inline",
                      marginRight: 20
                    }}
                  />
                  {status === "success" || status === "warning" ? (
                    <span>
                      <Button
                        type="primary"
                        onClick={e => this.onEditClick(e, row.id)}
                        style={{ marginRight: 10 }}
                      >
                        Edit
                      </Button>
                      <Button
                        type="danger"
                        onClick={e => this.onDeleteClick(e, row)}
                      >
                        Delete
                      </Button>
                    </span>
                  ) : null}
                  {status === "error" ? (
                    <Button
                      type="primary"
                      onClick={e => this.onAddClick(e, row.id)}
                    >
                      Add
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        }
      },
      {
        title: "Media Type",
        dataIndex: "media_type",
        key: "media_type"
      },
      {
        title: "Media URL",
        dataIndex: "media_url",
        key: "media_url",
        render: (text, row, index) => {
          return <a href={text}>Link</a>;
        }
      }
    ];
    return column;
  };

  componentWillUnmount() {
    source.cancel();
  }

  onSearch = e => {
    this.setState(
      {
        searchText: e.target.value,
        loading: true
      },
      () => {
        setTimeout(async () => {
          await this.props.fetchSimulationList(this.props.user.Authorization, {
            searchText: this.state.searchText,
            offset: 0
          });
          this.setState({ loading: false });
        }, 1000);
      }
    );
  };

  handlePageChange = async pageNumber => {
    const offset = pageNumber * 10 - 10;
    this.setState({ loading: true });
    await this.props.fetchSimulationList(this.props.user.Authorization, {
      searchText: this.state.searchText,
      offset
    });
    this.setState({ loading: false, offset });
  };

  fields = [
    {
      key: "1",
      type: "input",
      label: "Search Simulation",
      placeholder: "Search Simulation",
      onChange: this.onSearch
    }
  ];

  render() {
    const columnName = this.tableColumnName();
    const tableData = this.props.simulations;
    return (
      <div>
        <Card title="Filters">
          <Row>
            <Filters fields={this.fields} />
          </Row>
        </Card>
        <Card title={<div className="card-title">Simulation List</div>}>
          <Table
            dataSource={tableData}
            columns={columnName}
            rowKey={row => row.id}
            loading={this.state.loading}
            pagination={false}
          />
          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <Pagination
              onChange={this.handlePageChange}
              total={this.props.count}
              current={(this.state.offset + 10) / 10}
            />
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    simulations: state.simulation.simulations,
    user: state.userAuth,
    count: state.simulation.count
  };
};

export default connect(
  mapStateToProps,
  { fetchSimulationList }
)(SimulationList);
