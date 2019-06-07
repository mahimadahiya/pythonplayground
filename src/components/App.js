import React from "react";
import history from "../history";
import { Route, Router } from "react-router-dom";
import Routing from "./HOC/Routing";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { setUserAuthValue } from "../actions";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props.cookies;
    if (cookies.isSignedIn) {
      this.props.setUserAuthValue(cookies);
    }
  }

  render() {
    // throw new Error("Test error boundary");
    return (
      <div>
        <Router history={history}>
          <Route
            path="/*"
            render={() => <Routing cookies={this.props.cookies} />}
          />
        </Router>
      </div>
    );
  }
}

const wrappedApp = connect(
  null,
  { setUserAuthValue }
)(App);

export default withCookies(wrappedApp);
