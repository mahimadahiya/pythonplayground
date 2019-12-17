import React, { useState } from "react";
import { Card, Select, Input, Icon, Button, message, Form } from "antd";
import { getActivityList, wyrTreeActivityCreate } from "../../../../actions";
import MButton from "../../../Elements/MButton";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const { Option } = Select;

const AddLI = props => {
  const user = useSelector(state => state.userAuth);
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState([]);
  const [activityId, setActivityId] = useState(null);

  useEffect(() => {
    const callActivityData = async () => {
      const response = await getActivityList(user.Authorization);
      //console.log(response.data.result);
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

  const handleChange = val => {
    //console.log(val);
    setActivityId(val);
  };

  const createNew = async () => {
    if (activityId === null || activityId === undefined) {
      message.warning("Please Select Activity");
      return;
    }

    let formValues = {};
    {
      formValues = {
        wyr_episode_id: props.selectedEpisodeId,
        activity_id: activity
      };

      try {
        // console.log(formValues);
        setLoading(true);
        await wyrTreeActivityCreate(user.Authorization, formValues);
        setLoading(false);
        message.success("LI Created");
        props.setAddLIModalShow(false);
      } catch (error) {
        setLoading(false);
        props.setAddLIModalShow(false);
      }
    }
  };

  return (
    <div>
      <Card
        bodyStyle={{ padding: 0, fontSize: "15px" }}
        loading={loading}
        bordered={false}
      >
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
                onChange={handleChange}
              >
                {renderOptions(activity)}
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
    </div>
  );
};

export default AddLI;
