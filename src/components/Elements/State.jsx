import React, { useEffect, forwardRef } from "react";
import { Select } from "antd";
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

const State = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth);
  const states = useSelector(state => state.region.states);
  useEffect(() => {
    dispatch(fetchStates(user.Authorization, props.regions));
  }, [user, dispatch, props.regions]);
  return (
    <div>
      <Select
        placeholder="Select a state"
        mode={props.mode}
        onChange={props.onChange}
      >
        {renderOptions(states)}
      </Select>
    </div>
  );
});

export default State;
