import React, { useEffect, forwardRef, useState } from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { fetchAllArticles } from "../../actions";

const Articles = forwardRef((props, ref) => {
  const user = useSelector(state => state.userAuth);
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const list = await fetchAllArticles(user.Authorization);
      setList(list);
    };
    fetchList();
  }, [user]);

  const filterArticles = (val, option) => {
    const filteredList = list.filter(({ name }) => {
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

  const renderArticles = () => {
    return list.map(article => (
      <Select.Option key={article.id} value={article.id}>
        {article.name}
      </Select.Option>
    ));
  };

  return (
    <Select
      style={props.style}
      placeholder="Select Article(s)"
      onChange={props.onChange}
      showSearch
      filterOption={(val, option) => filterArticles(val, option)}
    >
      {renderArticles()}
    </Select>
  );
});

export default Articles;
