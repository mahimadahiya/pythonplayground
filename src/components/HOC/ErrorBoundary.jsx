import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: null
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      errorMessage: error
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.hasError ? (
          <h1>Oops. Something Went Wrong!</h1>
        ) : (
          this.props.children
        )}
      </React.Fragment>
    );
  }
}
