import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";

import Sidebar from "./Sidebar";
// import Login from "../../components/Screens/Login/Login";
import Login2 from "../../components/Screens/Login/Login2";
import TrackList from "../../components/Screens/ModuleTracks/";
import CreateTrack from "../../components/Screens/ModuleTracks/create";
import ModuleMapping from "../../components/Screens/ModuleTracks/ModuleMapping";
import UserTrackMapping from "../../components/Screens/ModuleTracks/UserMapping";
import HomeScreen from '../Screens/Dashboard/TrackList'

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
            <PrivateRoute
              path="/"
              component={HomeScreen}
              user={user}
              exact
            />
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
          </Switch>
        </React.Fragment>
        <Route
          path="/login"
          render={() => <Login2 cookies={this.props.cookies} />}
        />
        <Route
          path="/logout"
          render={() => <Login2 cookies={this.props.cookies} />}
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
