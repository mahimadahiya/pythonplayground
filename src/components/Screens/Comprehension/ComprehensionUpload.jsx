import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

class ComprehensionUpload extends Component {
  state = {
    text: ""
  };

  handleChange = val => {
    this.setState({ text: val });
  };

  render() {
    console.log(this.state);
    // return <ReactQuill onChange={this.handleChange} style={{ height: 800 }} />;
    return <div />;
  }
}

export default ComprehensionUpload;
