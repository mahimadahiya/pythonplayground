import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";

// import Sidebar from "./Sidebar";
import Login from "../Screens/Login/Login";
import TrackList from "../Screens/ModuleTracks";
import CreateTrack from "../Screens/ModuleTracks/create";
import ModuleMapping from "../Screens/ModuleTracks/ModuleMapping";
import UserTrackMapping from "../Screens/ModuleTracks/UserMapping";
import HomeScreen from "../Screens/Dashboard/TrackList";
import SimulationMapping from "../Screens/Simulation/SimulationMapping";
import SimulationList from "../Screens/Simulation/SimulationList";
import QuestionList from "../Screens/Questions/index";
import MapQuestionChoices from "../Screens/Questions/mapChoices";
import Upload from "../Screens/Games/DonDon/Upload";
const Sidebar = React.lazy(() => import("./Sidebar"));

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
              path="/simulation/map"
              component={SimulationMapping}
              user={user}
              exact
            />
            <PrivateRoute
              path="/simulation"
              component={SimulationList}
              user={user}
              exact
            />
            <PrivateRoute
              path="/questions"
              component={QuestionList}
              user={user}
              exact
            />
            <PrivateRoute
              path="/question/map/choices/:id"
              component={MapQuestionChoices}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/dondon/upload"
              component={Upload}
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
