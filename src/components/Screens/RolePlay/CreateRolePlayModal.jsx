import React, { useState } from "react";
import { addRolePlay } from "../../../actions";
import { useSelector } from "react-redux";
import {
  Input,
  Modal,
  Button,
  Divider,
  message,
  Icon,
  Row,
  Col,
  Card,
  Select
} from "antd";

import "./index.css";

const CreateRolePlayModal = props => {
  const [loader, setLoader] = useState(false);
  const [Name, setName] = useState();

  const [avatarName1, setAvatarName1] = useState();
  const [avatarImage1, setAvatarImage1] = useState(null);
  const [avatarOneSource, setAvatarOneSource] = useState();
  const [isAvatarOneUploaded, SetIsAvatarOneUploaded] = useState(false);

  const [avatarName2, setAvatarName2] = useState();
  const [avatarImage2, setAvatarImage2] = useState(null);
  const [avatarTwoSource, setAvatarTwoSource] = useState();
  const [isAvatarTwoUploaded, setIsAvatarTwoUploaded] = useState(false);

  const [Description, setDescription] = useState("");
  const [PostDescription, SetPostDescription] = useState("");

  const [backgroundImage, setBackgroundImage] = useState();
  const [backgroundSource, setBackgroundSource] = useState();
  const [isBackgroundUploaded, setIsBackgroundUploaded] = useState(false);

  const [technicalService, setTechnicalService] = useState(null);

  const user = useSelector(state => state.userAuth);
  const onNameChange = event => {
    setName(event.target.value);
  };

  const onAvatar1NameChange = event => {
    setAvatarName1(event.target.value);
  };

  const onAvatar2NameChange = event => {
    setAvatarName2(event.target.value);
  };

  const onDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const onPostDescriptionChange = event => {
    SetPostDescription(event.target.value);
  };

  const onRemoveBackgroundImage = () => {
    setIsBackgroundUploaded(false);
    setBackgroundImage(null);
  };

  const onRemoveAvatarTwoImage = () => {
    setIsAvatarTwoUploaded(false);
    setAvatarImage2(null);
  };

  const onRemoveAvatarOneImage = () => {
    SetIsAvatarOneUploaded(false);
    setAvatarImage1(null);
  };

  const onAvatar1ImageChange = event => {
    let fileType = event.target.files[0].type;
    var reader = new FileReader();
    var url = reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = e => {
      SetIsAvatarOneUploaded(true);
      setAvatarOneSource(reader.result);
    };

    if (
      fileType === "image/jpg" ||
      fileType === "image/jpeg" ||
      fileType === "image/png"
    ) {
      setAvatarImage1(event.target.files[0]);
    } else {
      message.warning("Please Upload Image Files");
      return;
    }
  };

  const onAvatar2ImageChange = event => {
    let fileType = event.target.files[0].type;
    var reader = new FileReader();
    var url = reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = e => {
      setIsAvatarTwoUploaded(true);
      setAvatarTwoSource(reader.result);
    };

    if (
      fileType === "image/jpg" ||
      fileType === "image/jpeg" ||
      fileType === "image/png"
    ) {
      setAvatarImage2(event.target.files[0]);
    } else {
      message.warning("Please Upload Image Files");
      return;
    }
  };

  const onBackgroundImageChange = event => {
    let fileType = event.target.files[0].type;
    var reader = new FileReader();
    var url = reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = e => {
      setIsBackgroundUploaded(true);
      setBackgroundSource(reader.result);
    };

    if (
      fileType === "image/jpg" ||
      fileType === "image/jpeg" ||
      fileType === "image/png"
    ) {
      setBackgroundImage(event.target.files[0]);
    } else {
      message.warning("Please Upload Image Files");
      return;
    }
  };

  const onAddRolePlay = async () => {
    if (Name === null || Name === "" || Name === " " || Name === undefined) {
      message.warning("Please Fill Name ");
      return;
    }
    if (
      technicalService === null ||
      technicalService === "" ||
      technicalService === " " ||
      technicalService === undefined
    ) {
      message.warning("Please Select TechnicalService ");
      return;
    }
    if (
      avatarName1 === null ||
      avatarName1 === "" ||
      avatarName1 === " " ||
      avatarName1 === undefined
    ) {
      message.warning("Please Fill Avatar 1 Name ");
      return;
    }
    if (
      avatarImage1 === null ||
      avatarImage1 === "" ||
      avatarImage1 === " " ||
      avatarImage1 === undefined
    ) {
      message.warning("Please Upload Avatar 1 Image ");
      return;
    }
    if (
      avatarName2 === null ||
      avatarName2 === "" ||
      avatarName2 === " " ||
      avatarName2 === undefined
    ) {
      message.warning("Please Fill Avatar 2 Name ");
      return;
    }
    if (
      avatarImage2 === null ||
      avatarImage2 === "" ||
      avatarImage2 === " " ||
      avatarImage2 === undefined
    ) {
      message.warning("Please Upload Avatar 2 Image ");
      return;
    }
    if (
      backgroundImage === null ||
      backgroundImage === "" ||
      backgroundImage === " " ||
      backgroundImage === undefined
    ) {
      message.warning("Please Upload Background Image ");
      return;
    }
    let formValues = {
      name: Name,
      leftAvatarName: avatarName1,
      rightAvatarName: avatarName2,
      leftAvatarImage: avatarImage1,
      rightAvatarImage: avatarImage2,
      backImage: backgroundImage,
      description: Description,
      postDescription: PostDescription,
      technical_service_id: technicalService
    };
    setLoader(true);
    try {
      await addRolePlay(user.Authorization, formValues);
      message.success("Role Play created");
      setLoader(false);
      props.onModalClose();
      props.setLoadAgain(!props.loadAgain);
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <div>
      <Modal
        title="Add A New RolePlay"
        visible={props.visible}
        onCancel={props.onCancel}
        destroyOnClose={true}
        footer={false}
      >
        <Card loading={loader}>
          {/* technical service id starts*/}
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <div
              style={{
                width: "140px",
                fontWeight: 600
              }}
            >
              Technical Service
            </div>
            <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
              <div>
                <Select
                  style={{ maxWidth: "450px", width: "100%" }}
                  placeholder="Select technical service"
                  onChange={value => setTechnicalService(value)}
                >
                  <Select.Option value={1}>Behavioral Module</Select.Option>
                  <Select.Option value={2}>Functional Module</Select.Option>
                </Select>
              </div>
            </div>
          </div>
          {/* technical service id ends*/}
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <div
              style={{
                width: "140px",
                fontWeight: 600
              }}
            >
              Title
            </div>
            <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
              <div>
                <Input
                  style={{
                    width: "100%"
                  }}
                  onChange={onNameChange}
                  placeholder="Title"
                />
              </div>
            </div>
          </div>
          {/* 
          <div
            style={{
              fontWeight: 600,
              color: "#222222",
              fontSize: "16px"
            }}
          >
            Title
            <Input
              style={{ maxWidth: "450px", width: "100%", marginLeft: "30px" }}
              onChange={onNameChange}
              placeholder="Title"
            />
          </div>
          */}
          <Divider type="horizontal" />

          <div
            style={{
              border: "1px solid #c2c2c2",
              borderRadius: "5px",
              marginBottom: "30px"
            }}
          >
            <Row style={{ margin: "30px 20px" }}>
              <div
                style={{
                  marginBottom: "15px",
                  fontWeight: 600,
                  color: "#222222",
                  fontSize: "16px"
                }}
              >
                Avatar-1 Details
              </div>
              <Col sm={6} md={6} lg={8}>
                <Input placeholder="Name" onChange={onAvatar1NameChange} />
              </Col>
              <Col sm={12} md={12} lg={12} style={{ paddingTop: "5px" }}>
                {isAvatarOneUploaded === false ? (
                  <label style={{ marginLeft: "30px" }}>
                    <span
                      style={{
                        border: "1px solid #999999",
                        padding: "5px 12px",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      <input
                        type="file"
                        style={{ display: "none" }}
                        accept=" image/jpeg, image/png"
                        onChange={onAvatar1ImageChange}
                      />
                      <Icon type="upload" />
                      <b> Add Icon</b>
                    </span>
                  </label>
                ) : (
                  <Row>
                    <Col sm={14} md={14} lg={14}>
                      <img
                        src={avatarOneSource}
                        style={{ width: "120px", marginLeft: "30px" }}
                        alt="Avatar1"
                      />
                    </Col>
                    <Col sm={6} md={6} lg={6} style={{ marginLeft: "30px" }}>
                      <Button type="danger" onClick={onRemoveAvatarOneImage}>
                        Change
                      </Button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </div>

          <div
            style={{
              border: "1px solid #c2c2c2",
              borderRadius: "5px",
              marginBottom: "30px"
            }}
          >
            <Row style={{ margin: "30px 20px" }}>
              <div
                style={{
                  marginBottom: "15px",
                  fontWeight: 600,
                  color: "#222222",
                  fontSize: "16px"
                }}
              >
                Avatar-2 Details
              </div>
              <Col sm={6} md={6} lg={8}>
                <Input placeholder="Name" onChange={onAvatar2NameChange} />
              </Col>
              <Col sm={12} md={12} lg={12} style={{ paddingTop: "5px" }}>
                {isAvatarTwoUploaded === false ? (
                  <label style={{ marginLeft: "30px" }}>
                    <span
                      style={{
                        border: "1px solid #999999",
                        padding: "5px 12px",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      <input
                        type="file"
                        style={{ display: "none" }}
                        accept=" image/jpeg, image/png"
                        onChange={onAvatar2ImageChange}
                      />
                      <Icon type="upload" />
                      <b> Add Icon</b>
                    </span>
                  </label>
                ) : (
                  <Row>
                    <Col sm={14} md={14} lg={14}>
                      <img
                        src={avatarTwoSource}
                        style={{ width: "120px", marginLeft: "30px" }}
                        alt="Avatar2"
                      />
                    </Col>
                    <Col sm={6} md={6} lg={6} style={{ marginLeft: "30px" }}>
                      <Button type="danger" onClick={onRemoveAvatarTwoImage}>
                        Change
                      </Button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </div>
          <div
            style={{
              border: "1px solid #c2c2c2",
              borderRadius: "5px",
              marginBottom: "30px"
            }}
          >
            <Row style={{ margin: "30px 20px" }}>
              <span
                style={{
                  marginRight: "30px",
                  fontWeight: 600,
                  color: "#222222",
                  fontSize: "16px",
                  marginBottom: "20px"
                }}
              >
                Background Image
              </span>
              {isBackgroundUploaded === false ? (
                <label>
                  <span
                    style={{
                      border: "1px solid black",
                      padding: "5px 12px",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept=" image/jpeg, image/png"
                      onChange={onBackgroundImageChange}
                    />
                    <Icon type="upload" />
                    <b> Add Image</b>
                  </span>
                </label>
              ) : (
                <Row style={{ marginTop: "30px" }}>
                  <Col sm={14} md={14} lg={14}>
                    <img
                      src={backgroundSource}
                      style={{ width: "120px", marginLeft: "30px" }}
                      alt="background"
                    />
                  </Col>
                  <Col style={{ marginLeft: "30px" }} sm={6} md={6} lg={6}>
                    <Button type="danger" onClick={onRemoveBackgroundImage}>
                      Change
                    </Button>
                  </Col>
                </Row>
              )}
            </Row>
          </div>

          <div
            style={{
              border: "1px solid #c2c2c2",
              borderRadius: "5px",
              marginBottom: "30px"
            }}
          >
            <div
              style={{
                margin: "20px",
                fontWeight: 600,
                color: "#222222",
                fontSize: "16px"
              }}
            >
              Extra Details
            </div>

            <Row style={{ margin: "30px 20px" }}>
              <Col sm={6} md={6} lg={8}>
                <Input
                  placeholder="Description"
                  onChange={onDescriptionChange}
                />
              </Col>
              <Col style={{ marginLeft: "30px" }} sm={6} md={6} lg={8}>
                <Input
                  placeholder="Post-Description"
                  onChange={onPostDescriptionChange}
                />
              </Col>
            </Row>
          </div>
          <div style={{ textAlign: "center", marginTop: "8%" }}>
            <Button
              onClick={() => onAddRolePlay()}
              style={{
                background: "deepskyblue",
                color: "white",
                fontWeight: "bold",
                padding: "2px 25px"
              }}
            >
              Create
            </Button>
          </div>
        </Card>
      </Modal>
    </div>
  );
};

export default CreateRolePlayModal;
