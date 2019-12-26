import React, { useState, useEffect } from "react";
import { Select } from "antd";
import {
  getMappingActivityEntityList,
  getEpisodeActivityListForFm
} from "../../../../actions";
import { useSelector } from "react-redux";

const ArticleList = props => {
  const user = useSelector(state => state.userAuth);

  const [articles, setArticles] = useState([]);

  const renderOptions = articles => {
    return articles.map(articles => {
      return (
        <Select.Option key={articles.id} value={articles.id}>
          {articles.name}
        </Select.Option>
      );
    });
  };

  const filterArticles = (val, option, articles) => {
    const filteredList = articles.filter(({ name }) => {
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

  useEffect(() => {
    const fetchList = async () => {
      try {
        if (props.selectedTechnicalId === 1) {
          const response = await getMappingActivityEntityList(
            user.Authorization,
            props.selectedParameterId
          );
          setArticles(response.data.result.article);
        } else {
          const response = await getEpisodeActivityListForFm(
            user.Authorization,
            props.courseId
          );
          setArticles(response.data.result.article);
        }
      } catch (error) {}
    };

    fetchList();
  }, [user.Authorization]);

  return (
    <div>
      <Select
        placeholder="Select a Article"
        onChange={props.onChange}
        mode={props.mode}
        style={{ width: "100%" }}
        showSearch
        value={props.value}
        allowClear
        filterOption={(val, option) => filterArticles(val, option, articles)}
      >
        {renderOptions(articles)}
      </Select>
    </div>
  );
};

export default ArticleList;
