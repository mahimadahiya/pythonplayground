import React from "react";
import { connect } from "react-redux";
import { Table, Card, Pagination, Alert, Button } from "antd";
import { fetchSimulationList } from "../../../actions";
import history from "../../../history";

class SimulationList extends React.Component {
  componentWillMount = async () => {
    await this.props.fetchSimulationList(this.props.user.Authorization, 0);
  };

  componentDidMount() {
    this.props.heading("Simulation List");
  }

  onAddClick = (e, id) => {
    history.push("/simulation/add/" + id);
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
            message = "Draft";
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
                    style={{ width: "60%", display: "inline", marginRight: 20 }}
                  />
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

  handlePageChange = pageNumber => {
    const offset = pageNumber * 10 - 10;
    this.props.fetchSimulationList(this.props.user.Authorization, offset);
  };

  render() {
    const columnName = this.tableColumnName();
    const tableData = this.props.simulations;
    return (
      <div>
        <Card type="inner">
          <Table
            dataSource={tableData}
            columns={columnName}
            rowKey={row => row.id}
            pagination={false}
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
    simulations: state.simulation.simulations,
    user: state.userAuth,
    count: state.simulation.count
  };
};

export default connect(
  mapStateToProps,
  { fetchSimulationList }
)(SimulationList);
