import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Form, Input } from "antd";
import MButton from "../../Elements/MButton";
import adminPanelApi from "../../../apis/adminPanel";
import history from "../../../history";
import qs from "querystring";
import { fetchSimulation } from "../../../actions";

class EditResponse extends Component {
  async componentDidMount() {
    this.id = this.props.match.params.id;
    this.props.heading("Edit Simulation");
    await this.props.fetchSimulation(this.props.user.Authorization, this.id);
    const record = this.props.simulation;
    this.props.form.setFieldsValue({
      name: record.expert_response_name,
      keywords: record.expert_response_keywords
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, formProps) => {
      if (!err) {
        const values = {
          name: formProps.name,
          keywords: formProps.keywords,
          id: this.props.simulation.expert_response_id,
          flag: this.props.simulation.expert_response_flag
        };
        await adminPanelApi(this.props.user.Authorization).post(
          "/v1/admin/edit/expert_response",
          qs.stringify(values)
        );
        history.push("/simulation");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Card>
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Name is required"
                  }
                ]
              })(<Input placeholder="Enter Name" size="large" />)}
            </Form.Item>
            <Form.Item label="Keywords">
              {getFieldDecorator("keywords", {
                rules: [
                  {
                    required: true,
                    message: "Keywords are required"
                  }
                ]
              })(<Input placeholder="Enter keywords" size="large" />)}
            </Form.Item>

            <MButton>Edit</MButton>
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.userAuth,
    simulation: state.simulation.currentSimulation
  };
};

export default connect(
  mapStateToProps,
  { fetchSimulation }
)(Form.create()(EditResponse));
