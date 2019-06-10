import React from "react";
import { connect } from "react-redux";
import { Table, Card } from "antd";
import { fetchSimulationList } from "../../../actions";

class SimulationList extends React.Component {
  componentWillMount = () => {
    this.props.fetchSimulationList(this.props.user.Authorization);
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
        key: "text"
      },
      {
        title: "Media Type",
        dataIndex: "media_type",
        key: "media_type"
      },
      {
        title: "Media URL",
        dataIndex: "media_url",
        key: "media_url"
      }
    ];
    return column;
  };

  renderTableData = () => {};

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
    simulations: state.simulation.simulations,
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { fetchSimulationList }
)(SimulationList);
