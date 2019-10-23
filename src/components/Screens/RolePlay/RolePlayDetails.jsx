import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, List, Button, Card } from "antd";
import { rolePlayConversationDetails } from "../../../actions";
import AddConversationModal from "./AddConversationModal";

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

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      try {
        const details = await rolePlayConversationDetails(
          user.Authorization,
          rolePlayId
        );
        setLoading(false);

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

            if (item.type === "Full Overlay") {
              bgColor = "#FFF1E9";
            } else if (item.type === "Right Overlay") {
              bgColor = "#ECFCFF";
            } else if (item.type === "Left Overlay") {
              bgColor = "#F9F9F9";
            } else if (item.type === "Speaking-Left") {
              bgColor = "#EEEEEE";
            } else if (item.type === "Speaking-Right") {
              bgColor = "#F1D4D4";
            }

            return {
              ...item,
              bgColor: bgColor
            };
          }
        );
        setConversationDetails(details.result.article_conversation);
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

  return (
    <div>
      <Card loading={loading} bodyStyle={{ padding: "0px" }}>
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
                      <span>{item.type}</span>
                      <span style={{ float: "right" }}>{item.timer} Sec</span>
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
      <AddConversationModal
        visible={openAddConversationModal}
        onCancel={onConversationModalClose}
        onSubmitValues={onConversationModalClose}
        rolePlayId={rolePlayId}
        setLoadAgain={setLoadAgain}
        loadAgain={loadAgain}
      />
    </div>
  );
};

export default RolePlayDetails;
