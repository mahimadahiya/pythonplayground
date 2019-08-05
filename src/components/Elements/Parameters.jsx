import React, { useEffect } from "react";
import { Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchParameters } from "../../actions";

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
  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth);
  const parameters = useSelector(state => state.category.parameters);
  useEffect(() => {
    dispatch(fetchParameters(user.Authorization, props.categories));
  }, [user, props.categories.length, dispatch]);

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Form.Item label="Parameters">
        {getFieldDecorator("parameter_id", {
          rules: [{ required: true }],
          initialValue: props.value
        })(
          <Select
            placeholder="Select a parameter"
            onChange={props.onChange}
            mode={props.mode}
            showSearch
            filterOption={(val, option) =>
              filterParameters(val, option, parameters)
            }
          >
            {renderOptions(parameters)}
          </Select>
        )}
      </Form.Item>
    </div>
  );
};

export default Form.create()(Parameters);
