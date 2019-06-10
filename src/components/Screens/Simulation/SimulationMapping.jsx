import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import DisplayFormOrganizationMap from "../Form/DisplayFormSimulationMapping";
import {
  fetchOrganizations,
  getOrganizationModules,
  fetchModuleSimulations,
  createSimulationOrgMapping
} from "../../../actions";

class SituationMapping extends Component {
  state = {
    organization_id: null,
    module_id: null
  };

  componentDidMount() {
    this.props.fetchOrganizations(this.props.user.Authorization);
    this.props.heading("Simulation Mapping");
  }

  onOrgSelect = value => {
    this.setState(
      {
        organization_id: value
      },
      () => {
        this.props.getOrganizationModules(
          this.state.organization_id,
          this.props.user.Authorization
        );
      }
    );
  };

  onModuleSelect = value => {
    this.setState({ module_id: value }, () => {
      this.props.fetchModuleSimulations(
        this.props.user.Authorization,
        this.state.module_id
      );
    });
  };

  onSubmit = formValues => {
    formValues.question_id_list = JSON.stringify(formValues.question_id_list);
    this.props.createSimulationOrgMapping(
      this.props.user.Authorization,
      formValues
    );
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
    moduleSimulations: Object.values(state.simulation.moduleSimulations)
  };
};

export default connect(
  mapStateToProps,
  {
    fetchOrganizations,
    getOrganizationModules,
    fetchModuleSimulations,
    createSimulationOrgMapping
  }
)(SituationMapping);
