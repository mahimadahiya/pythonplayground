import React, { useEffect } from "react";
import { Form, Select } from "antd";
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

const Region = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth);
  const regions = useSelector(state => state.region.regions);

  useEffect(() => {
    dispatch(fetchRegions(user.Authorization));
  }, [dispatch, user]);

  return (
    <div>
      <Form.Item label="Region">
        {props.form.getFieldDecorator("region", {
          rules: [{ required: true, message: "Region is required" }],
          initialValue: props.value
        })(
          <Select
            placeholder="Select a region"
            mode={props.mode}
            onChange={props.onChange}
          >
            {renderOptions(regions)}
          </Select>
        )}
      </Form.Item>
    </div>
  );
};

export default Form.create()(Region);
