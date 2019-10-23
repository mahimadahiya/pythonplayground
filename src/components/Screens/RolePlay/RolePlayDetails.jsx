import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  List,
  Button,
  Card,
  Popconfirm,
  message,
  Divider
} from "antd";
import {
  rolePlayConversationDetails,
  rolePlayConversationChangeStatus,
  rolePlayConversationDeleteConversation,
  fetchRpLayoutList
} from "../../../actions";
import AddConversationModal from "./AddConversationModal";
import EditConversationModal from "./EditConversationModal";

const RolePlayDetails = props => {
  const user = useSelector(state => state.userAuth);
  const [loading, setLoading] = useState(true);
  const [loadAgain, setLoadAgain] = useState(false);
  const rolePlayId = props.match.params.id;

  const [avatarOneName, setAvatarOneName] = useState();
  const [avatarOneImage, setAvatarOneImage] = useState();

  const [avatarTwoName, setAvatarTwoName] = useState();
  const [avatarTwoImage, setAvatarTwoImage] = useState();

  const [backgroundImage, setBackgroundImage] = useState();
  const [conversationDetails, setConversationDetails] = useState();
  const [openAddConversationModal, setOpenAddConversationModal] = useState(
    false
  );

  const [description, setDescription] = useState("");
  const [postDescription, setPostDescription] = useState("");

  const [editConverseDetails, setEditConverseDetails] = useState({});
  const [showEditConverseModal, setShowEditConverseModal] = useState(false);

  const [typeLayoutList, setTypeLayoutList] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      try {
        const details = await rolePlayConversationDetails(
          user.Authorization,
          rolePlayId
        );

        setAvatarOneName(
          details.result.rp_article_details.avatar_details[0].name
        );
        setAvatarTwoName(
          details.result.rp_article_details.avatar_details[1].name
        );
        setAvatarOneImage(
          details.result.rp_article_details.avatar_details[0].media_url
        );
        setAvatarTwoImage(
          details.result.rp_article_details.avatar_details[1].media_url
        );
        setBackgroundImage(details.result.rp_article_details.background_url);

        setDescription(details.result.rp_article_details.description);
        setPostDescription(details.result.rp_article_details.post_description);

        details.result.article_conversation = details.result.article_conversation.map(
          item => {
            let bgColor = "";

            if (item.type === "full_overlay") {
              bgColor = "#FFF1E9";
            } else if (item.type === "right_overlay") {
              bgColor = "#ECFCFF";
            } else if (item.type === "left_overlay") {
              bgColor = "#F9F9F9";
            } else if (item.type === "left_speaking") {
              bgColor = "#EEEEEE";
            } else if (item.type === "right_speaking") {
              bgColor = "#F1D4D4";
            }

            return {
              ...item,
              bgColor: bgColor
            };
          }
        );
        setConversationDetails(details.result.article_conversation);

        try {
          let response = await fetchRpLayoutList(user.Authorization);
          setTypeLayoutList(response.data.result.layout_list);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [user, rolePlayId, loadAgain]);

  const onAddConversationClick = () => {
    setOpenAddConversationModal(true);
  };

  const onConversationModalClose = () => {
    setOpenAddConversationModal(false);
  };

  const onRolePlayStatusChange = async () => {
    if (conversationDetails.length === 0) {
      message.warning("Please add conversation");
      return;
    }
    let tempList = [];
    tempList = conversationDetails.map(item => {
      return {
        id: item.id,
        sequence: item.sequence
      };
    });

    let formValues = {
      sequence_details: JSON.stringify(tempList),
      rp_article_id: rolePlayId
    };

    setLoading(true);
    try {
      setLoading(false);
      await rolePlayConversationChangeStatus(user.Authorization, formValues);
      message.success("Role Play status changed.");
      setLoadAgain(!loadAgain);
    } catch (error) {
      setLoading(false);
    }
  };

  const onDeleteConversation = async id => {
    if (id === null || id === undefined || id === "") {
      message.warning("Please select conversation");
      return;
    }

    let converseId = id;

    setLoading(true);
    try {
      setLoading(false);
      await rolePlayConversationDeleteConversation(
        user.Authorization,
        converseId
      );
      message.success("Conversation deleted");
      setLoadAgain(!loadAgain);
    } catch (error) {
      setLoading(false);
    }
  };

  const onEditConversation = id => {
    if (id === null || id === undefined || id === "") {
      message.warning("Please select conversation");
      return;
    }
    let tempList = null;
    for (let i = 0; i < conversationDetails.length; i++) {
      if (conversationDetails[i].id === id) {
        tempList = conversationDetails[i];
      }
    }
    setEditConverseDetails(tempList);
    setShowEditConverseModal(true);
  };

  return (
    <div>
      <Card loading={loading} bodyStyle={{ padding: "0px" }}>
        <div style={{ margin: "30px", textAlign: "right" }}>
          <Popconfirm
            onConfirm={() => onRolePlayStatusChange()}
            okText="Submit"
            placement="bottomLeft"
            title={"Are you sure you want to change status?"}
          >
            <Button type="primary">Change Status</Button>
          </Popconfirm>
        </div>
        <div style={{ textAlign: "center", background: "lightblue" }}>
          <h3 style={{ lineHeight: "44px" }}>Role Play</h3>
        </div>
        <div
          style={{
            border: "1px solid #999999",
            margin: "20px",
            borderRadius: "5px",
            padding: "35px"
          }}
        >
          <Row style={{ marginTop: "50px" }}>
            <Col sm={22} md={16} lg={16} style={{ marginLeft: "40px" }}>
              <div style={{ display: "flex", marginBottom: "30px" }}>
                <div style={{ width: "40%" }}>
                  <h3
                    style={{
                      border: "1px solid #999999",
                      padding: "12px",
                      marginBottom: "30px",
                      borderRadius: "5px"
                    }}
                  >
                    {avatarOneName}
                  </h3>
                </div>
                <div style={{ width: "50%", textAlign: "center" }}>
                  <img
                    src={avatarOneImage}
                    style={{ width: "90px" }}
                    alt="leftAvatar"
                  />
                </div>
              </div>

              <div style={{ display: "flex", marginBottom: "30px" }}>
                <div style={{ width: "40%" }}>
                  <h3
                    style={{
                      border: "1px solid #999999",
                      padding: "12px",
                      marginBottom: "30px",
                      borderRadius: "5px"
                    }}
                  >
                    {avatarTwoName}
                  </h3>
                </div>
                <div style={{ width: "50%", textAlign: "center" }}>
                  <img
                    src={avatarTwoImage}
                    style={{ width: "90px" }}
                    alt="rightAvatar"
                  />
                </div>
              </div>
            </Col>
            <Col sm={22} md={7} lg={7}>
              <div style={{ textAlign: "center" }}>
                <div>
                  <img
                    style={{ width: "120px", height: "150px" }}
                    src={backgroundImage}
                    alt="background"
                  />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <span style={{ fontWeight: "bold" }}>Background</span>
                </div>
              </div>
            </Col>
          </Row>

          <div
            style={{
              border: "1px solid #999999",
              borderRadius: "5px",
              margin: "30px 0px 20px 0px",
              padding: "15px 30px",
              fontSize: "15px"
            }}
          >
            <div style={{ color: "#333333", fontWeight: 600 }}>
              Description:
            </div>
            <div>
              {description === "" ||
              description === undefined ||
              description === null ? (
                <span>-</span>
              ) : (
                <span>{description}</span>
              )}
            </div>
          </div>

          <div
            style={{
              border: "1px solid #999999",
              borderRadius: "5px",
              margin: "30px 0px 20px 0px",
              padding: "15px 30px",
              fontSize: "15px"
            }}
          >
            <div style={{ color: "#333333", fontWeight: 600 }}>
              Post Description:
            </div>
            <div>
              {postDescription === "" ||
              postDescription === undefined ||
              postDescription === null ? (
                <span>-</span>
              ) : (
                <span>{postDescription}</span>
              )}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", background: "lightblue" }}>
          <h3 style={{ lineHeight: "44px" }}>Sequence</h3>
        </div>

        <div style={{ padding: "35px" }}>
          <List
            itemLayout="horizontal"
            dataSource={conversationDetails}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  style={{
                    border: "1px solid #999999",
                    padding: "20px",
                    borderRadius: "5px",
                    backgroundColor: item.bgColor
                  }}
                  key={item.id}
                  title={
                    <div>
                      <div style={{ marginBottom: "20px", textAlign: "right" }}>
                        <Button
                          onClick={() => onEditConversation(item.id)}
                          style={{ background: "#F1BC31", color: "#fff" }}
                        >
                          Edit
                        </Button>

                        <Divider type="vertical" />

                        <Popconfirm
                          onConfirm={() => onDeleteConversation(item.id)}
                          okText="Delete"
                          placement="bottomLeft"
                          title={"Are you sure you want to delete?"}
                        >
                          <Button style={{ background: "red", color: "#fff" }}>
                            Delete
                          </Button>
                        </Popconfirm>
                      </div>
                      <div>
                        <span>
                          {typeLayoutList.map(lay => {
                            return (
                              <span>
                                {item.type === lay.slug ? (
                                  <span>{lay.name}</span>
                                ) : null}
                              </span>
                            );
                          })}
                        </span>
                        {/* <span>{item.type}</span> */}
                        <span style={{ float: "right" }}>{item.timer} Sec</span>
                      </div>
                    </div>
                  }
                  description={
                    <div>
                      <div>{item.text}</div>
                      <hr />
                      <div
                        style={{
                          color: "#666666",
                          marginTop: "8px",
                          fontWeight: 600
                        }}
                      >
                        Extra Points
                      </div>
                      <div>
                        {item.extra_points.length !== 0 ? (
                          <div>
                            {item.extra_points.map((ep, i) => (
                              <div key={i}>
                                {i + 1}. {ep}
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />

          <div style={{ textAlign: "center" }}>
            <Button type="primary" onClick={onAddConversationClick}>
              Add Conversation
            </Button>
          </div>
        </div>
      </Card>

      {/* add conversation modal start */}
      {openAddConversationModal === true ? (
        <AddConversationModal
          visible={openAddConversationModal}
          onCancel={onConversationModalClose}
          onSubmitValues={onConversationModalClose}
          rolePlayId={rolePlayId}
          setLoadAgain={setLoadAgain}
          loadAgain={loadAgain}
        />
      ) : null}
      {/* add conversation modal end */}

      {/* edit conversation modal start */}
      {showEditConverseModal === true ? (
        <EditConversationModal
          visible={showEditConverseModal}
          onCancel={() => setShowEditConverseModal(false)}
          onSubmitValues={() => setShowEditConverseModal(false)}
          rolePlayId={rolePlayId}
          setLoadAgain={setLoadAgain}
          loadAgain={loadAgain}
          conversationDetails={editConverseDetails}
          setShowEditConverseModal={setShowEditConverseModal}
        />
      ) : null}
      {/* edit conversation modal end */}
    </div>
  );
};

export default RolePlayDetails;
