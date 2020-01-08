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

  const [scenarioList, setScenarioList] = useState({
    "1": {
      wyr_action_list: [],
      wyr_scenario_id: null
    }
  });

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
          let ResponseList = response.result.wyr_scenario_list;

          for (let i = 0; i < ResponseList.length; i++) {
            ResponseList[i]["is_selected"] = false;
          }

          if (
            props.sceneDetails.scenario_details === null ||
            props.sceneDetails.scenario_details === undefined
          ) {
            console.log("object");
            setSelectDropdownScenarioList(ResponseList);
          } else {
            if (Object.keys(props.sceneDetails.scenario_details).length === 0) {
              setSelectDropdownScenarioList(ResponseList);
            } else {
              let PropsList = props.sceneDetails.scenario_details;

              for (let i = 0; i < ResponseList.length; i++) {
                for (
                  let j = 1;
                  j <= Object.keys(props.sceneDetails.scenario_details).length;
                  j++
                ) {
                  if (ResponseList[i].id === PropsList[j].wyr_scenario_id) {
                    ResponseList[i]["is_selected"] = true;
                  }
                }
              }
              setScenarioList(PropsList);
            }
            console.log(">>>>>>");
            setSelectDropdownScenarioList(ResponseList);
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
      {console.log(Object.keys(scenarioList))}
      {Object.keys(scenarioList).map((key, index) => (
        <div
          key={index}
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
              <Select style={{ width: "100%" }} placeholder="Select Scenario">
                {selectDropdownScenarioList.map(item => (
                  <Select.Option
                    key={item.id}
                    value={item.id}
                    disabled={item.is_selected}
                  >
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
      ))}

      <Button type="dashed">
        <Icon type="plus-circle" /> Add More Scenario
      </Button>
    </Card>
  );
};

export default MapScenarioModal;
