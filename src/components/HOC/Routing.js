import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Sidebar from "./Sidebar";
import Login from "../Login";
import TrackList from "../ModuleTracks/TrackList";

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
    console.log(this.props);
    return (
      <div>
        <React.Fragment>
          <PrivateRoute path="/tracklist" component={TrackList} user={user} />
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
