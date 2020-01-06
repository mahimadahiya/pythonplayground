import React, { useState, useEffect } from "react";
import { Select } from "antd";
import {
  getMappingActivityEntityList,
  getEpisodeActivityListForFm
} from "../../../../actions";
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
  const [selectonLoading, setSelectonLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      setSelectonLoading(true);
      try {
        if (props.selectedTechnicalId === 1) {
          const response = await getMappingActivityEntityList(
            user.Authorization,
            props.selectedParameterId
          );
          setSimulation(response.data.result.simulation);
          setSelectonLoading(false);
        } else {
          const response = await getEpisodeActivityListForFm(
            user.Authorization,
            props.courseId
          );
          if (response.data.result.simulation) {
            setSimulation(response.data.result.simulation);
            setSelectonLoading(false);
          }
        }
      } catch (error) {
        setSelectonLoading(false);
      }
    };

    fetchList();
  }, [user.Authorization, props.selectedParameterId]);

  return (
    <div>
      <Select
        placeholder="Select a Simulation"
        onChange={props.onChange}
        loading={selectonLoading}
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
