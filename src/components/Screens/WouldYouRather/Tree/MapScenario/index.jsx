import React, { useState, useEffect } from "react";
import { Card, Select, Input, Icon, Button, message } from "antd";
import { wyrEpisodeSceneUpdate, wyrScenarioList } from "../../../../../actions";
import { useSelector } from "react-redux";

const MapScenarioModal = props => {
  const sceneDetails = props.sceneDetails;
  const episodeId = props.episodeId;
  const SceneId = sceneDetails.id;
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);

  const [scenarioList, setScenarioList] = useState([]);

  const [selectDropdownScenarioList, setSelectDropdownScenarioList] = useState(
    []
  );

  useEffect(() => {
    const callDataApi = async () => {
      setLoading(true);
      try {
        let techId = props.sceneDetails.technical_service_id;
        const response = await wyrScenarioList(user.Authorization, techId);

        if (response.result.wyr_scenario_list.length > 0) {
          setSelectDropdownScenarioList(response.result.wyr_scenario_list);

          if (
            props.sceneDetails.scenario_details !== null ||
            props.sceneDetails.scenario_details !== undefined
          ) {
            if (Object.keys(props.sceneDetails.scenario_details).length !== 0) {
              console.log(props.sceneDetails.scenario_details);
            }
          }
        } else {
          setSelectDropdownScenarioList([]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    callDataApi();
  }, [user.Authorization]);

  return (
    <Card
      bodyStyle={{ padding: 0, fontSize: "15px" }}
      loading={loading}
      bordered={false}
    >
      <div
        style={{
          border: "1px solid #e6e6e6",
          borderRadius: 5,
          margin: "20px 0",
          padding: "20px"
        }}
      >
        <div
          style={{ marginBottom: "20px", fontWeight: 600, color: "#000000" }}
        >
          Scenario 1
        </div>

        {/* scenario list */}
        <div style={{ display: "flex" }}>
          <div style={{ width: "200px", margin: "auto 0" }}>
            Select Scenario
          </div>
          <div style={{ width: "100%" }}>
            <Select style={{ width: "100%" }}>
              {selectDropdownScenarioList.map(item => (
                <Select.Option key={item.id} value={item.id}>
                  {item.objective}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        {/* scenario end */}

        {/* actions starts */}
        {/* actions ends */}
      </div>

      <Button type="dashed">
        <Icon type="plus-circle" /> Add More Scenario
      </Button>
    </Card>
  );
};

export default MapScenarioModal;
