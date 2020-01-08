import React, { useState, useEffect } from "react";
import { Card, Input, Icon, Button, message, Row, Col, Select } from "antd";
import { wyrTreeUpdate } from "../../../../actions";
import { useSelector } from "react-redux";

const Edit = props => {
  const episodeDetails = props.episodeDetails;
  //console.log(episodeDetails.take_away);
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);
  const [techincalService, setTechincalService] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isFileUplaoded, setIsFileUplaoded] = useState(false);
  const [fileSrc, setFileSrc] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  // const [visibility, setVisibility] = useState("");
  const [episodeId, setEpisodeId] = useState(null);
  const [isFileChanged, setIsFileChanged] = useState(false);

  //learning outcome
  const [learningOutcomeCount, setLearningOutcomeCount] = useState(1);
  const [learningOutcome, setLearningOutcome] = useState([
    { id: 1, title: "" }
  ]);

  //take away
  const [takeAwayCount, setTakeAwayCount] = useState(1);
  const [takeAway, setTakeAway] = useState([{ id: 1, title: "" }]);

  //received props values

  const selectedLearningData =
    episodeDetails.learning_outcome === null ||
    Object.keys(episodeDetails.learning_outcome).length === 0
      ? []
      : episodeDetails.learning_outcome.text;
  const selectedTakeAwayData =
    episodeDetails.take_away === null ||
    Object.keys(episodeDetails.take_away).length === 0
      ? []
      : episodeDetails.take_away.text;

  useEffect(() => {
    // console.log(actionDetails);

    if (episodeDetails && Object.keys(episodeDetails).length !== 0) {
      if (selectedLearningData.length !== 0) {
        setLearningOutcomeCount(selectedLearningData.length);
      }
      setTakeAwayCount(selectedTakeAwayData.length);
      setEpisodeId(episodeDetails.id);
      setName(episodeDetails.name);
      setDescription(episodeDetails.description);
      setTechincalService(JSON.parse(episodeDetails.technical_service_id));
      if (
        episodeDetails.assets.episode_icon !== null ||
        episodeDetails.assets.episode_icon !== undefined ||
        episodeDetails.assets.episode_icon !== "" ||
        episodeDetails.assets.episode_icon !== " "
      ) {
        setIsFileChanged(false);
        setIsFileUplaoded(true);
        setFileSrc(episodeDetails.assets.episode_icon);
      }

      let recivedLearningData = [];
      for (let i = 0; i < selectedLearningData.length; i++) {
        recivedLearningData = [
          ...recivedLearningData,
          { id: i + 1, title: selectedLearningData[i] }
        ];
      }
      setLearningOutcome(recivedLearningData);

      let recivedTakeAwayData = [];
      for (let i = 0; i < selectedTakeAwayData.length; i++) {
        recivedTakeAwayData = [
          ...recivedTakeAwayData,
          { id: i + 1, title: selectedTakeAwayData[i] }
        ];
      }
      setTakeAway(recivedTakeAwayData);
    }
  }, [episodeDetails]);

  //console.log(techincalService);

  const filechangeHandler = event => {
    //let fileType = event.target.files[0].type;
    setMediaFile(event.target.files[0]);
    var reader = new FileReader();
    var url = reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = e => {
      setIsFileUplaoded(true);
      setFileSrc(reader.result);
    };
  };

  const reuploadMedia = () => {
    setIsFileChanged(true);
    setIsFileUplaoded(false);
    setFileSrc("");
    setMediaFile(null);
  };

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

  const discardMediaChange = () => {
    setIsFileChanged(false);
    setIsFileUplaoded(true);
    setFileSrc(episodeDetails.assets.episode_icon);
  };

  // learning outcome  starts

  const onAddLearningOutcomeContent = () => {
    setLearningOutcomeCount(learningOutcomeCount + 1);
    setLearningOutcome([
      ...learningOutcome,
      {
        id: learningOutcomeCount + 1,
        title: ""
      }
    ]);
  };

  const onLearningOutcomeFieldDelete = id => {
    let learning_outcome_data = learningOutcome;
    learning_outcome_data = learning_outcome_data.filter((choice, i) => {
      return choice.id !== id;
    });
    setLearningOutcome(learning_outcome_data);
    setLearningOutcomeCount(learningOutcomeCount - 1);
  };

  const onInputLearningOutcomeChange = (e, i) => {
    let learning_outcome_data = [...learningOutcome];
    learning_outcome_data[i] = {
      ...learning_outcome_data[i],
      title: e.target.value
    };
    // console.log(learning_outcome_data);
    setLearningOutcome(learning_outcome_data);
  };

  const renderLearningOutcomeFields = () => {
    return learningOutcome.map((col, i) => (
      <div key={i} style={{ marginBottom: "20px" }}>
        <Row gutter={24}>
          <Col span={20}>
            <Input
              placeholder="Enter title"
              onChange={e => onInputLearningOutcomeChange(e, i)}
              value={col.title}
            />
          </Col>

          <Col span={4} style={{ paddingLeft: 15 }}>
            <Icon
              type="minus-circle"
              onClick={() => onLearningOutcomeFieldDelete(col.id)}
              theme="twoTone"
              twoToneColor="red"
              style={{ fontSize: 30 }}
            />
          </Col>
        </Row>
      </div>
    ));
  };

  // learning outcome  ends

  // take away  starts
  const onAddTakeAwayContent = () => {
    setTakeAwayCount(takeAwayCount + 1);
    setTakeAway([
      ...takeAway,
      {
        id: takeAwayCount + 1,
        title: ""
      }
    ]);
  };

  const onTakeAwayFieldDelete = id => {
    let take_away_data = takeAway;
    take_away_data = take_away_data.filter((choice, i) => {
      return choice.id !== id;
    });
    setTakeAway(take_away_data);
    setTakeAwayCount(takeAwayCount - 1);
  };

  const onInputTakeAwayChange = (e, i) => {
    let take_away_data = [...takeAway];
    take_away_data[i] = {
      ...take_away_data[i],
      title: e.target.value
    };
    // console.log(learning_outcome_data);
    setTakeAway(take_away_data);
  };

  const renderTakeAwayFields = () => {
    return takeAway.map((col, i) => (
      <div key={i} style={{ marginBottom: "20px" }}>
        <Row gutter={24}>
          <Col span={20}>
            <Input
              placeholder="Enter title"
              onChange={e => onInputTakeAwayChange(e, i)}
              value={col.title}
            />
          </Col>

          <Col span={4} style={{ paddingLeft: 15 }}>
            <Icon
              type="minus-circle"
              onClick={() => onTakeAwayFieldDelete(col.id)}
              theme="twoTone"
              twoToneColor="red"
              style={{ fontSize: 30 }}
            />
          </Col>
        </Row>
      </div>
    ));
  };

  // take away  ends

  const createNew = async () => {
    let finalLearningData = [];
    for (let i = 0; i < learningOutcome.length; i++) {
      finalLearningData.push(learningOutcome[i].title);
    }

    if (finalLearningData.length === 0) {
      message.warning("Please add Learning Outcome");
      return;
    } else {
      for (let i = 0; i < finalLearningData.length; i++) {
        if (
          finalLearningData[i] === "" ||
          finalLearningData[i] === " " ||
          finalLearningData[i] === null ||
          finalLearningData[i] === undefined
        ) {
          message.warning("Please fill all Learning Outcomes");
          return;
        }
      }
    }

    let finalTakeAway = [];
    for (let i = 0; i < takeAway.length; i++) {
      finalTakeAway.push(takeAway[i].title);
    }

    if (finalTakeAway.length === 0) {
      message.warning("Please add Take Away");
      return;
    } else {
      for (let i = 0; i < finalTakeAway.length; i++) {
        if (
          finalTakeAway[i] === "" ||
          finalTakeAway[i] === " " ||
          finalTakeAway[i] === null ||
          finalTakeAway[i] === undefined
        ) {
          message.warning("Please fill all Take Aways");
          return;
        }
      }
    }

    if (name === null || name === undefined || name === "" || name === " ") {
      message.warning("Please enter Name");
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
      techincalService === null ||
      techincalService === undefined ||
      techincalService === "" ||
      techincalService === " "
    ) {
      setTechincalService(undefined);
      message.warning("Please select techincal service");
      return;
    }

    if (isFileChanged) {
      if (
        mediaFile === null ||
        mediaFile === undefined ||
        mediaFile === "" ||
        mediaFile === " "
      ) {
        message.warning("Please select Episode Icon");
        return;
      }
    }

    let formValues = {};

    formValues = {
      technical_service_id: techincalService,
      name: name,
      description: description,
      episode_icon: mediaFile,
      learning_outcome: JSON.stringify({
        text: finalLearningData
      }),
      take_away: JSON.stringify({
        text: finalTakeAway
      })
    };

    try {
      // console.log(formValues);
      setLoading(true);
      await wyrTreeUpdate(user.Authorization, episodeId, formValues);
      setLoading(false);
      message.success("Episode Updated");
      props.setEditModalShow(false);
      props.setLoadAgain(!props.loadAgain);
      // props.submitEditEpisode(techincalService);
    } catch (error) {
      setLoading(false);
      props.setEditModalShow(false);
    }
  };

  return (
    <div>
      <Card
        bodyStyle={{ padding: 0, fontSize: "15px" }}
        loading={loading}
        bordered={false}
      >
        {/* technical service id starts*/}
        <div style={{ display: "flex", marginBottom: "25px" }}>
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
                defaultValue={techincalService}
                value={techincalService}
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
        </div>
        {/* 
            <Input
              type="text"
              style={{ color: "#777777" }}
              value={
                techincalService === 1
                  ? "Behavioral Module"
                  : "Functional Module"
              }
              disabled
            />
            */}
        {/* technical service id ends*/}
        {/* Name starts*/}
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
                value={name}
                placeholder="Episode Name"
                style={{
                  width: "100%"
                }}
                onChange={onNameChange}
              />
            </div>
          </div>
        </div>
        {/* Name ends*/}
        {/* Description starts*/}
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
                value={description}
                placeholder="Episode Name"
                style={{
                  width: "100%"
                }}
                onChange={onDescriptionChange}
              />
            </div>
          </div>
        </div>
        {/* Description ends*/}
        {/* Episode Icon starts*/}
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Media Upload
            <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            {isFileUplaoded === false ? (
              <label>
                <Input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  // value={fileSrc}
                  onChange={filechangeHandler}
                />
                <span
                  style={{
                    border: "1px solid #1890ff",
                    background: "#fff",
                    color: "#1890ff",
                    fontWeight: 400,
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "6.5px 15px",
                    borderRadius: "4px",
                    lineHeight: "1.499"
                  }}
                >
                  <Icon type="upload" style={{ paddingRight: "5px" }} />
                  Upload
                </span>
                <div style={{ marginTop: "15px" }}>
                  <span>
                    Size of Image (width * height) = <b> (653px * 196px) </b>
                  </span>
                  <div>
                    Resolution (DPI) = <b>72</b>
                  </div>
                </div>
              </label>
            ) : (
              <div style={{ maxWidth: "100%" }}>
                <div style={{ marginBottom: "20px", textAlign: "right" }}>
                  <Button type="danger" onClick={() => reuploadMedia()}>
                    Change Media
                  </Button>
                </div>
                {isFileChanged === true ? (
                  <div style={{ marginTop: "30px", textAlign: "right" }}>
                    <Button type="danger" onClick={() => discardMediaChange()}>
                      Discard Media Change
                    </Button>
                  </div>
                ) : null}
                <div>
                  <img src={fileSrc} alt="icon" style={{ maxWidth: "60%" }} />
                  <div style={{ marginTop: "15px" }}>
                    <span>
                      Size of Image (width * height) = <b> (653px * 196px) </b>
                    </span>
                    <div>
                      Resolution (DPI) = <b>72</b>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* learning outcome starts*/}
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Learning Outcome
            <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <div style={{ marginBottom: "10px" }}>
              {renderLearningOutcomeFields()}
            </div>
            <Row>
              <div style={{ textAlign: "center" }}>
                <Button type="primary" onClick={onAddLearningOutcomeContent}>
                  Add LO
                  <Icon
                    type="plus-circle"
                    theme="twoTone"
                    style={{ fontSize: 20 }}
                  />
                </Button>
              </div>
            </Row>
          </div>
        </div>

        {/* learning outcome ends*/}

        {/* take away starts*/}
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Take Away
            <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <div style={{ marginBottom: "10px" }}>{renderTakeAwayFields()}</div>
            <Row>
              <div style={{ textAlign: "center" }}>
                <Button type="primary" onClick={onAddTakeAwayContent}>
                  Add TA
                  <Icon
                    type="plus-circle"
                    theme="twoTone"
                    style={{ fontSize: 20 }}
                  />
                </Button>
              </div>
            </Row>
          </div>
        </div>

        {/* take away ends*/}
        {/* Episode Icon ends*/}
        {/* Visibility starts*/}
        {/* 
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Visibility
            <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <div>
              <Select
                style={{ width: "100%" }}
                placeholder="Select Visibility"
                onChange={value => setVisibility(value)}
              >
                <Select.Option value="public">Public</Select.Option>
                <Select.Option value="private">Private</Select.Option>
              </Select>
            </div>
            {visibility === undefined ? (
              <div style={{ color: "red", marginTop: "5px" }}>* Required</div>
            ) : null}
          </div>
        </div>
        */}
        {/* Visibility ends*/}

        <div style={{ margin: "60px 0px 30px 0px", textAlign: "center" }}>
          <Button type="primary" onClick={() => createNew()}>
            Update Episode
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Edit;
