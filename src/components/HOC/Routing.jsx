import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";

import Sidebar from "./Sidebar";
import Login from "../Screens/Login/Login";
import TrackList from "../Screens/ModuleTracks";
import CreateTrack from "../Screens/ModuleTracks/create";
import ModuleMapping from "../Screens/ModuleTracks/ModuleMapping";
import UserTrackMapping from "../Screens/ModuleTracks/UserMapping";
import OrganizationMap from "../Screens/Organization/OrganizationMap";
import HomeScreen from "../Screens/Dashboard/TrackList";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        user.isSignedIn ? (
          <Sidebar>
            <Component {...props} />
          </Sidebar>
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

class Routing extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <React.Fragment>
          <Switch>
            <PrivateRoute path="/" component={HomeScreen} user={user} exact />
            <PrivateRoute
              path="/tracks"
              component={TrackList}
              user={user}
              exact
            />
            <PrivateRoute
              path="/tracks/create"
              component={CreateTrack}
              user={user}
              exact
            />
            <PrivateRoute
              path="/tracks/map/module/:id"
              component={ModuleMapping}
              user={user}
              exact
            />
            <PrivateRoute
              path="/tracks/map/user"
              component={UserTrackMapping}
              user={user}
              exact
            />
            <PrivateRoute
              path="/organization/map"
              component={OrganizationMap}
              user={user}
              exact
            />
          </Switch>
        </React.Fragment>
        <Route
          path="/login"
          render={() => <Login cookies={this.props.cookies} />}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userAuth };
};

export default connect(
  mapStateToProps,
  {}
)(Routing);
