import React from "react";
import { connect } from "react-redux";
import { Descriptions, Card, Form, Select } from "antd";
import { fetchModuleTracks, createModuleTrackMapping } from "../../../actions";
import { getOrganizationModules } from "../../../actions";
import MButton from "../../Elements/MButton";

class ModuleMapping extends React.Component {
  state = {
    track: null
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

  componentDidMount() {
    this.props.heading("Map Module");
    this.props.fetchModuleTracks(this.props.user.Authorization);
  }

  fetchTrack = () => {
    if (this.state.track === null) {
      const trackDetail = this.props.tracks[this.props.match.params.id];
      this.setState({
        track: trackDetail
      });
    }
  };

  componentDidUpdate() {
    if (this.state.track !== null) return;
    new Promise((res, rej) => {
      this.fetchTrack();
      res();
    }).then(() => {
      const orgId = this.state.track.organization_id;
      this.props.getOrganizationModules(orgId, this.props.user.Authorization);
    });
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
        {this.state.track ? (
          <Card title="Details">
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
        ) : null}

        {this.props.modules ? (
          <Card title="Select Modules" style={{ marginTop: "10px" }}>
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
