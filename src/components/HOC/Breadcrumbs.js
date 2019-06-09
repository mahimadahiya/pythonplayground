import React from "react";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";

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
    path: "/tracks/map/module",
    breadcrumb: "Map Module"
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
