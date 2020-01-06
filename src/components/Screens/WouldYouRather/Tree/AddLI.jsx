import React, { useState, useEffect } from "react";
import { Card, Select, Button, message } from "antd";
import {
  getActivityList,
  wyrTreeActivityCreate,
  getChapterList
} from "../../../../actions";
import MappedActivityList from "./MappedActivityList";
import { useSelector } from "react-redux";
import MappedFmActivityList from "./MappedFmActivityList";

const AddLI = props => {
  //console.log(props.selectedEpisodeDetails.technical_service_id);
  const technicalServiceId = props.selectedEpisodeDetails.technical_service_id;
  const courseId =
    props.selectedEpisodeDetails.mapped_fm_course.length !== 0
      ? props.selectedEpisodeDetails.mapped_fm_course[0].fm_course_id
      : null;
  const user = useSelector(state => state.userAuth);
  const [loading, setLoading] = useState(false);
  const [addLiLoadAgain, setAddLiLLoadAgain] = useState(false);
  const [activity, setActivity] = useState([]);
  const [parameter, setParameter] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [activityId, setActivityId] = useState(null);
  const [entityId, setEntityId] = useState(null);

  const selectedEpisodeDetails = props.selectedEpisodeDetails;

  useEffect(() => {
    setParameter(selectedEpisodeDetails.mapped_parameter);
    const callActivityData = async () => {
      try {
        const response = await getActivityList(user.Authorization);
        setActivity(response.data.result);

        const chapterResponse = await getChapterList(
          user.Authorization,
          courseId
        );
        //  console.log(chapterResponse.data.result);
        setChapters(chapterResponse.data.result.chapter_list);
      } catch (error) {}
    };
    callActivityData();
  }, [addLiLoadAgain]);

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

  const renderCourseOptions = chapters => {
    return chapters.map(chapters => {
      return (
        <Select.Option key={chapters.id} value={chapters.id}>
          {chapters.name}
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

  const onCourseChange = val => {
    setEntityId(val);
    // console.log(val);
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

    for (
      let i = 0;
      i < props.selectedEpisodeDetails.mapped_activity.length;
      i++
    ) {
      if (
        props.selectedEpisodeDetails.mapped_activity[i].parameter_id ===
          entityId &&
        props.selectedEpisodeDetails.mapped_activity[i].activity_id ===
          activityId
      ) {
        message.warning("Activity with this Parameter is already selected");
        return;
      } else {
      }
    }
    for (
      let i = 0;
      i < props.selectedEpisodeDetails.mapped_fm_activity.length;
      i++
    ) {
      if (
        props.selectedEpisodeDetails.mapped_fm_activity[i].chapter_id ===
          entityId &&
        props.selectedEpisodeDetails.mapped_fm_activity[i].activity_id ===
          activityId
      ) {
        message.warning("Activity with this Chapter is already selected");
        return;
      } else {
      }
    }

    let formValues = {};

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
      // props.setAddLIModalShow(false);
      props.submitCreateNewActivity(props.selectedTechnicalId);
      props.setLoadAgain(!props.loadAgain);
      setAddLiLLoadAgain(!addLiLoadAgain);
    } catch (error) {
      setLoading(false);
      //  props.setAddLIModalShow(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        {technicalServiceId === 1 ? (
          <MappedActivityList
            selectedEpisodeDetails={selectedEpisodeDetails}
            selectedTechnicalId={technicalServiceId}
            submitCreateNewActivity={props.submitCreateNewActivity}
            closeMapLIModal={props.closeMapLIModal}
            addLiLoadAgain={addLiLoadAgain}
            setAddLiLLoadAgain={setAddLiLLoadAgain}
          />
        ) : (
          <MappedFmActivityList
            selectedEpisodeDetails={selectedEpisodeDetails}
            selectedTechnicalId={props.selectedTechnicalId}
            submitCreateNewActivity={props.submitCreateNewActivity}
            closeMapLIModal={props.closeMapLIModal}
            addLiLoadAgain={addLiLoadAgain}
            setAddLiLLoadAgain={setAddLiLLoadAgain}
          />
        )}
      </div>
      {/*{selectedEpisodeDetails.mapped_activity.length < 3 ? (*/}
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
        {/* parameter starts*/}
        {technicalServiceId === 1 ? (
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <div
              style={{
                width: "140px",
                fontWeight: 600
              }}
            >
              Competencies
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
        ) : (
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <div
              style={{
                width: "140px",
                fontWeight: 600
              }}
            >
              Chapters
              <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
            </div>
            <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
              <div>
                <Select
                  placeholder="Select Course"
                  style={{ width: "100%" }}
                  onChange={onCourseChange}
                >
                  {renderCourseOptions(chapters)}
                </Select>
              </div>
            </div>
          </div>
        )}
        <div style={{ margin: "60px 0px 30px 0px", textAlign: "center" }}>
          <Button type="primary" onClick={() => createNew()}>
            Add LI
          </Button>
        </div>
      </Card>
      {/*) : null}*/}
    </div>
  );
};

export default AddLI;
