import React, { useState } from "react";
import { updateRolePlay } from "../../../actions";
import { Input, Button, Divider, message, Icon, Row, Col, Card } from "antd";
import { useSelector } from "react-redux";
import "./index.css";

const UpdateRp = props => {
  const user = useSelector(state => state.userAuth);

  const rolePlayId = props.rolePlayId;
  const changeTypeRp = props.changeTypeRp;

  const [loader, setLoader] = useState(false);

  const [avatarSource, setAvatarSource] = useState();
  const [isAvatarUploaded, SetIsAvatarUploaded] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);

  const [avatarName, setAvatarName] = useState();

  const onAvatarImageChange = event => {
    let fileType = event.target.files[0].type;
    var reader = new FileReader();
    var url = reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = e => {
      SetIsAvatarUploaded(true);
      setAvatarSource(reader.result);
    };

    if (
      fileType === "image/jpg" ||
      fileType === "image/jpeg" ||
      fileType === "image/png"
    ) {
      setAvatarImage(event.target.files[0]);
    } else {
      message.warning("Please Upload Image Files");
      return;
    }
  };

  const onRemoveAvatarImage = () => {
    SetIsAvatarUploaded(false);
    setAvatarImage(null);
  };

  const onAvatarNameChange = event => {
    setAvatarName(event.target.value);
  };

  const onUpdateRolePlay = async () => {
    let formData = new FormData();

    // change avatar name starts
    if (
      changeTypeRp === "avatar_left_name" ||
      changeTypeRp === "avatar_right_name"
    ) {
      if (
        avatarName === null ||
        avatarName === "" ||
        avatarName === " " ||
        avatarName === undefined
      ) {
        message.warning("Please add Avatar Name ");
        return;
      } else {
        if (changeTypeRp === "avatar_left_name") {
          formData.append("left_avatar_name", avatarName);
        } else if (changeTypeRp === "avatar_right_name") {
          formData.append("right_avatar_name", avatarName);
        }
      }
    }
    // change avatar name ends

    // change avatar images & background images starts
    if (
      changeTypeRp === "avatar_left_img" ||
      changeTypeRp === "avatar_right_img" ||
      changeTypeRp === "background"
    ) {
      if (
        avatarImage === null ||
        avatarImage === "" ||
        avatarImage === " " ||
        avatarImage === undefined
      ) {
        message.warning("Please Upload Avatar 1 Image ");
        return;
      } else {
        if (changeTypeRp === "avatar_left_img") {
          formData.append("left_avatar", avatarImage);
        } else if (changeTypeRp === "avatar_right_img") {
          formData.append("right_avatar", avatarImage);
        } else if (changeTypeRp === "background") {
          formData.append("background_file", avatarImage);
        }
      }
    }
    // change avatar images & background images ends

    setLoader(true);
    try {
      await updateRolePlay(user.Authorization, rolePlayId, formData);
      message.success("Role Play updated");
      setLoader(false);
      props.closeModal(false);
      props.setLoadAgain(!props.loadAgain);
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <div>
      <Card loading={loader}>
        <div
          style={{
            // border: "1px solid #c2c2c2",
            borderRadius: "5px",
            marginBottom: "30px"
          }}
        >
          {/* change avatar name starts */}
          {changeTypeRp === "avatar_left_name" ||
          changeTypeRp === "avatar_right_name" ? (
            <div style={{ margin: "30px 20px", textAlign: "center" }}>
              {" "}
              <Input placeholder="Name" onChange={onAvatarNameChange} />
            </div>
          ) : null}
          {/* change avatar name ends */}

          {/* change avatar image  starts */}

          {changeTypeRp === "avatar_left_img" ||
          changeTypeRp === "avatar_right_img" ||
          changeTypeRp === "background" ? (
            <div style={{ margin: "30px 20px", textAlign: "center" }}>
              {isAvatarUploaded === false ? (
                <label>
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
                      onChange={onAvatarImageChange}
                    />
                    <Icon type="upload" />
                    <b> Add New Image</b>
                  </span>
                </label>
              ) : (
                <Row>
                  <Col sm={14} md={14} lg={14}>
                    <img
                      src={avatarSource}
                      style={{ width: "120px", marginLeft: "30px" }}
                      alt="Avatar1"
                    />
                  </Col>
                  <Col
                    sm={6}
                    md={6}
                    lg={6}
                    style={{ margin: "auto 0px auto 30px" }}
                  >
                    <Button type="danger" onClick={onRemoveAvatarImage}>
                      Change
                    </Button>
                  </Col>
                </Row>
              )}
            </div>
          ) : null}
        </div>

        <div style={{ textAlign: "center", marginTop: "8%" }}>
          <Button
            onClick={() => onUpdateRolePlay()}
            style={{
              background: "deepskyblue",
              color: "white",
              fontWeight: "bold",
              padding: "2px 25px"
            }}
          >
            Update
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UpdateRp;
