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

const Parameters = props => {
  useEffect(() => {
    getParameters(props.fetchParameters, props.user, props.categories);
  }, [props.categories[0]]);
  return (
    <div>
      <Form.Item label="Parameters">
        <Select
          placeholder="Select a parameter"
          mode={props.mode}
          value={props.value}
          onChange={props.onChange}
          showSearch
          filterOption={(val, option) =>
            filterParameters(val, option, props.parameters)
          }
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
