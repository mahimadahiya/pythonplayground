import React, { Component } from "react";
import { connect } from "react-redux";

class ErrorBoundary extends Component {
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
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <h1>Oops. Something Went Wrong!</h1>
        </React.Fragment>
      );
    } else if (this.props.errorModuleTrack || this.props.errorUserTrack) {
      return (
        <React.Fragment>
          <h1>Something Went Wrong</h1>
        </React.Fragment>
      );
    } else return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = state => {
  return {
    errorModuleTrack: state.moduleTrack.error,
    errorUserTrack: state.userTrack.error
  };
};

export default connect(mapStateToProps)(ErrorBoundary);
