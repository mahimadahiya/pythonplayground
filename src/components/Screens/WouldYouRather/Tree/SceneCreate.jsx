import React, { useState, useEffect } from "react";
import { Card, Select, Input, Icon, Button, message } from "antd";
import {
  wyrEpisodeSceneCreate,
  wyrTreeList,
  getChapterList
} from "../../../../actions";
import { useSelector } from "react-redux";

const SceneCreate = props => {
  const episodeId = props.episodeId;
  //console.log(props.technicalServiceId);
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);

  const complexityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // formValues
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [complexity, setComplexity] = useState(null);
  const [mappedParameterCourseList, setMappedParameterCourseList] = useState(
    []
  );
  const [parameterCourseId, setParameterCourseId] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const callDataApi = async () => {
      setLoading(true);
      try {
        const episodeDetailsResponse = await wyrTreeList(user.Authorization);
        let tempList = [];
        let courseId = null;
        for (
          let i = 0;
          i < episodeDetailsResponse.data.result.wyr_episode_list.length;
          i++
        ) {
          if (
            episodeDetailsResponse.data.result.wyr_episode_list[i].id ===
            JSON.parse(episodeId)
          ) {
            if (
              episodeDetailsResponse.data.result.wyr_episode_list[i]
                .technical_service_id === 1
            ) {
              for (
                let j = 0;
                j <
                episodeDetailsResponse.data.result.wyr_episode_list[i]
                  .mapped_parameter.length;
                j++
              ) {
                tempList.push(
                  episodeDetailsResponse.data.result.wyr_episode_list[i]
                    .mapped_parameter[j]
                );
              }
            } else {
              for (
                let j = 0;
                j <
                episodeDetailsResponse.data.result.wyr_episode_list[i]
                  .mapped_fm_course.length;
                j++
              ) {
                courseId =
                  episodeDetailsResponse.data.result.wyr_episode_list[i]
                    .mapped_fm_course[j].id;
              }
            }
          }
        }
        console.log(courseId);
        setMappedParameterCourseList(tempList);
        // console.log(episodeDetailsResponse.data.result.wyr_episode_list);

        const chapterResponse = await getChapterList(
          user.Authorization,
          courseId
        );
        //  console.log(chapterResponse.data.result);
        setChapters(chapterResponse.data.result.chapter_list);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    callDataApi();
    return () => {
      setMappedParameterCourseList([]);
    };
  }, [user.Authorization]);

  const onNameChange = event => {
    if (
      event.target.value === "" ||
      event.target.value === "" ||
      event.target.value === undefined
    ) {
      setName(null);
    } else {
      setName(event.target.value);
    }
  };

  const onDescriptionChange = event => {
    if (
      event.target.value === "" ||
      event.target.value === "" ||
      event.target.value === undefined
    ) {
      setDescription(null);
    } else {
      setDescription(event.target.value);
    }
  };

  const createNew = async () => {
    if (name === null || name === undefined || name === "" || name === " ") {
      message.warning("Please enter name");
      return;
    }

    if (
      description === null ||
      description === undefined ||
      description === "" ||
      description === " "
    ) {
      message.warning("Please enter Description");
      return;
    }

    if (
      complexity === null ||
      complexity === undefined ||
      complexity === "" ||
      complexity === " "
    ) {
      setComplexity(undefined);
      message.warning("Please select complexity");
      return;
    }

    if (
      parameterCourseId === null ||
      parameterCourseId === undefined ||
      parameterCourseId === "" ||
      parameterCourseId === " "
    ) {
      message.warning("Please select Parmeter / Chapter");
      return;
    }

    let formValues = {};

    if (props.technicalServiceId === "1") {
      formValues = {
        name: name,
        technical_service_id: props.technicalServiceId,
        complexity: complexity,
        wyr_tree_id: episodeId,
        description: description,
        parameter_id: parameterCourseId
      };
    } else {
      formValues = {
        name: name,
        technical_service_id: props.technicalServiceId,
        complexity: complexity,
        wyr_tree_id: episodeId,
        description: description,
        chapter_id: parameterCourseId
      };
    }

    try {
      setLoading(true);
      await wyrEpisodeSceneCreate(user.Authorization, formValues);
      setLoading(false);
      message.success("Scene Created");
      props.setCreateNewModalShow(false);
      props.setLoadAgain(!props.loadAgain);
    } catch (error) {
      setLoading(false);
    }
  };

  const renderCourseOptions = data => {
    return data.map(data => {
      return (
        <Select.Option key={data.id} value={data.id}>
          {data.name}
        </Select.Option>
      );
    });
  };

  const renderParameterOptions = data => {
    return data.map(data => {
      return (
        <Select.Option key={data.parameter_id} value={data.parameter_id}>
          {data.parameter__name}
        </Select.Option>
      );
    });
  };

  return (
    <div>
      <Card
        bodyStyle={{ padding: 0, fontSize: "15px" }}
        loading={loading}
        bordered={false}
      >
        {/* name starts */}
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Name
            <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <div>
              <Input
                type="text"
                placeholder="name"
                style={
                  name === null
                    ? {
                        width: "100%",
                        border: "0.5px solid red"
                      }
                    : {
                        width: "100%"
                      }
                }
                onChange={onNameChange}
              />
            </div>
            {name === null ? (
              <div style={{ color: "red", marginTop: "5px" }}>* Required</div>
            ) : null}
          </div>
        </div>
        {/* name ends */}

        {/* description starts */}
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Description
            <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <div>
              <Input
                type="text"
                placeholder="description"
                style={
                  description === null
                    ? {
                        width: "100%",
                        border: "0.5px solid red"
                      }
                    : {
                        width: "100%"
                      }
                }
                onChange={onDescriptionChange}
              />
            </div>
            {description === null ? (
              <div style={{ color: "red", marginTop: "5px" }}>* Required</div>
            ) : null}
          </div>
        </div>
        {/* description ends */}

        {/* Complexity starts */}
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Complexity
            <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <div>
              <Select
                style={{ width: "100%" }}
                placeholder="Select Complexity"
                onChange={value => setComplexity(value)}
              >
                {complexityList.map((item, i) => (
                  <Select.Option key={i} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </div>
            {complexity === undefined ? (
              <div style={{ color: "red", marginTop: "5px" }}>* Required</div>
            ) : null}
          </div>
        </div>
        {/* Complexity ends */}

        {/* parameter/course starts */}
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            {props.technicalServiceId === "1" ? "Parameters" : "Courses"}
            <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <div>
              <Select
                placeholder={
                  props.technicalServiceId === "1"
                    ? "Select Parameter"
                    : "Select Course"
                }
                style={{ width: "100%" }}
                loading={loading}
                onChange={value => setParameterCourseId(value)}
              >
                {props.technicalServiceId === "1"
                  ? renderParameterOptions(mappedParameterCourseList)
                  : renderCourseOptions(chapters)}
              </Select>
            </div>
          </div>
        </div>
        {/* parameter/course ends */}

        <div style={{ margin: "60px 0px 30px 0px", textAlign: "center" }}>
          <Button type="primary" onClick={() => createNew()}>
            Create New Scene
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SceneCreate;
