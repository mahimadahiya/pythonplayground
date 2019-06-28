import React from "react";
import { Form, Select } from "antd";
import { connect } from "react-redux";
import { fetchStates } from "../../actions";

const getStates = async (fetchStates, user, states, regions) => {
  await fetchStates(user.Authorization, regions);
};

const renderOptions = states => {
  return states.map(state => {
    return (
      <Select.Option key={state.id} value={state.id}>
        {state.name}
      </Select.Option>
    );
  });
};

const State = props => {
  console.log("called");
  getStates(props.fetchStates, props.user, props.states, props.regions);
  return (
    <div>
      <Form.Item label="State">
        <Select
          placeholder="Select a state"
          mode={props.mode}
          onChange={props.onChange}
        >
          {renderOptions(props.states)}
        </Select>
      </Form.Item>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    states: state.region.states,
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { fetchStates }
)(State);
