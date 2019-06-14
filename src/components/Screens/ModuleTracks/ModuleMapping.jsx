import React from "react";
import { connect } from "react-redux";
import { Descriptions, Card, Form, Select } from "antd";
import { fetchModuleTracks, createModuleTrackMapping } from "../../../actions";
import { getOrganizationModules } from "../../../actions";
import MButton from "../../Elements/MButton";

class ModuleMapping extends React.Component {
  state = {
    track: null,
    loading: true
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, formValues) => {
      if (!err) {
        const data = {
          track_id: this.state.track.id,
          module_id_list: JSON.stringify(formValues.module_id_list)
        };
        this.props.createModuleTrackMapping(
          this.props.user.Authorization,
          data
        );
      } else {
        console.log(err);
      }
    });
  };

  async componentDidMount() {
    this.props.heading("Map Module");
    if (this.props.tracks.length === 0) {
      await this.props.fetchModuleTracks(this.props.user.Authorization);
    }
    this.setState({ loading: false });
  }

  fetchTrack = () => {
    if (this.state.track === null) {
      this.setState({ loading: true });
      const trackDetail = this.props.tracks[this.props.match.params.id];
      this.setState({
        track: trackDetail
      });
    }
  };

  async componentDidUpdate() {
    if (this.state.track !== null) return;

    await this.fetchTrack();
    const orgId = this.state.track.organization_id;
    await this.props.getOrganizationModules(
      orgId,
      this.props.user.Authorization
    );

    this.setState({ loading: false });
  }

  filterModules = (val, option) => {
    const filteredList = this.props.modules.filter(({ module__name }) => {
      if (module__name.toLowerCase().includes(val)) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].module_id.toString() === option.key) return true;
    }
    return false;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.track === null) return null;
    return (
      <div>
        <div>
          <div>
            <Card title="Details" loading={this.state.loading}>
              <Descriptions bordered column="2">
                <Descriptions.Item label="Name">
                  {this.state.track.name}
                </Descriptions.Item>
                <Descriptions.Item label="Organization Name">{`${
                  this.state.track.organization__name
                } (${this.state.track.organization_id})`}</Descriptions.Item>

                <Descriptions.Item label="Starts At">
                  {this.state.track.starts_at}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>
          <div>
            {this.props.modules ? (
              <Card
                title="Select Modules"
                style={{ marginTop: "10px" }}
                loading={this.state.loading}
              >
                <Form onSubmit={this.onSubmit}>
                  <Form.Item label="Modules">
                    {getFieldDecorator("module_id_list", {
                      rules: [
                        {
                          required: true,
                          message: "Please select a module"
                        }
                      ]
                    })(
                      <Select mode="multiple" filterOption={this.filterModules}>
                        {this.props.modules.map(module => {
                          return (
                            <Select.Option
                              value={module.module_id}
                              key={module.module_id}
                            >{`${module.module__name} (${
                              module.module_id
                            })`}</Select.Option>
                          );
                        })}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item>
                    <MButton>Map Module</MButton>
                  </Form.Item>
                </Form>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    tracks: state.moduleTrack.moduleTracks,
    modules: Object.values(state.organization.organizationModules)
  };
};

export default connect(
  mapStateToProps,
  { fetchModuleTracks, getOrganizationModules, createModuleTrackMapping }
)(Form.create()(ModuleMapping));
