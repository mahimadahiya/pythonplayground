import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Divider, Button, Card } from "antd";
import { fetchModuleTracks } from "../../../actions";

class TrackList extends React.Component {
  componentWillMount = () => {
    this.props.fetchModuleTracks(this.props.user.Authorization);
  };

  componentDidMount() {
    this.props.heading("Tracks");
  }

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
        key: "name"
      },
      {
        title: "Organization ID",
        dataIndex: "organization_id",
        key: "organization_id"
      },
      {
        title: "Organization",
        dataIndex: "organization__name",
        key: "organization__name"
      },
      {
        title: "Going Live At",
        dataIndex: "starts_at",
        key: "starts_at"
      },
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
            <Link to={`/tracks/map/module/${record.id}`}>Map Module</Link>
            <Divider type="vertical" />
          </span>
        )
      }
    ];
    return column;
  };

  render() {
    const columnName = this.tableColumnName();
    const tableData = this.props.tracks;
    return (
      <div>
        <Card>
          <Table
            className="bg-white"
            dataSource={tableData}
            columns={columnName}
            footer={() => (
              <Button type="primary">
                <Link to="/tracks/create">Create Track</Link>
              </Button>
            )}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tracks: Object.values(state.moduleTrack.moduleTracks),
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { fetchModuleTracks }
)(TrackList);
