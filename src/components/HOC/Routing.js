import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// import Sidebar from "./Sidebar";
import Login from "../../components/Screens/Login/Login";
import Login2 from "../../components/Screens/Login/Login2";
import TrackList from "../../components/Screens/ModuleTracks/";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        user.isSignedIn ? (
          // <Sidebar>  <Sidebar />
            <Component {...props} />
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
          <PrivateRoute
            path="/dashboard"
            component={TrackList}
            user={user}
          />
          <PrivateRoute path="/tracks" component={TrackList} user={user} />
        </React.Fragment>
        <Route
          path="/login"
          render={() => <Login cookies={this.props.cookies} />}
        />
        <Route
          path="/bhak/2"
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
