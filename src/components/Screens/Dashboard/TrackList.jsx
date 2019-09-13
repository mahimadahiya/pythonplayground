import React from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";
import Login from "../Login/Login";

class HomeScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.user.isSignedIn ? <Redirect to="/questions" /> : <Login />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userAuth };
};

export default connect(
  mapStateToProps,
  {}
)(HomeScreen);
