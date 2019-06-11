import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../../../history";
import {
  fetchOrganizations,
  getOrganizationModules,
  fetchModuleSimulations,
  fetchDefaultModuleSimulations,
  createSimulationOrgMapping,
  clearModules
} from "../../../actions";
import { Form, Select, Card } from "antd";
import MButton from "../../Elements/MButton";

class SituationMapping extends Component {
  state = {
    organization_id: null,
    module_id: null,
    simulations: [],
    defaultSimulations: [],
    moduleValue: null
  };

  componentDidMount() {
    this.props.fetchOrganizations(this.props.user.Authorization);
    this.props.heading("Simulation Mapping");
  }

  onOrgSelect = value => {
    this.setState(
      {
        organization_id: value,
        module_id: null,
        simulations: []
      },
      () => {
        this.props.form.setFieldsValue({
          question_id_list: this.state.simulations,
          module_id: null
        });
        this.props.getOrganizationModules(
          this.state.organization_id,
          this.props.user.Authorization
        );
      }
    );
  };

  onModuleSelect = value => {
    this.setState({ module_id: value, simulations: [] }, async () => {
      this.props.form.setFieldsValue({
        question_id_list: this.state.simulations
      });
      await this.props.fetchModuleSimulations(
        this.props.user.Authorization,
        this.state.module_id
      );
      const queryParams = {
        organization_id: this.state.organization_id,
        module_id: this.state.module_id
      };
      await this.props.fetchDefaultModuleSimulations(
        this.props.user.Authorization,
        queryParams
      );

      const filteredList = this.props.defaultSimulations.map(simulation => {
        return simulation.question_id.toString();
      });
      this.setState({
        defaultSimulations: filteredList
      });
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

  filterModules = (val, option) => {
    const filteredList = this.props.organizationModules.filter(
      ({ module__name }) => {
        if (
          module__name.toLowerCase().includes(val) ||
          option.key.includes(val)
        ) {
          return true;
        }
        return false;
      }
    );
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].module_id.toString() === option.key) return true;
    }
    return false;
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.question_id_list = JSON.stringify(values.question_id_list);
        this.props.createSimulationOrgMapping(
          this.props.user.Authorization,
          values
        );
        history.push("/simulation");
      } else {
        console.log(err);
      }
    });
  };

  handleSimulationChange = value => {
    this.setState({
      simulations: value
    });
    this.props.form.setFieldsValue({
      question_id_list: this.state.simulations
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.state);
    return (
      <div>
        <Card>
          <Form onSubmit={this.onSubmit} style={{ padding: 20 }}>
            <Form.Item label="Organization Names">
              {getFieldDecorator("organization_id", {
                rules: [
                  { required: true, message: "Please select an organization" }
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
            <Form.Item label="Modules:">
              {getFieldDecorator("module_id", {
                rules: [
                  {
                    required: true,
                    message: "Please select a module"
                  }
                ]
              })(
                <Select
                  allowClear
                  showSearch
                  filterOption={this.filterModules}
                  placeholder="Select a module"
                  onChange={this.onModuleSelect}
                >
                  {this.props.organizationModules.map(module => {
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
            {this.state.defaultSimulations.length > 0 ? (
              <Form.Item label="Simulations:">
                {getFieldDecorator("question_id_list", {
                  initialValue: this.state.defaultSimulations,
                  rules: [
                    {
                      required: true,
                      message: "Please select a simulation"
                    }
                  ]
                })(
                  <Select
                    allowClear
                    showSearch
                    placeholder="Select a simulation"
                    mode="multiple"
                    onChange={this.handleSimulationChange}
                  >
                    {this.props.moduleSimulations.map(simulation => {
                      return (
                        <Select.Option
                          value={simulation.id}
                          key={simulation.id}
                        >{`${simulation.text.substring(0, 50)}... (${
                          simulation.id
                        })`}</Select.Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            ) : null}
            <Form.Item>
              <MButton>Map Simulation</MButton>
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
    organizations: Object.values(state.organization.organizationList),
    organizationModules: Object.values(state.organization.organizationModules),
    moduleSimulations: Object.values(state.simulation.moduleSimulations),
    defaultSimulations: state.simulation.defaultSimulations
  };
};

export default connect(
  mapStateToProps,
  {
    fetchOrganizations,
    getOrganizationModules,
    fetchModuleSimulations,
    createSimulationOrgMapping,
    fetchDefaultModuleSimulations,
    clearModules
  }
)(Form.create()(SituationMapping));
