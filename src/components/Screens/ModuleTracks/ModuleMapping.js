import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { TextField } from "redux-form-antd";
import { Form, Button } from "antd";
import { fetchModuleTracks } from "../../../actions";

class ModuleMapping extends React.Component {
  state = {
    track: null
  };

  onSubmit = fromValues => {
    this.props.createModuleTrackMapping(
      this.props.user.Authorization,
      fromValues
    );
  };

  componentDidMount() {
    this.props.fetchModuleTracks(this.props.user.Authorization);
  }

  fetchTrack = () => {
    if (this.state.track === null) {
      const trackDetail = this.props.tracks[this.props.match.params.id];
      this.setState({
        track: trackDetail
      });
    }
  };

  componentDidUpdate() {
    this.fetchTrack();
  }

  render() {
    console.log(this.state);
    return (
      <h4>{this.track_id}</h4>
      // <Form onSubmit={this.props.handleSubmit(this.onSubmit)} className="login-form" >
      //   <Form.Item>
      //     <Field
      //       name="track_id"
      //       component={TextField}
      //       placeholder={track_id}
      //       value={track_id}

      //     />
      //   </Form.Item>
      //   <Form.Item>
      //     <Field
      //       name="module_id_list"
      //       component={TextField}
      //       placeholder="Module IDs"
      //     />
      //   </Form.Item>
      //   <Form.Item>
      //     <Button
      //       type="primary"
      //       htmlType="submit"
      //       className="login-form-button"
      //     >
      //       Create
      //     </Button>
      //   </Form.Item>
      // </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    tracks: state.moduleTrack.moduleTracks
  };
};
// const formWrapped = reduxForm({ form: "moduleTrack" })(ModuleMapping);

export default connect(
  mapStateToProps,
  { fetchModuleTracks }
)(ModuleMapping);
