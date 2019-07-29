import React, { useEffect } from "react";
import { Form, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchStates } from "../../actions";

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
  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth);
  const states = useSelector(state => state.region.states);
  useEffect(() => {
    dispatch(fetchStates(user.Authorization, props.regions));
  }, [user, dispatch, props.regions]);
  return (
    <div>
      <Form.Item label="State">
        <Select
          placeholder="Select a state"
          mode={props.mode}
          onChange={props.onChange}
        >
          {renderOptions(states)}
        </Select>
      </Form.Item>
    </div>
  );
};

export default State;
