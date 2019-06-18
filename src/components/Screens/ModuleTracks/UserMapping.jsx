import React from "react";
import { connect } from "react-redux";

import {
  fetchModuleTracks,
  fetchOrganizations,
  fetchOrganizationBatches,
  fetchOrganizationTracks,
  createUserTrackMapping,
  fetchUsers
} from "../../../actions";

import {
  Form,
  Select,
  Card,
  Row,
  Col,
  Table,
  Icon,
  Pagination,
  Tag
} from "antd";
import MButton from "../../Elements/MButton";

class UserTrackMapping extends React.Component {
  state = {
    mode: 0,
    organization_id: null,
    selectedTracks: [],
    users: [],
    selectedUsers: [],
    plainUsers: [],
    targetKeys: [],
    batchId: null,
    loading: true,
    loadingUsers: false,
    pageNumber: 1
  };

  setMode = e => {
    this.setState({ mode: e === true ? 1 : 0 });
  };

  async componentWillMount() {
    if (this.props.organizations.length === 0) {
      await this.props.fetchOrganizations(this.props.user.Authorization);
    }
    this.setState({
      loading: false
    });
  }

  componentDidMount() {
    this.props.heading("Map Users");
  }

  onTrackSelect = e => {
    this.setState({ selectedTracks: e });
  };

  onOrgSelect = async e => {
    this.setState(
      { organization_id: e, selectedTracks: [], loadingUsers: true },
      () => {
        this.props.form.setFieldsValue({
          selectedTracks: []
        });
        this.loadBatchTrackData();
      }
    );
    await this.props.fetchUsers(this.props.user.Authorization, { orgId: e }, 0);
    this.setState({
      users: this.props.users,
      loadingUsers: false
    });
  };

  async loadBatchTrackData() {
    const query = { organization_id: this.state.organization_id };
    this.setState({ loading: true });
    await this.props.fetchOrganizationTracks(
      this.props.user.Authorization,
      query
    );
    await this.props.fetchOrganizationBatches(
      this.props.user.Authorization,
      query
    );
    this.setState({ loading: false });
  }

  onSubmit = e => {
    // const query = {
    //   organization_id: values.organization_id,
    //   mode: this.state.mode,
    //   selectedBatches: `${values.selectedBatches}`,
    //   selectedTracks: `${values.selectedTracks}`
    // };
    // this.setState({ loading: true });
    // await this.props.createUserTrackMapping(
    //   this.props.user.Authorization,
    //   query
    // );
    // this.setState({ loading: false });
    e.preventDefault();
    this.props.form.validateFields(async (err, formProps) => {
      if (!err) {
        const users = this.state.selectedUsers.map(user => user.id);
        const formValues = {
          selected_org_id: this.state.organization_id,
          selected_tracks: JSON.stringify(formProps.selectedTracks),
          selected_users: JSON.stringify(users)
        };
        await this.props.createUserTrackMapping(
          this.props.user.Authorization,
          formValues
        );
      } else {
        console.log(err);
      }
    });
  };

