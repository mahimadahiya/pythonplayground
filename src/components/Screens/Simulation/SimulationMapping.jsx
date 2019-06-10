import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import history from "../../../history";
import DisplayFormOrganizationMap from "../Form/DisplayFormSimulationMapping";
import {
  fetchOrganizations,
  getOrganizationModules,
  fetchModuleSimulations,
  fetchDefaultModuleSimulations,
  createSimulationOrgMapping,
  clearModules
} from "../../../actions";

class SituationMapping extends Component {
  state = {
    organization_id: null,
    module_id: null,
    defaultSimulations: [],
    moduleValue: null
  };

  componentDidMount() {
    this.props.fetchOrganizations(this.props.user.Authorization);
    this.props.heading("Simulation Mapping");
  }

  onOrgSelect = value => {
    this.props.clearModules();
    this.setState(
      {
        organization_id: value,
        module_id: null,
        moduleValue: "",
        defaultSimulations: []
      },
      () => {
        this.props.getOrganizationModules(
          this.state.organization_id,
          this.props.user.Authorization
        );
      }
    );
  };

  componentDidUpdate() {}

  onModuleSelect = value => {
    this.setState({ module_id: value }, () => {
      this.props.fetchModuleSimulations(
        this.props.user.Authorization,
        this.state.module_id
      );
      const queryParams = {
        organization_id: this.state.organization_id,
        module_id: this.state.module_id
      };
      this.props.fetchDefaultModuleSimulations(
        this.props.user.Authorization,
        queryParams
      );
      setTimeout(() => {
        console.log("state", this.props.defaultSimulations);
        const filteredList = this.props.defaultSimulations.map(simulation => {
          return simulation.question_id;
        });
        console.log(filteredList);
        this.setState({
          defaultSimulations: filteredList
        });
      }, 1000);
    });
  };

  onSubmit = formValues => {
    formValues.question_id_list = JSON.stringify(formValues.question_id_list);
    this.props.createSimulationOrgMapping(
      this.props.user.Authorization,
      formValues
    );
    history.push("/simulation");
  };

  render() {
    return (
      <div>
        <Formik
          onSubmit={this.onSubmit}
          render={formikProps => (
            <DisplayFormOrganizationMap
              {...formikProps}
              listOrgs={this.props.organizations}
              listModules={this.props.organizationModules}
              listSimulations={this.props.moduleSimulations}
              listDefaultSimulations={this.state.defaultSimulations}
              moduleValue={this.state.moduleValue}
              handlers={{
                onOrgSelect: this.onOrgSelect,
                onModuleSelect: this.onModuleSelect
              }}
            />
          )}
        />
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
)(SituationMapping);
