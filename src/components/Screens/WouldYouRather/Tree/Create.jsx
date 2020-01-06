import React, { useState } from "react";
import { Card, Select, Input, Icon, Button, message } from "antd";
import { wyrTreeCreate } from "../../../../actions";
import { useSelector } from "react-redux";

const Create = props => {
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);
  const [techincalService, setTechincalService] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isFileUplaoded, setIsFileUplaoded] = useState(false);
  const [fileSrc, setFileSrc] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [visibility, setVisibility] = useState("");

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
    setIsFileUplaoded(false);
    setFileSrc("");
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

  const createNew = async () => {
    if (name === null || name === undefined || name === "" || name === " ") {
      message.warning("Please enter Name");
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
    if (
      mediaFile === null ||
      mediaFile === undefined ||
      mediaFile === "" ||
      mediaFile === " "
    ) {
      message.warning("Please select Episode Icon");
      return;
    }

    if (
      visibility === null ||
      visibility === undefined ||
      visibility === "" ||
      visibility === " "
    ) {
      message.warning("Please select Episode Icon");
      return;
    }

    let formValues = {};

    {
      formValues = {
        technical_service_id: techincalService,
        name: name,
        description: description,
        visibility: visibility,
        episode_icon: mediaFile
      };

      try {
        setLoading(true);
        await wyrTreeCreate(user.Authorization, formValues);
        setLoading(false);
        message.success("Episode Created");
        props.setCreateNewModalShow(false);
        props.setLoadAgain(!props.loadAgain);
        // props.submitCreateNewEpisode(techincalService);
      } catch (error) {
        setLoading(false);
        props.setCreateNewModalShow(false);
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
                placeholder="Episode Name"
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
                placeholder="Episode Description"
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
                <div>
                  <img src={fileSrc} alt="icon" style={{ maxWidth: "60%" }} />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Episode Icon ends*/}
        {/* Visibility starts*/}
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
        {/* Visibility ends*/}

        <div style={{ margin: "60px 0px 30px 0px", textAlign: "center" }}>
          <Button type="primary" onClick={() => createNew()}>
            Create New Episode
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Create;
