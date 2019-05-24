import React from "react";
import Login from "./Login";
import history from "../history";
import TrackList from "./ModuleTracks/TrackList";
import { Route, Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { setUserAuthValue } from "../actions";
class App extends React.Component {

  AuthCheck = () => {
    const { cookies } = this.props.cookies;

    if (!cookies.isSignedIn){
      console.log("1")
      return <Login cookies={this.props.cookies} />;
    }
    if (!this.props.userAuth.isSignedIn) {
      console.log("2");
      this.props.setUserAuthValue(cookies);
    }
    if (cookies.isSignedIn && this.props.userAuth.isSignedIn){
      console.log("3");
      return <TrackList />;
    }

  };

  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <div>
            <Switch>
              <Route
                path="/login"
                exact
                render={() => <Login cookies={this.props.cookies} />}
              />
              <Route path="/" exact render={() => this.AuthCheck()} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { userAuth: state.userAuth, cookies: ownProps.cookies };
};

const wrappedApp = connect(
  mapStateToProps,
  { setUserAuthValue }
)(App);
export default withCookies(wrappedApp);
