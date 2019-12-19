import React, { useState, useEffect } from "react";
import { Card, Select, Button, message } from "antd";
import { fetchSimulationList } from "../../../../actions";
import { useSelector } from "react-redux";

const renderOptions = simulation => {
  return simulation.map(simulation => {
    return (
      <Select.Option key={simulation.id} value={simulation.id}>
        {simulation.text}
      </Select.Option>
    );
  });
};

const SimulationList = props => {
  const user = useSelector(state => state.userAuth);

  const [simulation, setSimulation] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetchSimulationList(user.Authorization);
        setSimulation(response.data.result);
      } catch (error) {}
    };
    fetchList();
  }, []);

  return (
    <div>
      <Select
        placeholder="Select a Simulation"
        onChange={props.onChange}
        mode={props.mode}
        style={{ width: "100%" }}
        showSearch
        value={props.value}
        allowClear
      >
        {renderOptions(simulation)}
      </Select>
    </div>
  );
};

export default SimulationList;
