import React from "react";
import { loginUser } from "../../../actions";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import history from "../../../history";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Container
} from "semantic-ui-react";

class Login extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="item">{error}</div>
        </div>
      );
    }
  }

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
      history.push("/tracks");
    }
  };

  componentWillMount() {
    this.setCookies();
  }

  componentDidUpdate = () => {
    this.setCookies();
  };

  renderInput = ({ input, label, meta }) => {
    let icon = "user";
    if (label === "Password") {
      icon = "lock";
    }
    return (
      <div className="field">
        <div className="ui labeled input">
          <div className="ui grey label label">
            <i className={`${icon} icon`} />
          </div>
          <input {...input} placeholder={label} />
          {this.renderError(meta)}
        </div>
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.loginUser(formValues);
  };

  render() {
    return (
      <Container>
        <Grid centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Login
            </Header>
            <Segment>
              <Form
                size="small"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
                <Field
                  name="email"
                  component={this.renderInput}
                  label="Email"
                />
                <Field
                  name="password"
                  component={this.renderInput}
                  label="Password"
                />
                <Button color="black" fluid size="large">
                  Login
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "Email is mandatory";
  }
  if (!formValues.password) {
    errors.password = "Please enter password";
  }
  return errors;
};

const mapStateToProps = (state, ownProps) => {
  return { userAuth: state.userAuth, cookies: ownProps.cookies };
};

const formWrapped = reduxForm({
  form: "loginForm",
  validate: validate
})(Login);

export default connect(
  mapStateToProps,
  { loginUser }
)(formWrapped);
