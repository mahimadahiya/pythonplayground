import React, { useState } from "react";
import { Card, Select, Input, Icon, Button, message } from "antd";
import { wyrSeriesCreate } from "../../../../actions";
import { useSelector } from "react-redux";

const Create = props => {
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);
  const [techincalService, setTechincalService] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isIconFileUplaoded, setIsIconFileUplaoded] = useState(false);
  const [fileIconSrc, setFileIconSrc] = useState("");
  const [mediaIconFile, setMediaIconFile] = useState(null);
  const [isBackgroundFileUplaoded, setIsBackgroundFileUplaoded] = useState(
    false
  );
  const [fileBackgroundSrc, setFileBackgroundSrc] = useState("");
  const [mediaBackgroundFile, setMediaBackgroundFile] = useState(null);

  const filechangeIconHandler = event => {
    //let fileType = event.target.files[0].type;
    setMediaIconFile(event.target.files[0]);
    // console.log(event.target.files[0]);
    var readerIcon = new FileReader();
    var url = readerIcon.readAsDataURL(event.target.files[0]);
    readerIcon.onloadend = e => {
      setIsIconFileUplaoded(true);
      setFileIconSrc(readerIcon.result);
      // console.log(readerIcon.result);
    };
  };

  const reuploadIconMedia = () => {
    setIsIconFileUplaoded(false);
    setFileIconSrc("");
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
    setFileBackgroundSrc("");
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
      message.warning("Please enter action");
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
    if (
      mediaIconFile === null ||
      mediaIconFile === undefined ||
      mediaIconFile === "" ||
      mediaIconFile === " "
    ) {
      message.warning("Please select Series Background Icon");
      return;
    }
    if (
      mediaBackgroundFile === null ||
      mediaBackgroundFile === undefined ||
      mediaBackgroundFile === "" ||
      mediaBackgroundFile === " "
    ) {
      message.warning("Please select Series Background Icon");
      return;
    }

    let formValues = {};

    {
      formValues = {
        technical_service_id: techincalService,
        name: name,
        description: description,
        series_icon: mediaIconFile,
        series_background: mediaBackgroundFile
      };

      try {
        setLoading(true);
        await wyrSeriesCreate(user.Authorization, formValues);
        setLoading(false);
        message.success("Series Created");
        props.setCreateNewModalShow(false);
        props.submitCreateNewSeries(techincalService);
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
                placeholder="Serise Name"
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
                placeholder="Serise Description"
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
          <Button type="primary" onClick={() => createNew()}>
            Create New Series
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Create;
