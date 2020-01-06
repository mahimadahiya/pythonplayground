import React, { useState, useEffect } from "react";
import { Card, Input, Icon, Button, message } from "antd";
import { wyrTreeUpdate } from "../../../../actions";
import { useSelector } from "react-redux";

const Edit = props => {
  const episodeDetails = props.episodeDetails;
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

  useEffect(() => {
    // console.log(actionDetails);

    if (episodeDetails && Object.keys(episodeDetails).length !== 0) {
      setEpisodeId(episodeDetails.id);
      setName(episodeDetails.name);
      setDescription(episodeDetails.description);
      setTechincalService(episodeDetails.technical_service_id);
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
    }

    return () => {};
  }, [episodeDetails]);

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

  {
    /* 

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
  */
  }

  const discardMediaChange = () => {
    setIsFileChanged(false);
    setIsFileUplaoded(true);
    setFileSrc(episodeDetails.assets.episode_icon);
  };

  const createNew = async () => {
    if (
      mediaFile === null ||
      mediaFile === undefined ||
      mediaFile === "" ||
      mediaFile === " "
    ) {
      message.warning("Please select Episode Icon");
      return;
    }

    let formValues = {};

    formValues = {
      episode_icon: mediaFile
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
            {/* <span style={{ color: "red", paddingLeft: "4px" }}>*</span> */}
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
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
          </div>
        </div>
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
                disabled
                placeholder="Episode Name"
                style={{
                  width: "100%"
                }}
                //onChange={onNameChange}
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
                disabled
                placeholder="Episode Name"
                style={{
                  width: "100%"
                }}
                // onChange={onDescriptionChange}
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
                </div>
              </div>
            )}
          </div>
        </div>
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