  filterOrganizations = (val, option) => {
    const filteredList = this.props.organizations.filter(({ name }) => {
      if (name.toLowerCase().includes(val) || option.key.includes(val)) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].id.toString() === option.key) return true;
    }
    return false;
  };

  filterBatches = (val, option) => {
    const filteredList = this.props.organizationBatches.filter(({ name }) => {
      if (name.toLowerCase().includes(val) || option.key.includes(val)) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].id.toString() === option.key) return true;
    }
    return false;
  };

  getUsers = async id => {
    this.setState({
      batchId: id
    });
    await this.props.fetchUsers(
      this.props.user.Authorization,
      { orgId: this.state.organization_id, batchId: id },
      0
    );
    this.setState({
      users: this.props.users
    });
  };

  columns = [
    {
      title: "ID",
      dataIndex: "id"
    },
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Tracks",
      dataIndex: "track_details",
      key: "tracks",
      render: tracks => (
        <span>
          {tracks.map(track => (
            <Tag color="blue" key={track.track_id}>
              {track.track__name}
            </Tag>
          ))}
        </span>
      )
    }
  ];

  columnsSelected = [
    {
      title: "ID",
      dataIndex: "id"
    },
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "",
      render: record => (
        <div style={{ textAlign: "center" }}>
          <Icon
            type="delete"
            theme="twoTone"
            twoToneColor="#ff0000"
            onClick={() => {
              const users = this.state.selectedUsers.filter(user => {
                return user.id !== record.id;
              });
              this.setState({
                selectedUsers: users
              });
            }}
          />
        </div>
      )
    }
  ];

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const users = [...this.state.selectedUsers, ...selectedRows];
      const filteredUsers = users.filter(function(item, pos) {
        return users.indexOf(item) === pos;
      });
      this.setState({
        selectedUsers: filteredUsers
      });
    },
    getCheckboxProps: record => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name
    }),
    onSelect: (record, selected) => {
      if (!selected) {
        const users = this.state.selectedUsers.filter(user => {
          return user.id !== record.id;
        });
        this.setState({
          selectedUsers: users
        });
      }
    }
  };

  handlePageChange = async pageNumber => {
    this.setState({ loadingUsers: true });
    const offset = pageNumber * 10 - 10;
    await this.props.fetchUsers(
      this.props.user.Authorization,
      {
        orgId: this.state.organization_id,
        batchId: this.state.batchId
      },
      offset
    );
    this.setState({
      users: this.props.users,
      loadingUsers: false,
      pageNumber
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card>
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="Organizations">
              {getFieldDecorator("organization_id", {
                rules: [
                  {
                    required: true,
                    message: "Please select an organization"
                  }
                ]
              })(
                <Select
                  allowClear
                  showSearch
                  size="large"
                  filterOption={this.filterOrganizations}
                  placeholder="Select an organization"
                  onChange={this.onOrgSelect}
                >
                  {this.props.organizations.map(organization => {
                    return (
                      <Select.Option
                        value={organization.id}
                        key={organization.id}
                      >{`${organization.name} (${
                        organization.id
                      })`}</Select.Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Tracks">
              {getFieldDecorator("selectedTracks", {
                rules: [
                  {
                    required: true,
                    message: "Please select a track"
                  }
                ]
              })(
                <Select
                  allowClear
                  placeholder="Select tracks"
                  size="large"
                  mode="multiple"
                  defaultActiveFirstOption={false}
                >
                  {this.props.organizationTracks.map(track => {
                    return (
                      <Select.Option value={track.id} key={track.id}>{`${
                        track.name
                      } (${track.id})`}</Select.Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Batches">
              {getFieldDecorator("selectedBatches", {
                rules: [
                  {
                    required: true,
                    message: "Please select a batch"
                  }
                ]
              })(
                <Select
                  filterOption={this.filterBatches}
                  placeholder="Select a batch"
                  size="large"
                  onChange={this.getUsers}
                >
                  {this.props.organizationBatches.map(batch => {
                    return (
                      <Select.Option value={batch.id} key={batch.id}>{`${
                        batch.name
                      } (${batch.id})`}</Select.Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Row>
              <Col span={16} style={{ padding: 10, paddingLeft: 0 }}>
                <Card
                  title="Users"
                  loading={this.state.loadingUsers}
                  bodyStyle={{ padding: "0" }}
                  headStyle={{ textAlign: "center" }}
                >
                  <Table
                    rowSelection={this.rowSelection}
                    rowKey={record => record.id}
                    columns={this.columns}
                    pagination={false}
                    dataSource={this.state.users}
                  />
                  <Pagination
                    onChange={this.handlePageChange}
                    total={this.props.count}
                    current={this.state.pageNumber}
                  />
                </Card>
              </Col>

              <Col
                span={8}
                style={{ padding: 10, paddingRight: 0, marginBottom: 10 }}
              >
                <Card
                  title="Selected Users"
                  bodyStyle={{ padding: "0" }}
                  headStyle={{ textAlign: "center" }}
                >
                  <Table
                    rowKey={record => record.id}
                    pagination={false}
                    columns={this.columnsSelected}
                    dataSource={this.state.selectedUsers}
                  />
                </Card>
              </Col>
            </Row>

            <Form.Item>
              <MButton>Map User</MButton>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    tracks: Object.values(state.moduleTrack.moduleTracks),
    organizations: Object.values(state.organization.organizationList),
    organizationBatches: Object.values(state.organization.organizationBatches),
    users: state.organization.users,
    organizationTracks: Object.values(state.organization.organizationTracks),
    count: state.organization.count
  };
};

export default connect(
  mapStateToProps,
  {
    fetchModuleTracks,
    fetchOrganizations,
    fetchOrganizationTracks,
    fetchOrganizationBatches,
    createUserTrackMapping,
    fetchUsers
  }
)(Form.create()(UserTrackMapping));
