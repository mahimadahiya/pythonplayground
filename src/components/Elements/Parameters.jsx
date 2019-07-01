import React, { useEffect } from "react";
import { Form, Select } from "antd";
import { connect } from "react-redux";
import { fetchParameters } from "../../actions";

const getParameters = async (fetchParameters, user, categories) => {
  await fetchParameters(user.Authorization, categories);
};

const renderOptions = parameters => {
  return parameters.map(parameter => {
    return (
      <Select.Option key={parameter.id} value={parameter.id}>
        {parameter.name}
      </Select.Option>
    );
  });
};

const Parameters = props => {
  useEffect(() => {
    getParameters(props.fetchParameters, props.user, props.categories);
  }, [props.categories]);
  return (
    <div>
      <Form.Item label="Parameters">
        <Select
          placeholder="Select a parameter"
          mode={props.mode}
          onChange={props.onChange}
        >
          {renderOptions(props.parameters)}
        </Select>
      </Form.Item>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    parameters: state.category.parameters,
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { fetchParameters }
)(Parameters);
