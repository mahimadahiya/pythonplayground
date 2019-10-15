import React, { useState } from "react";
import { addRolePlay } from "../../../actions";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Modal,
  Button,
  Divider,
  Upload,
  message,
  Icon,
  Row,
  Col,
  Card
} from "antd";

import "./index.css";

const CreateRolePlayModal = props => {
  const [loader, setLoader] = useState(false);
  const [Name, setName] = useState();
  const [avatarName1, setAvatarName1] = useState();
  const [avatarName2, setAvatarName2] = useState();
  const [Description, setDescription] = useState();
  const [PostDescription, SetPostDescription] = useState();

  const [backgroundImage, setBackgroundImage] = useState();
  const [backgroundSource, setBackgroundSource] = useState();
  const [isBackgroundUploaded, setIsBackgroundUploaded] = useState(false);

  const [avatarImage1, setAvatarImage1] = useState(null);
  const [avatarOneSource, setAvatarOneSource] = useState();
  const [isAvatarOneUploaded, SetIsAvatarOneUploaded] = useState(false);

  const [avatarImage2, setAvatarImage2] = useState(null);
  const [avatarTwoSource, setAvatarTwoSource] = useState();
  const [isAvatarTwoUploaded, setIsAvatarTwoUploaded] = useState(false);

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
      message.warning("Please upload image files");
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
      message.warning("Please upload image files");
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
      message.warning("Please upload image files");
      return;
    }
  };

  const onAddRolePlay = async () => {
    if (Name === null || Name === "" || Name === " " || Name === undefined) {
      message.warning("please fill name ");
      return;
    }
    if (
      avatarName1 === null ||
      avatarName1 === "" ||
      avatarName1 === " " ||
      avatarName1 === undefined
    ) {
      message.warning("please fill avatar 1 name ");
      return;
    }
    if (
      avatarImage1 === null ||
      avatarImage1 === "" ||
      avatarImage1 === " " ||
      avatarImage1 === undefined
    ) {
      message.warning("please upload avatar 1 image ");
      return;
    }
    if (
      avatarName2 === null ||
      avatarName2 === "" ||
      avatarName2 === " " ||
      avatarName2 === undefined
    ) {
      message.warning("please fill avatar 2 name ");
      return;
    }
    if (
      avatarImage2 === null ||
      avatarImage2 === "" ||
      avatarImage2 === " " ||
      avatarImage2 === undefined
    ) {
      message.warning("please upload avatar 2 image ");
      return;
    }
    if (
      backgroundImage === null ||
      backgroundImage === "" ||
      backgroundImage === " " ||
      backgroundImage === undefined
    ) {
      message.warning("please upload background image ");
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
      postDescription: PostDescription
    };
    setLoader(true);
    try {
      const response = await addRolePlay(user.Authorization, formValues);
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
        footer={false}
      >
        <Card loading={loader}>
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
                        borderRadius: "4px"
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
                  <img
                    src={avatarOneSource}
                    style={{ width: "120px", marginLeft: "30px" }}
                  />
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
                        borderRadius: "4px"
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
                  <img
                    src={avatarTwoSource}
                    style={{ width: "120px", marginLeft: "30px" }}
                  />
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
                  marginBottom: "15px"
                }}
              >
                <span
                  style={{
                    marginRight: "30px",
                    fontWeight: 600,
                    color: "#222222",
                    fontSize: "16px"
                  }}
                >
                  Background Image
                </span>
                {isBackgroundUploaded === false ? (
                  <label>
                    <span
                      style={{
                        border: "1px solid #999999",
                        padding: "5px 12px",
                        borderRadius: "4px"
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
                  <img
                    src={backgroundSource}
                    style={{ width: "120px", marginLeft: "30px" }}
                  />
                )}
              </div>
            </Row>
          </div>

          <div
            style={{
              border: "1px solid #c2c2c2",
              borderRadius: "5px",
              marginBottom: "30px"
            }}
          >
            <div style={{ margin: "20px 20px" }}>
              <div
                style={{
                  marginRight: "30px",
                  fontWeight: 600,
                  color: "#222222",
                  fontSize: "16px",
                  marginBottom: "20px"
                }}
              >
                Extra Details
              </div>
              <div style={{ marginBottom: "30px" }}>
                <Input
                  placeholder="Description"
                  onChange={onDescriptionChange}
                />
              </div>
              <div>
                <Input
                  placeholder="Post-Description"
                  onChange={onPostDescriptionChange}
                />
              </div>
            </div>
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
