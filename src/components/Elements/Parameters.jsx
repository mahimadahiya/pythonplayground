import React, { forwardRef, useState } from "react";
import { Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchParameters } from "../../actions";
import useDeepCompareEffect from "use-deep-compare-effect";

const renderOptions = parameters => {
  return parameters.map(parameter => {
    return (
      <Select.Option key={parameter.id} value={parameter.id}>
        {parameter.name}
      </Select.Option>
    );
  });
};

const filterParameters = (val, option, parameters) => {
  const filteredList = parameters.filter(({ name }) => {
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

const Parameters = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth);
  const parameters = useSelector(state => state.category.parameters);

  useDeepCompareEffect(() => {
    dispatch(fetchParameters(user.Authorization, props.categories));
  }, [user, dispatch, props.categories]);

  return (
    <Select
      placeholder="Select a parameter"
      onChange={props.onChange}
      onDeselect={props.onDeselect}
      loading={props.loading}
      mode={props.mode}
      style={{ width: "100%" }}
      showSearch
      value={props.value}
      allowClear
      filterOption={(val, option) => filterParameters(val, option, parameters)}
    >
      {renderOptions(parameters)}
    </Select>
  );
});

export default Parameters;
