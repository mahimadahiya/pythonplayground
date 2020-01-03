import React, { useState } from "react";
import { Card, Select, Input, Icon, Button, message } from "antd";
import { wyrEpisodeSceneCreate } from "../../../../actions";
import { useSelector } from "react-redux";

const SceneCreate = props => {
  const episodeId = props.episodeId;
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);

  const complexityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // formValues
  const [name, setName] = useState("");
  // const [techincalService, setTechincalService] = useState(null);
  const [complexity, setComplexity] = useState(null);

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

  const createNew = async () => {
    if (name === null || name === undefined || name === "" || name === " ") {
      message.warning("Please enter name");
      return;
    }

    // if (
    //   techincalService === null ||
    //   techincalService === undefined ||
    //   techincalService === "" ||
    //   techincalService === " "
    // ) {
    //   setTechincalService(undefined);
    //   message.warning("Please select techincal service");
    //   return;
    // }

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

    let formValues = {};

    formValues = {
      name: name,
      // technical_service_id: techincalService,
      technical_service_id: props.technicalServiceId,
      complexity: complexity,
      wyr_tree_id: episodeId
    };

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

        {/* techincalService starts */}
        {/* <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Technical Service
            <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <div>
              <Select
                style={{ width: "100%" }}
                placeholder="Select technical service"
                onChange={value => setTechincalService(value)}
              >
                <Select.Option value={1}>Behavioral Module</Select.Option>
                <Select.Option value={2}>Functional Module</Select.Option>
              </Select>
            </div>
            {techincalService === undefined ? (
              <div style={{ color: "red", marginTop: "5px" }}>* Required</div>
            ) : null}
          </div>
        </div> */}
        {/* techincalService ends */}

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
