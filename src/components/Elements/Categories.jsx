import React, { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../actions";
import { Select } from "antd";

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

const Categories = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth);
  const categories = useSelector(state => state.category.categories);

  React.useEffect(() => {
    dispatch(fetchCategories(user.Authorization));
  }, [user, dispatch]);

  return (
    <div>
      <Select
        mode={props.mode}
        placeholder="Select a category"
        onChange={props.onChange}
        showSearch
        allowClear
        value={props.value}
        filterOption={(val, option) =>
          filterCategories(val, option, categories)
        }
      >
        {renderCategories(categories)}
      </Select>
    </div>
  );
});

export default Categories;
