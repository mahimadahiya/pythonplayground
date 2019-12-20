import React, { useState, useEffect } from "react";
import { Card, Select, Button, message } from "antd";
import { getActivityList, wyrTreeActivityCreate } from "../../../../actions";
import MappedActivityList from "./MappedActivityList";
import { useSelector } from "react-redux";

const AddLI = props => {
  const user = useSelector(state => state.userAuth);
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState([]);
  const [parameter, setParameter] = useState([]);
  const [activityId, setActivityId] = useState(null);
  const [entityId, setEntityId] = useState(null);

  const selectedEpisodeDetails = props.selectedEpisodeDetails;

  useEffect(() => {
    setParameter(selectedEpisodeDetails.mapped_parameter);
    const callActivityData = async () => {
      const response = await getActivityList(user.Authorization);
      setActivity(response.data.result);
    };
    callActivityData();
  }, []);

  const renderActivityOptions = activity => {
    return activity.map(activity => {
      return (
        <Select.Option key={activity.id} value={activity.id}>
          {activity.name}
        </Select.Option>
      );
    });
  };

  const renderParameterOptions = parameter => {
    return parameter.map(parameter => {
      return (
        <Select.Option
          key={parameter.parameter_id}
          value={parameter.parameter_id}
        >
          {parameter.parameter__name}
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
                  {renderActivityOptions(activity)}
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
                <Select
                  placeholder="Select Parameter"
                  style={{ width: "100%" }}
                  onChange={onParameterChange}
                >
                  {renderParameterOptions(parameter)}
                </Select>
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
