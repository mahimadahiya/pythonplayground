import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import DisplayFormOrganizationMap from "../Form/DisplayFormOrganizationMap";
import { fetchOrganizations, getOrganizationModules } from "../../../actions";

class OrganizationMap extends Component {
  state = {
    organization: null
  };

  componentDidMount() {
    this.props.fetchOrganizations(this.props.user.Authorization);
  }

  onOrgSelect = value => {
    this.setState(
      {
        organization: value
      },
      () => {
        // console.log(this.state.organization);
        this.props.getOrganizationModules(
          this.state.organization,
          this.props.user.Authorization
        );
      }
    );
  };

  render() {
    // console.log(this.state);
    return (
      <div>
        <Formik
          onSubmit={this.onSubmit}
          render={formikProps => (
            <DisplayFormOrganizationMap
              {...formikProps}
              listOrgs={this.props.organizations}
              listModules={this.props.organizationModules}
              handlers={{
                onOrgSelect: this.onOrgSelect
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
    organizationModules: Object.values(state.organization.organizationModules)
  };
};

export default connect(
  mapStateToProps,
  {
    fetchOrganizations,
    getOrganizationModules
  }
)(OrganizationMap);
