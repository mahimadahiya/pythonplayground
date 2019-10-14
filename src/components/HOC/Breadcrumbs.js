import React from "react";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const DynamicBreadCrumbMapModule = ({ match }) => {
  return <span>{`Map Module ${match.params.id}`}</span>;
};

const routes = [
  {
    path: "/tracks",
    breadcrumb: "Tracks"
  },
  {
    path: "/tracks/create",
    breadcrumb: "Create"
  },
  {
    path: "/tracks/map/module/:id",
    breadcrumb: DynamicBreadCrumbMapModule
  },
  {
    path: "/simulation/map",
    breadcrumb: "Simulation Mapping"
  },
  {
    path: "/simulation",
    breadcrumb: "Simulation"
  },
  {
    path: "/games/dondon",
    breadcrumb: "DonDon List"
  },
  {
    path: "/games/dondon/upload",
    breadcrumb: "DonDon Upload"
  },
  {
    path: "/games/dondon/edit",
    breadcrumb: "DonDon Edit"
  },
  {
    path: "/tracks/map/user",
    breadcrumb: "Map User"
  },
  {
    path: "/questions",
    breadcrumb: "Questions"
  },
  {
    path: "/role-play",
    breadcrumb: "Role-Play"
  }
];

const Breadcrumbs = withBreadcrumbs(routes, { disableDefaults: true })(
  ({ breadcrumbs }) => (
    <React.Fragment>
      <Breadcrumb>
        {breadcrumbs.map(({ breadcrumb }) => {
          return (
            <Breadcrumb.Item key={breadcrumb.key}>
              <Link to={breadcrumb.key}>{breadcrumb}</Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </React.Fragment>
  )
);

export default Breadcrumbs;
