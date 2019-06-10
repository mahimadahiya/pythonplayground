import React from "react";
import { Card, Alert } from "antd";
import { Formik } from "formik";
import { connect } from "react-redux";

import history from "../../../history";
import { loginUser, logoutUser } from "../../../actions";
import displayForm from "../Form/DisplayFormLogin";
import logo from "../../../assets/logo.png";

class NormalLoginForm extends React.Component {
  state = {
    error: null
  };

  setCookies = () => {
    if (this.props.userAuth.isSignedIn) {
      const { cookies } = this.props;
      const {
        Authorization,
        isSignedIn,
        userId,
        userEmail,
        userName
      } = this.props.userAuth;
      cookies.set("Authorization", Authorization, { path: "/" });
      cookies.set("isSignedIn", isSignedIn, { path: "/" });
      cookies.set("userId", userId, { path: "/" });
      cookies.set("userEmail", userEmail, { path: "/" });
      cookies.set("userName", userName, { path: "/" });
      history.push("/");
    }
  };

  componentWillMount() {
    this.setCookies();
  }

  componentDidUpdate = prevProps => {
    if (this.props.userAuth.groupId === 1) {
      this.setCookies();
    } else {
      if (!this.state.error) {
        this.setState(
          {
            error: true
          },
          () => {
            this.props.logoutUser();
          }
        );
      }
    }
  };

  onSubmit = formValues => {
    this.props.loginUser(formValues);
  };

  render() {
    return (
      <div className="center">
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img src={logo} style={{ margin: "auto 0" }} alt="logo" />
        </div>
        <Card className="shadow">
          <Formik onSubmit={this.onSubmit} render={displayForm} />
          {this.state.error ? (
            <Alert
              message="Invalid User"
              type="error"
              showIcon
              style={{ margin: "20px 0" }}
            />
          ) : null}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { userAuth: state.userAuth, cookies: ownProps.cookies };
};

export default connect(
  mapStateToProps,
  { loginUser, logoutUser }
)(NormalLoginForm);
