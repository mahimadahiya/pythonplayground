import React from "react";
import { Form, Select } from "antd";
import { connect } from "react-redux";
import { fetchRegions } from "../../actions";

const getRegions = async (fetchRegions, user, regions) => {
  if (regions.length === 0) {
    await fetchRegions(user.Authorization);
  }
};

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
  getRegions(props.fetchRegions, props.user, props.regions);
  return (
    <div>
      <Form.Item label="Region">
        {props.form.getFieldDecorator("region", {
          rules: [{ required: true, message: "Region is required" }]
        })(
          <Select
            placeholder="Select a region"
            mode={props.mode}
            onChange={props.onChange}
          >
            {renderOptions(props.regions)}
          </Select>
        )}
      </Form.Item>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    regions: state.region.regions,
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { fetchRegions }
)(Form.create()(Region));
