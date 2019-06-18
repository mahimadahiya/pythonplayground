import React from "react";
import { Card, Alert, Form, Input, Icon } from "antd";
import { connect } from "react-redux";

import history from "../../../history";
import { loginUser, logoutUser } from "../../../actions";
import logo from "../../../assets/logo.png";
import MButton from "../../Elements/MButton";

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

  componentDidUpdate = prevProps => {};

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, formValues) => {
      if (!err) {
        await this.props.loginUser(formValues);
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
      } else {
        console.log(err);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="center">
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img src={logo} style={{ margin: "auto 0" }} alt="logo" />
        </div>
        <Card className="shadow">
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="Email">
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Email Address cannot be blank!"
                  }
                ]
              })(
                <Input
                  allowClear
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                  type="email"
                />
              )}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Password cannot be empty!"
                  }
                ]
              })(
                <Input
                  allowClear
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Password"
                  type="password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <MButton>Login</MButton>
            </Form.Item>
          </Form>
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
)(Form.create()(NormalLoginForm));
