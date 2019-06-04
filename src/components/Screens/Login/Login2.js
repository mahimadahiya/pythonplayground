import React from "react";
import { Card } from "antd";
import { Formik } from "formik";
import { connect } from "react-redux";
import history from "../../../history";
import { loginUser } from "../../../actions";
import displayForm from "../Form/DisplayFormLogin";
import logo from "../../../assets/logo.png";

class NormalLoginForm extends React.Component {
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

  componentDidUpdate = () => {
    this.setCookies();
  };

  onSubmit = formValues => {
    console.log("submitting", formValues);
    this.props.loginUser(formValues);
  };

  render() {
    console.log(this.props);
    return (
      <div className="center">
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img src={logo} style={{ margin: "auto 0" }} alt="logo" />
        </div>
        <Card>
          <Formik onSubmit={this.onSubmit} render={displayForm} />
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
  { loginUser }
)(NormalLoginForm);
