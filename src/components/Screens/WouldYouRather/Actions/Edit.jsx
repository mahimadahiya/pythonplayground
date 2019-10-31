import React, { useState, useEffect } from "react";
import { Card, Select, Input, Icon, Button, message } from "antd";
import { updateWyrAction } from "../../../../actions";
import { useSelector } from "react-redux";

const Edit = props => {
  const actionDetails = props.actionDetails;
  const user = useSelector(state => state.userAuth);

  const [actionId, setActionId] = useState(null);

  const [loading, setLoading] = useState(false);

  const complexityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const levelList = [1, 2, 3];
  const mediaTypeList = [
    {
      slug: "image",
      name: "Image"
    },
    {
      slug: "video",
      name: "Video"
    },
    {
      slug: "audio",
      name: "Audio"
    }
  ];

  const [fileAcceptType, setFileAcceptType] = useState("");

  // formValues
  const [action, setAction] = useState("");
  const [complexity, setComplexity] = useState(null);
  const [level, setLevel] = useState(null);

  const [mediaType, setMediaType] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [isFileUplaoded, setIsFileUplaoded] = useState(false);
  const [fileSrc, setFileSrc] = useState("");

  const [technicalServiceId, setTechnicalServiceId] = useState(null);

  const [isFileChanged, setIsFileChanged] = useState(false);

  useEffect(() => {
    // console.log(actionDetails);

    if (actionDetails && Object.keys(actionDetails).length !== 0) {
      setActionId(actionDetails.id);
      setAction(actionDetails.action);
      setTechnicalServiceId(actionDetails.technical_service_id);
      setLevel(actionDetails.level);
      setComplexity(actionDetails.complexity);

      if (
        actionDetails.mediaType !== null ||
        actionDetails.mediaType !== undefined ||
        actionDetails.mediaType !== "" ||
        actionDetails.mediaType !== " "
      ) {
        setMediaType(actionDetails.media_type);
      }

      if (
        actionDetails.media_url !== null ||
        actionDetails.media_url !== undefined ||
        actionDetails.media_url !== "" ||
        actionDetails.media_url !== " "
      ) {
        setIsFileChanged(false);
        setIsFileUplaoded(true);
        setFileSrc(actionDetails.media_url);
      }
    }

    return () => {};
  }, [actionDetails]);

  const onActionChange = event => {
    if (
      event.target.value === "" ||
      event.target.value === "" ||
      event.target.value === undefined
    ) {
      setAction(null);
    } else {
      setAction(event.target.value);
    }
  };

  const onMediaTypeChange = event => {
    setIsFileChanged(true);
    setMediaType(event);
    setIsFileUplaoded(false);
    setFileSrc("");
    setMediaFile(null);
    if (event === "image") {
      setFileAcceptType("image/*");
    } else if (event === "audio") {
      setFileAcceptType("audio/*");
    } else if (event === "video") {
      setFileAcceptType("video/*");
    }
  };

  const filechangeHandler = event => {
    let fileType = event.target.files[0].type;

    // media check
    if (mediaType === "image") {
      if (fileType.split("/")[0] === "image") {
        setMediaFile(event.target.files[0]);
      } else {
        message.warning("Please upload image");
        setMediaFile(null);
        return;
      }
    } else if (mediaType === "audio") {
      if (fileType.split("/")[0] === "audio") {
        setMediaFile(event.target.files[0]);
      } else {
        message.warning("Please upload audio");
        setMediaFile(null);
        return;
      }
    } else if (mediaType === "video") {
      if (fileType.split("/")[0] === "video") {
        setMediaFile(event.target.files[0]);
      } else {
        message.warning("Please upload video");
        setMediaFile(null);
        return;
      }
    }
    var reader = new FileReader();
    var url = reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = e => {
      setIsFileUplaoded(true);
      setFileSrc(reader.result);
    };
  };

  const reuploadMedia = () => {
    setIsFileChanged(true);
    setMediaType(null);
    setIsFileUplaoded(false);
    setFileSrc("");
    setMediaFile(null);
  };

  const discardMediaChange = () => {
    setIsFileChanged(false);
    setMediaType(actionDetails.media_type);
    setIsFileUplaoded(true);
    setFileSrc(actionDetails.media_url);
  };

  const createNew = async () => {
    if (
      action === null ||
      action === undefined ||
      action === "" ||
      action === " "
    ) {
      message.warning("Please enter action");
      return;
    }

    if (
      level === null ||
      level === undefined ||
      level === "" ||
      level === " "
    ) {
      setLevel(undefined);
      message.warning("Please select level");
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
      level === null ||
      level === undefined ||
      level === "" ||
      level === " "
    ) {
      message.warning("Please select level");
      return;
    }

    let formValues = {};

    if (
      mediaType === "" ||
      mediaType === undefined ||
      mediaType === null ||
      mediaType === " "
    ) {
      formValues = {
        action: action,
        complexity: complexity,
        level: level
      };
    } else {
      if (isFileChanged === true) {
        if (mediaFile === null || mediaFile === undefined) {
          message.warning("Please upload media file or discard media change");
          return;
        } else {
          formValues = {
            action: action,
            complexity: complexity,
            level: level,
            media_type: mediaType,
            media_file: mediaFile
          };
        }
      } else {
        formValues = {
          action: action,
          complexity: complexity,
          level: level
        };
      }
    }

    try {
      // console.log(formValues);
      setLoading(true);
      await updateWyrAction(user.Authorization, actionId, formValues);
      setLoading(false);
      message.success("Action Updated");
      props.setEditModalShow(false);
      props.submitEditAction(props.selectedTechnicalId);
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
        {/* Action starts */}
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Action
            <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <div>
              <Input
                type="text"
                placeholder="Action"
                style={
                  action === null
                    ? {
                        width: "100%",
                        border: "0.5px solid red"
                      }
                    : {
                        width: "100%"
                      }
                }
                onChange={onActionChange}
                value={action}
              />
            </div>
            {action === null ? (
              <div style={{ color: "red", marginTop: "5px" }}>* Required</div>
            ) : null}
          </div>
        </div>
        {/* Action ends */}

        {/* techincalService starts */}
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
                technicalServiceId === 1
                  ? "Behavioral Module"
                  : "Functional Module"
              }
              disabled
            />
          </div>
        </div>
        {/* techincalService ends */}

        {/* Level starts */}
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Level
            <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <div>
              <Select
                style={{ width: "100%" }}
                placeholder="Select Level"
                onChange={value => setLevel(value)}
                value={level}
              >
                <Select.Option key={null} value={null}>
                  Select Level
                </Select.Option>
                {levelList.map((item, i) => (
                  <Select.Option key={i} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </div>
            {level === undefined ? (
              <div style={{ color: "red", marginTop: "5px" }}>* Required</div>
            ) : null}
          </div>
        </div>
        {/* Level ends */}

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
                value={complexity}
              >
                <Select.Option key={null} value={null}>
                  Select Complexity
                </Select.Option>
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

        {/* media type starts */}
        <div style={{ display: "flex", marginBottom: "35px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Media Type
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <div>
              <Select
                style={{ width: "100%" }}
                placeholder="Select Media Type"
                onChange={onMediaTypeChange}
                allowClear={true}
                value={mediaType}
              >
                <Select.Option key={"a"} value={null} disabled>
                  Select Media Type
                </Select.Option>
                {mediaTypeList.map((item, i) => (
                  <Select.Option key={i} value={item.slug}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            {isFileChanged === true ? (
              <div style={{ marginTop: "30px", textAlign: "right" }}>
                <Button type="danger" onClick={() => discardMediaChange()}>
                  Discard Media Change
                </Button>
              </div>
            ) : null}
          </div>
        </div>
        {/* media type ends */}

        {/* media file starts */}
        {mediaType === "" ||
        mediaType === " " ||
        mediaType === null ||
        mediaType === undefined ? null : (
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
                    accept={fileAcceptType}
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
                    {mediaType === "image" ? (
                      <img
                        src={fileSrc}
                        alt="icon"
                        style={{ maxWidth: "60%" }}
                      />
                    ) : null}

                    {mediaType === "audio" ? (
                      <audio
                        src={fileSrc}
                        controls
                        style={{ maxWidth: "60%" }}
                      ></audio>
                    ) : null}

                    {mediaType === "video" ? (
                      <video controls style={{ maxWidth: "60%" }}>
                        <source src={fileSrc} type="video/mp4" />
                      </video>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* media file ends */}

        <div style={{ margin: "60px 0px 30px 0px", textAlign: "center" }}>
          <Button type="primary" onClick={() => createNew()}>
            Update Action
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Edit;
