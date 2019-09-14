import React, { useEffect, forwardRef } from "react";
import { Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchRegions } from "../../actions";

const renderOptions = regions => {
  return regions.map(region => {
    return (
      <Select.Option key={region.id} value={region.id}>
        {region.name}
      </Select.Option>
    );
  });
};

const Region = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth);
  const regions = useSelector(state => state.region.regions);

  useEffect(() => {
    dispatch(fetchRegions(user.Authorization));
  }, [dispatch, user]);

  return (
    <Select
      placeholder="Select a region"
      mode={props.mode}
      allowClear
      onChange={props.onChange}
    >
      {renderOptions(regions)}
    </Select>
  );
});

export default Region;
