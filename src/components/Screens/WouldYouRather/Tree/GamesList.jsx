import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { getMappingActivityEntityList } from "../../../../actions";
import { useSelector } from "react-redux";

const GameList = props => {
  const user = useSelector(state => state.userAuth);
  const [game, setGame] = useState([]);

  const renderOptions = game => {
    return game.map(game => {
      return (
        <Select.Option key={game.id} value={game.id}>
          {game.name}
        </Select.Option>
      );
    });
  };

  const filterGame = (val, option, game) => {
    const filteredList = game.filter(({ name }) => {
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
        const response = await getMappingActivityEntityList(
          user.Authorization,
          props.selectedParameterId
        );
        setGame(response.data.result.game);
      } catch (error) {}
    };

    fetchList();
  }, [user.Authorization]);

  return (
    <div>
      <Select
        placeholder="Select a Game"
        onChange={props.onChange}
        mode={props.mode}
        style={{ width: "100%" }}
        showSearch
        value={props.value}
        allowClear
        filterOption={(val, option) => filterGame(val, option, game)}
      >
        {renderOptions(game)}
      </Select>
    </div>
  );
};

export default GameList;
