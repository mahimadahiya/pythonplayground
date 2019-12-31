import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { wyrTreeList } from "../../../../actions";
import { useSelector } from "react-redux";

const EpisodeList = props => {
  const selectedTechnicalId = props.selectedTechnicalId;
  const user = useSelector(state => state.userAuth);

  const [epoisodes, setEpoisodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const renderOptions = episodes => {
    return episodes.map(episodes => {
      return (
        <Select.Option key={episodes.id} value={episodes.id}>
          {episodes.name}
        </Select.Option>
      );
    });
  };

  const filterArticles = (val, option, epoisodes) => {
    const filteredList = epoisodes.filter(({ name }) => {
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
      setLoading(true);
      try {
        const response = await wyrTreeList(
          user.Authorization,
          selectedTechnicalId
        );
        // console.log(response.data.result.wyr_episode_list);
        setEpoisodes(response.data.result.wyr_episode_list);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchList();
  }, [user.Authorization]);

  return (
    <div>
      <Select
        placeholder="Select Episode"
        onChange={props.onChange}
        loading={loading}
        mode={props.mode}
        style={{ width: "100%" }}
        showSearch
        value={props.value}
        allowClear
        filterOption={(val, option) => filterArticles(val, option, epoisodes)}
      >
        {renderOptions(epoisodes)}
      </Select>
    </div>
  );
};

export default EpisodeList;
