import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { TextField } from "redux-form-antd";
import { Form, Button } from "antd";
import { createModuleTrackMapping } from "../../../actions";

class ModuleMapping extends React.Component {

  onSubmit = (fromValues) => {

    this.props.createModuleTrackMapping(this.props.user.Authorization, fromValues)
  }

  render() {
    console.log(this.props)
    const track_id = this.props.match.params.id;
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)} className="login-form" >
        <Form.Item>
          <Field
            name="track_id"
            component={TextField}
            placeholder={track_id}
            value={track_id}
            
          />
        </Form.Item>
        <Form.Item>
          <Field
            name="module_id_list"
            component={TextField}
            placeholder="Module IDs"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userAuth };
};
const formWrapped = reduxForm({ form: "moduleTrack" })(ModuleMapping);

export default connect(
  mapStateToProps,
  { createModuleTrackMapping }
)(formWrapped);
