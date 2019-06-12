import React from "react";
import { connect } from "react-redux";

import {
  fetchModuleTracks,
  fetchOrganizations,
  fetchOrganizationBatches,
  fetchOrganizationTracks,
  createUserTrackMapping
} from "../../../actions";

import { Form, Select, Switch, Card } from "antd";
import MButton from "../../Elements/MButton";

class UserTrackMapping extends React.Component {
  state = {
    mode: 0,
    organization_id: null,
    selectedTracks: [],
    selectedBatches: [],
    loading: true
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

  onOrgSelect = e => {
    this.setState({ organization_id: e }, () => this.loadBatchTrackData());
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

            <div style={{ textAlign: "center" }}>
              <Form.Item label="Modes">
                {getFieldDecorator("mode", {})(
                  <Switch
                    onChange={this.setMode}
                    unCheckedChildren="Batch Wise"
                    checkedChildren="Organization Wide"
                  />
                )}
              </Form.Item>
              {this.state.mode === 0 ? (
                <Form.Item label="Batches">
                  {getFieldDecorator("selectedBatches", {
                    rules: [
                      {
                        required: true,
                        message: "Please select a batch"
                      }
                    ]
                  })(
                    <Select mode="multiple" filterOption={this.filterBatches}>
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
              ) : null}
            </div>
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
    createUserTrackMapping
  }
)(Form.create()(UserTrackMapping));
