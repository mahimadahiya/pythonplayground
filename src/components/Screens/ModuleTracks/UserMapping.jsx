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
  Switch,
  Card,
  Row,
  Col,
  Transfer,
  Checkbox,
  Table
} from "antd";
import MButton from "../../Elements/MButton";

class UserTrackMapping extends React.Component {
  state = {
    mode: 0,
    organization_id: null,
    selectedTracks: [],
    selectedBatches: [],
    loading: true,
    users: [],
    plainUsers: [],
    targetKeys: []
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

  onBatchSelect = e => {
    this.setState({ selectedBatches: e });
  };

  onOrgSelect = async e => {
    this.setState({ organization_id: e, selectedTracks: [] }, () => {
      this.props.form.setFieldsValue({
        selectedTracks: []
      });
      this.loadBatchTrackData();
    });
    await this.props.fetchUsers(this.props.user.Authorization, { orgId: e }, 0);
    this.setState({
      users: this.props.users
    });
    // const usersList = this.props.users.map(user => {
    //   return {
    //     name: user.name,
    //     description: user.email
    //   };
    // });
    // this.setState({
    //   users: usersList
    // });
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

  async onSubmit(values) {
    const query = {
      organization_id: values.organization_id,
      mode: this.state.mode,
      selectedBatches: `${values.selectedBatches}`,
      selectedTracks: `${values.selectedTracks}`
    };
    this.setState({ loading: true });
    await this.props.createUserTrackMapping(
      this.props.user.Authorization,
      query
    );
    this.setState({ loading: false });
  }

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
    await this.props.fetchUsers(
      this.props.user.Authorization,
      { orgId: this.state.organization_id, batchId: id },
      0
    );
    this.setState({
      users: this.props.users
    });
    // const usersList = this.props.users.map(user => {
    //   return {
    //     key: user.id.toString(),
    //     title: user.name,
    //     description: user.email
    //   };
    // });
    // this.setState({
    //   users: usersList
    // });
  };

  // handleTransferChange = (targetKeys, direction, moveKeys) => {
  //   this.setState({
  //     targetKeys
  //   });
  // };

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
    }
  ];

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.state);
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
              <Col span={16}>
                <Table columns={this.columns} dataSource={this.state.users} />
              </Col>
            </Row>

            {/* <Transfer
              showSearch
              targetKeys={this.state.targetKeys}
              dataSource={this.state.users}
              onChange={this.handleTransferChange}
              render={user => user.title}
            /> */}

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
    organizationTracks: Object.values(state.organization.organizationTracks)
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
