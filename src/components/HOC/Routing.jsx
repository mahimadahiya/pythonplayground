import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";

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
import UploadDonDon from "../Screens/Games/DonDon/Upload";
import UploadMagicPhrase from "../Screens/Games/MagicPhrase/Upload";
import ListDonDon from "../Screens/Games/DonDon/List";
import ListMagicPhrase from "../Screens/Games/MagicPhrase/List";
import EditDonDon from "../Screens/Games/DonDon/Edit";
import EditMagicPhrase from "../Screens/Games/MagicPhrase/Edit";
import QuestionEdit from "../Screens/Questions/edit";
import AddResponse from "../Screens/Simulation/AddResponse";
import EditResponse from "../Screens/Simulation/EditResponse";
import QuestionEdit from "../Screens/Questions/edit";
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
              path="/simulation/add/:id"
              component={AddResponse}
              user={user}
              exact
            />
            <PrivateRoute
              path="/simulation/edit/:id"
              component={EditResponse}
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
              path="/question/edit/:id"
              component={QuestionEdit}
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
              component={UploadDonDon}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/dondon"
              component={ListDonDon}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/dondon/edit/:id"
              component={EditDonDon}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/magicphrase/upload"
              component={UploadMagicPhrase}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/magicphrase"
              component={ListMagicPhrase}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/magicphrase/edit/:id"
              component={EditMagicPhrase}
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

export default connect(mapStateToProps)(Routing);
