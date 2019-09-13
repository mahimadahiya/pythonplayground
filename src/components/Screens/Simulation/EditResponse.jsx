import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Form, Input } from "antd";
import MButton from "../../Elements/MButton";
import adminPanelApi from "../../../apis/adminPanel";
import qs from "querystring";
import { fetchSimulation } from "../../../actions";

class EditResponse extends Component {
  state = {
    loading: true,
    redirect: false
  };

  async componentDidMount() {
    this.id = this.props.match.params.id;
    await this.props.fetchSimulation(this.props.user.Authorization, this.id);
    const record = this.props.simulation;
    this.props.form.setFieldsValue({
      name: record.expert_response_name,
      keywords: record.expert_response_keywords
    });
    this.setState({ loading: false });
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
        this.setState({ redirect: true });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        {this.state.redirect ? (
          <Redirect to="/simulation" />
        ) : (
          <Card
            loading={this.state.loading}
            title={<div className="card-title">Edit Response</div>}
          >
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
        )}
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
