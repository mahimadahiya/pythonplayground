import React, { useEffect } from "react";
import { Form, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchTags } from "../../actions";

const renderOptions = tags => {
  return tags.map(tag => {
    return (
      <Select.Option key={tag.id} value={tag.id}>
        {tag.name}
      </Select.Option>
    );
  });
};

const Tags = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth);
  const tags = useSelector(state => state.category.tags);
  useEffect(() => {
    dispatch(fetchTags(user.Authorization, props.parameters));
  }, [user, props.parameters, dispatch]);
  return (
    <div>
      <Form.Item label="Tags">
        <Select
          placeholder="Select a tag"
          onChange={props.onChange}
          value={props.value}
        >
          {renderOptions(tags)}
        </Select>
      </Form.Item>
    </div>
  );
};

export default Tags;
