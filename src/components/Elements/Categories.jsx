import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../actions";
import { Form, Select } from "antd";

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
  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth);
  const categories = useSelector(state => state.category.categories);
  React.useEffect(() => {
    dispatch(fetchCategories(user.Authorization));
  }, [user, dispatch]);
  return (
    <div>
      <Form.Item label="Categories">
        <Select
          placeholder="Select a category"
          onChange={props.onChange}
          value={props.value}
          showSearch
          filterOption={(val, option) =>
            filterCategories(val, option, categories)
          }
        >
          {renderCategories(categories)}
        </Select>
      </Form.Item>
    </div>
  );
};

export default Categories;
