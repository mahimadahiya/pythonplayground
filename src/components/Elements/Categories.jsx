import React from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../../actions";
import { Form, Select } from "antd";

const getCategores = async (user, fetchCategories, categories) => {
  if (categories.length === 0) {
    await fetchCategories(user.Authorization);
  }
};

const renderCategories = categories => {
  return categories.map(category => {
    return (
      <Select.Option key={category.id} value={category.id}>
        {category.name}
      </Select.Option>
    );
  });
};

const filterCategories = (val, option, categories) => {
  const filteredList = categories.filter(({ name }) => {
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

const Categories = props => {
  getCategores(props.user, props.fetchCategories, props.categories);
  return (
    <div>
      <Form.Item label="Categories">
        <Select
          placeholder="Select a category"
          onChange={props.onChange}
          mode={props.mode}
          value={props.value === null ? null : props.value}
          showSearch
          filterOption={(val, option) =>
            filterCategories(val, option, props.categories)
          }
        >
          {renderCategories(props.categories)}
        </Select>
      </Form.Item>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    categories: state.category.categories
  };
};

export default connect(
  mapStateToProps,
  { fetchCategories }
)(Categories);
