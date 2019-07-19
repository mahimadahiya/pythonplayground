import React, { useEffect } from "react";
import { Form, Select } from "antd";
import { connect } from "react-redux";
import { fetchTags } from "../../actions";

const getTags = async (fetchTags, user, parameters) => {
  await fetchTags(user.Authorization, parameters);
};

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
  useEffect(() => {
    getTags(props.fetchTags, props.user, props.parameters);
  }, [props.parameters]);
  return (
    <div>
      <Form.Item label="Tags">
        <Select
          placeholder="Select a tag"
          onChange={props.onChange}
          value={props.value}
        >
          {renderOptions(props.tags)}
        </Select>
      </Form.Item>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tags: state.category.tags,
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { fetchTags }
)(Tags);
