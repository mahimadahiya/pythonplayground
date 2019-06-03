import React from "react";
import { Card } from "antd";
import { Formik, Field } from "formik";
import { connect } from "react-redux";
import history from "../../../history";
import { loginUser } from "../../../actions";
import displayForm from "../Form/DisplayForm";

class NormalLoginForm extends React.Component {
  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log("Received values of form: ", values);
  //     }
  //   });
  // };

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
    console.log("submit", formValues);
    this.props.loginUser(formValues);
  };

  render() {
    console.log(this.props);
    return (
      <div className="center">
        <Card title="iAugmentor Login">
          <Formik onSubmit={this.onSubmit} render={displayForm} />
          {/* <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form> */}
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
