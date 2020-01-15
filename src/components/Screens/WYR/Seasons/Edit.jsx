import React, { useState, useEffect } from "react";
import { Card, Input, Icon, Button, message } from "antd";
import { wyrSeasonUpdate } from "../../../../actions";
import { useSelector } from "react-redux";

const Edit = props => {
  const seasonDetails = props.seasonDetails;
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isFileUplaoded, setIsFileUplaoded] = useState(false);
  const [fileSrc, setFileSrc] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [seasonId, setSeasonId] = useState(null);
  const [isFileChanged, setIsFileChanged] = useState(false);

  useEffect(() => {
    // console.log(actionDetails);

    if (seasonDetails && Object.keys(seasonDetails).length !== 0) {
      setSeasonId(seasonDetails.id);
      setName(seasonDetails.name);
      setDescription(seasonDetails.description);
      if (
        seasonDetails.assets.season_icon !== null ||
        seasonDetails.assets.season_icon !== undefined ||
        seasonDetails.assets.season_icon !== "" ||
        seasonDetails.assets.season_icon !== " "
      ) {
        setIsFileChanged(false);
        setIsFileUplaoded(true);
        setFileSrc(seasonDetails.assets.season_icon);
      }
    }
  }, [seasonDetails]);

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
    setFileSrc(seasonDetails.assets.season_icon);
  };

  const createNew = async () => {
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

    let formValues = {};

    formValues = {
      name: name,
      description: description,
      season_icon: mediaFile
    };

    try {
      // console.log(formValues);
      setLoading(true);
      await wyrSeasonUpdate(user.Authorization, seasonId, formValues);
      setLoading(false);
      message.success("Season Updated");
      props.setEditModalShow(false);
      props.setLoadAgain(!props.loadAgain);
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
                placeholder="Season Name"
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
                placeholder="Season Description"
                style={{
                  width: "100%"
                }}
                onChange={onDescriptionChange}
              />
            </div>
          </div>
        </div>
        {/* Description ends*/}
        {/* Season Icon starts*/}
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Media Upload
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
        {/* Season Icon ends*/}

        <div style={{ margin: "60px 0px 30px 0px", textAlign: "center" }}>
          <Button type="primary" onClick={() => createNew()}>
            Update Season
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Edit;
