import React from "react";
import { connect } from "react-redux";
import { Card, Form, Input, Select, DatePicker, Row, Col, Switch } from "antd";
import { dateFormat } from "../Form/FieldFormats";

import { createModuleTrack, fetchOrganizations } from "../../../actions";
import moment from "moment";
import MButton from "../../Elements/MButton";

class CreateTrack extends React.Component {
  state = {
    loading: true,
    notify_user: 0
  };

  async componentDidMount() {
    if (this.props.organizations.length === 0) {
      await this.props.fetchOrganizations(this.props.user.Authorization);
      this.setState({
        loading: false
      });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  onNotifyChange = e => {
    const status = e ? 1 : 0;
    console.log(status);
    this.setState({ notify_user: status });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, formProps) => {
      if (!err) {
        const selectedDate = moment(formProps.going_live_at).format(dateFormat);
        const formValues = {
          ...formProps,
          going_live_at: selectedDate,
          notify_user: this.state.notify_user
        };
        this.props.createModuleTrack(this.props.user.Authorization, formValues);
      } else {
        console.log(err);
      }
    });
  };

  filterOrganizations = (val, option) => {
    const filteredList = this.props.organizations.filter(({ name }) => {
      if (name.toLowerCase().includes(val) || option.key.includes(val)) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].id.toString() === option.key) return true;
    }
    return false;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card
          loading={this.state.loading}
          title={<div className="card-title">Create Track</div>}
        >
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="Track Name">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please enter a valid Track Name"
                  }
                ]
              })(<Input placeholder="Type Track Name" />)}
            </Form.Item>
            <Row type="flex" justify="space-between">
              <Col span={17}>
                <Form.Item label="Organization">
                  {getFieldDecorator("organization_id", {
                    rules: [
                      {
                        required: true,
                        message: "Please select an Organization"
                      }
                    ]
                  })(
                    <Select
                      placeholder="Select an Organization"
                      allowClear
                      showSearch
                      filterOption={this.filterOrganizations}
                    >
                      {this.props.organizations.map(organization => {
                        return (
                          <Select.Option
                            value={organization.id}
                            key={organization.id}
                          >{`${organization.name} (${
                            organization.id
                          })`}</Select.Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Going Live at">
                  {getFieldDecorator("going_live_at", {
                    rules: [
                      {
                        required: true,
                        message: "Please select date and time"
                      }
                    ]
                  })(<DatePicker showTime style={{ width: "100%" }} />)}
                </Form.Item>
                <Form.Item>
                  <Switch
                    checkedChildren="Notify Users"
                    unCheckedChildren="Notify Users"
                    onChange={this.onNotifyChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <MButton>Create Track</MButton>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizations: Object.values(state.organization.organizationList),
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { createModuleTrack, fetchOrganizations }
)(Form.create()(CreateTrack));
