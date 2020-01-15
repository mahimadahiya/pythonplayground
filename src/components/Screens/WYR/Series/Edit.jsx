import React, { useState, useEffect } from "react";
import { Card, Select, Input, Icon, Button, message } from "antd";
import { wyrSeriesUpdate } from "../../../../actions";
import { useSelector } from "react-redux";

const Edit = props => {
  const seriesDetails = props.seriesDetails;
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isIconFileUplaoded, setIsIconFileUplaoded] = useState(false);
  const [fileIconSrc, setFileIconSrc] = useState("");
  const [mediaIconFile, setMediaIconFile] = useState(null);
  const [isBackgroundFileUplaoded, setIsBackgroundFileUplaoded] = useState(
    false
  );
  const [isBackgroundFileChanged, setIsBackgroundFileChanged] = useState(false);
  const [isIconFileChanged, setIsIconFileChanged] = useState(false);
  const [fileBackgroundSrc, setFileBackgroundSrc] = useState("");
  const [mediaBackgroundFile, setMediaBackgroundFile] = useState(null);
  const [seriesId, setSeriesId] = useState(null);

  useEffect(() => {
    if (seriesDetails && Object.keys(seriesDetails).length !== 0) {
      setSeriesId(seriesDetails.id);
      setName(seriesDetails.name);
      setDescription(seriesDetails.description);
      if (
        seriesDetails.assets.series_icon !== null ||
        seriesDetails.assets.series_icon !== undefined ||
        seriesDetails.assets.series_icon !== "" ||
        seriesDetails.assets.series_icon !== " "
      ) {
        setIsIconFileChanged(false);
        setIsIconFileUplaoded(true);
        setFileIconSrc(seriesDetails.assets.series_icon);
      }
      if (
        seriesDetails.assets.series_background !== null ||
        seriesDetails.assets.series_background !== undefined ||
        seriesDetails.assets.series_background !== "" ||
        seriesDetails.assets.series_background !== " "
      ) {
        setIsBackgroundFileChanged(false);
        setIsBackgroundFileUplaoded(true);
        setFileBackgroundSrc(seriesDetails.assets.series_background);
      }
    }

    return () => {};
  }, [seriesDetails]);

  const filechangeIconHandler = event => {
    //let fileType = event.target.files[0].type;
    setMediaIconFile(event.target.files[0]);
    var readerIcon = new FileReader();
    var url = readerIcon.readAsDataURL(event.target.files[0]);
    readerIcon.onloadend = e => {
      setIsIconFileUplaoded(true);
      setFileIconSrc(readerIcon.result);
    };
  };

  const reuploadIconMedia = () => {
    setIsIconFileUplaoded(false);
    setIsIconFileChanged(true);
    setFileIconSrc("");
    setMediaIconFile(null);
  };

  const discardIconMediaChange = () => {
    setIsIconFileChanged(false);
    setIsIconFileUplaoded(true);
    setFileIconSrc(seriesDetails.assets.series_icon);
  };

  const filechangeBackgroundHandler = event => {
    //let fileType = event.target.files[0].type;
    setMediaBackgroundFile(event.target.files[0]);
    var readerBack = new FileReader();
    var url = readerBack.readAsDataURL(event.target.files[0]);
    readerBack.onloadend = e => {
      setIsBackgroundFileUplaoded(true);
      setFileBackgroundSrc(readerBack.result);
    };
  };

  const reuploadBackgroundMedia = () => {
    setIsBackgroundFileUplaoded(false);
    setIsBackgroundFileChanged(true);
    setFileBackgroundSrc("");
    setMediaBackgroundFile(null);
  };

  const discardBackgroundMediaChange = () => {
    setIsBackgroundFileChanged(false);
    setIsBackgroundFileUplaoded(true);
    setFileBackgroundSrc(seriesDetails.assets.series_background);
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

  const onUpdate = async () => {
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

    {
      formValues = {
        name: name,
        description: description,
        series_icon: mediaIconFile,
        series_background: mediaBackgroundFile
      };

      try {
        setLoading(true);
        await wyrSeriesUpdate(user.Authorization, seriesId, formValues);
        setLoading(false);
        message.success("Series Updated");
        props.setEditModalShow(false);
        props.setLoadAgain(!props.loadAgain);
      } catch (error) {
        setLoading(false);
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
                placeholder="Series Name"
                value={name}
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
                placeholder="Series Description"
                value={description}
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
        {/* Series Icon starts*/}

        {/* Episode Icon starts*/}
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Icon Upload
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            {isIconFileUplaoded === false ? (
              <label>
                <Input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  //value={fileIconSrc}
                  onChange={filechangeIconHandler}
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
                  <Button type="danger" onClick={() => reuploadIconMedia()}>
                    Change Media
                  </Button>
                </div>
                {isIconFileChanged === true ? (
                  <div style={{ marginTop: "30px", textAlign: "right" }}>
                    <Button
                      type="danger"
                      onClick={() => discardIconMediaChange()}
                    >
                      Discard Media Change
                    </Button>
                  </div>
                ) : null}
                <div>
                  <img
                    src={fileIconSrc}
                    alt="icon"
                    style={{ maxWidth: "60%" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Episode Icon ends*/}

        {/* Series Icon ends*/}
        {/* Series Background starts*/}

        <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Background Upload
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            {isBackgroundFileUplaoded === false ? (
              <label>
                <Input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={filechangeBackgroundHandler}
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
                  <Button
                    type="danger"
                    onClick={() => reuploadBackgroundMedia()}
                  >
                    Change Media
                  </Button>
                </div>
                {isBackgroundFileChanged === true ? (
                  <div style={{ marginTop: "30px", textAlign: "right" }}>
                    <Button
                      type="danger"
                      onClick={() => discardBackgroundMediaChange()}
                    >
                      Discard Media Change
                    </Button>
                  </div>
                ) : null}
                <div>
                  <img
                    src={fileBackgroundSrc}
                    alt="icon"
                    style={{ maxWidth: "60%" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Series Background ends*/}

        <div style={{ margin: "60px 0px 30px 0px", textAlign: "center" }}>
          <Button type="primary" onClick={() => onUpdate()}>
            Update Series
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Edit;
