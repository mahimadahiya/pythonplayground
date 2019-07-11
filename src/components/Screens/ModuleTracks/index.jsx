import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Divider, Card } from "antd";
import { fetchModuleTracks } from "../../../actions";
import MButton from "../../Elements/MButton";

class TrackList extends React.Component {
  state = { loading: true };

  componentWillMount = async () => {
    if (this.props.tracks.length === 0) {
      await this.props.fetchModuleTracks(this.props.user.Authorization);
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
    }
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
        <Card
          type="inner"
          loading={this.state.loading}
          title={<div className="card-title">Track List</div>}
        >
          <Table
            dataSource={tableData}
            columns={columnName}
            rowKey={row => row.id}
            footer={() => (
              <MButton>
                <Link to="/tracks/create">Create Track</Link>
              </MButton>
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
