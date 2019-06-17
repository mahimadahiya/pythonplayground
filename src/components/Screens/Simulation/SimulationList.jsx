import React from "react";
import { connect } from "react-redux";
import { Table, Card, Pagination } from "antd";
import { fetchSimulationList } from "../../../actions";

class SimulationList extends React.Component {
  componentWillMount = async () => {
    await this.props.fetchSimulationList(this.props.user.Authorization, 0);
  };

  componentDidMount() {
    this.props.heading("Simulation List");
  }

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
        render: text => {
          return <div style={{ minHeight: "100px" }}>{text}</div>;
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
            // footer={() => (
            //   <MButton>
            //     <Link to="/tracks/create">Create Track</Link>
            //   </MButton>
            // )}
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
