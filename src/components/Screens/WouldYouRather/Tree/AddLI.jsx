import React, { useState } from "react";
import { Card, Select, Button, message } from "antd";
import { getActivityList, wyrTreeActivityCreate } from "../../../../actions";
import Parameters from "../../../Elements/Parameters";
import MappedActivityList from "./MappedActivityList";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AddLI = props => {
  const user = useSelector(state => state.userAuth);
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState([]);
  const [activityId, setActivityId] = useState(null);
  const [entityId, setEntityId] = useState(null);

  const selectedEpisodeDetails = props.selectedEpisodeDetails;

  useEffect(() => {
    const callActivityData = async () => {
      const response = await getActivityList(user.Authorization);
      setActivity(response.data.result);
    };
    callActivityData();
  }, []);

  const renderOptions = activity => {
    return activity.map(activity => {
      return (
        <Select.Option key={activity.id} value={activity.id}>
          {activity.name}
        </Select.Option>
      );
    });
  };

  const onActivityChange = val => {
    setActivityId(val);
  };

  const onParameterChange = val => {
    setEntityId(val);
  };

  const createNew = async () => {
    if (activityId === null || activityId === undefined) {
      message.warning("Please Select Activity");
      return;
    }
    if (entityId === null || entityId === undefined) {
      message.warning("Please Select Parameter");
      return;
    }

    let formValues = {};
    {
      formValues = {
        wyr_episode_id: props.selectedEpisodeId,
        activity_id: activityId,
        entity_id: entityId
      };

      try {
        setLoading(true);
        await wyrTreeActivityCreate(user.Authorization, formValues);
        setLoading(false);
        message.success("LI Created");
        props.setAddLIModalShow(false);
        props.submitCreateNewActivity(props.selectedTechnicalId);
      } catch (error) {
        setLoading(false);
        props.setAddLIModalShow(false);
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <MappedActivityList
          selectedEpisodeDetails={selectedEpisodeDetails}
          selectedTechnicalId={props.selectedTechnicalId}
          submitCreateNewActivity={props.submitCreateNewActivity}
          setAddLIModalShow={props.setAddLIModalShow}
        />
      </div>
      {selectedEpisodeDetails.mapped_activity.length < 3 ? (
        <Card
          bodyStyle={{ padding: 0, fontSize: "15px" }}
          loading={loading}
          bordered={false}
        >
          {/*activity starts */}
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <div
              style={{
                width: "140px",
                fontWeight: 600
              }}
            >
              Activity
              <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
            </div>
            <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
              <div>
                <Select
                  placeholder="Select Activity"
                  style={{ width: "100%" }}
                  onChange={onActivityChange}
                >
                  {renderOptions(activity)}
                </Select>
              </div>
            </div>
          </div>
          {/*activity ends */}
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <div
              style={{
                width: "140px",
                fontWeight: 600
              }}
            >
              Parameter
              <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
            </div>
            <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
              <div>
                <Parameters
                  style={{ width: "100%" }}
                  mode="default"
                  value={entityId}
                  onChange={onParameterChange}
                  categories={[null]}
                />
              </div>
            </div>
          </div>
          <div style={{ margin: "60px 0px 30px 0px", textAlign: "center" }}>
            <Button type="primary" onClick={() => createNew()}>
              Add LI
            </Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
};

export default AddLI;
