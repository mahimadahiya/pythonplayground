import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Card, Popconfirm, message, Divider, Icon } from "antd";
import {
  rolePlayConversationDetails,
  rolePlayConversationChangeStatus,
  rolePlayConversationDeleteConversation,
  fetchRpLayoutList,
  saveConversationSequence
} from "../../../actions";
import AddConversationModal from "./AddConversationModal";
import EditConversationModal from "./EditConversationModal";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import FlipMove from "react-flip-move";
import "./index.css";
import UpdateRp from "./UpdateRp";

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
  const [conversationDetails, setConversationDetails] = useState([]);
  const [openAddConversationModal, setOpenAddConversationModal] = useState(
    false
  );

  const [editConverseDetails, setEditConverseDetails] = useState({});
  const [showEditConverseModal, setShowEditConverseModal] = useState(false);

  const [typeLayoutList, setTypeLayoutList] = useState([]);

  const [status, setStatus] = useState(null);

  const [showUpdateRolePlayModal, setShowUpdateRolePlayModal] = useState(false);
  const [changeTypeRp, setChangeTypeRp] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      try {
        const details = await rolePlayConversationDetails(
          user.Authorization,
          rolePlayId
        );
        setStatus(details.result.rp_article_details.status);

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
        for (let i = 0; i < details.result.article_conversation.length; i++) {
          details.result.article_conversation[i]["class_name"] = "inActive";
        }

        // console.log("conversationDetails", details.result.article_conversation);
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
    tempList = conversationDetails.map((item, i) => {
      return {
        id: item.id,
        sequence: i + 1
      };
    });

    // console.log(conversationDetails);
    //console.log(tempList);

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

  //sequence save starts

  const onRolePlaySequenceSave = async () => {
    if (conversationDetails.length === 0) {
      message.warning("Please add conversation");
      return;
    }
    let tempList = [];
    tempList = conversationDetails.map((item, i) => {
      return {
        id: item.id,
        sequence: i + 1
      };
    });

    // console.log(conversationDetails);
    //console.log(tempList);

    let formValues = {
      sequence_details: JSON.stringify(tempList),
      rp_article_id: rolePlayId
    };

    setLoading(true);
    try {
      setLoading(false);
      await saveConversationSequence(user.Authorization, formValues);
      message.success("Role Play Sequence Saved.");
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

  //move conversation up

  const onMoveUp = (key, data) => {
    //console.log(data);
    if (key === 0) {
      message.warning("Already at the Top");
      return;
    } // disable method when the key its equal to 0
    let items = [...conversationDetails]; // assign data to items for don't repeat my self

    for (let i = 0; i < items.length; i++) {
      if (items[i].id === data.id) {
        items[i]["class_name"] = "conversationAnimation";
      } else {
        items[i]["class_name"] = "inActive";
      }
    }
    //console.log(items);
    const index = key - 1; // save in memory index value less than one
    const itemAbove = items[index]; // save in memory items index
    items[key - 1] = items[key]; // match id value with the key object
    items[key] = itemAbove;
    setConversationDetails(items);
  };

  //move conversation down
  const onMoveDown = (key, data) => {
    let items = [...conversationDetails];
    if (key === items.length - 1) {
      message.warning("Already at the Bottom");
      return;
    }
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === data.id) {
        items[i]["class_name"] = "conversationAnimation";
      } else {
        items[i]["class_name"] = "inActive";
      }
    }
    const index = key + 1;
    const itemBelow = items[index];
    items[key + 1] = items[key];
    items[key] = itemBelow;
    setConversationDetails(items);
  };

  // DRAG AND DROP CODE
  /* 
  const SortableItemConversation = SortableElement(({ value, key }) => (
    <li
      style={{
        display: "inline-block",
        border: "1px solid #999999",
        borderRadius: "5px",
        padding: "20px",
        margin: "10px 0px",
        width: "100%",
        cursor: "pointer",
        backgroundColor: value.bgColor
      }}
    >
      //title 
      <div>
        <div style={{ marginBottom: "20px", textAlign: "right" }}>
          <Button
            onClick={() => onEditConversation(value.id)}
            style={{ background: "#F1BC31", color: "#fff" }}
          >
            Edit
          </Button>

          <Divider type="vertical" />

          <Popconfirm
            onConfirm={() => onDeleteConversation(value.id)}
            okText="Delete"
            placement="bottomLeft"
            title={"Are you sure you want to delete?"}
          >
            <Button style={{ background: "red", color: "#fff" }}>Delete</Button>
          </Popconfirm>
        </div>
        <div>
          <span>
            {typeLayoutList.map(lay => {
              return (
                <span key={lay.slug}>
                  {value.type === lay.slug ? <span>{lay.name}</span> : null}
                </span>
              );
            })}
          </span>
          <span style={{ float: "right" }}>{value.timer} Sec</span>
        </div>
      </div>
      // description 
      <div>
        <div>{value.text}</div>
        <hr />
        <Button onClick={key => onMoveUp(key)}>Up</Button>
        <Button>Down</Button>

        {value.extra_points !== null ? (
          <div>
            {value.extra_points.length !== 0 ? (
              <div
                style={{
                  color: "#666666",
                  marginTop: "8px",
                  fontWeight: 600
                }}
              >
                Extra Points
              </div>
            ) : null}
          </div>
        ) : null}

        <div>
          {value.extra_points !== null ? (
            <div>
              {value.extra_points.length !== 0 ? (
                <div>
                  {value.extra_points.map((ep, i) => (
                    <div key={i}>
                      {i + 1}. {ep.text}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </li>
  ));
  const SortableListConversation = SortableContainer(({ items }) => {
    return (
      <ul style={{ padding: 0 }}>
        {items.map((item, index) => (
          <SortableItemConversation
            key={`item-${item.id}`}
            index={index}
            value={item}
          />
        ))}
      </ul>
    );
  });

  */

  const renderConversationList = () => {
    return conversationDetails.map((value, ind) => (
      <li
        key={ind}
        style={{
          display: "inline-block",
          border: "1px solid #999999",
          borderRadius: "5px",
          padding: "20px",
          margin: "10px 0px",
          width: "100%",
          cursor: "pointer",
          backgroundColor: value.bgColor
        }}
        className={value.class_name}
      >
        {/* title */}
        <div>
          <div style={{ marginBottom: "20px", textAlign: "right" }}>
            <Button
              onClick={() => onEditConversation(value.id)}
              style={{ background: "#F1BC31", color: "#fff" }}
            >
              Edit
            </Button>

            <Divider type="vertical" />

            <Popconfirm
              onConfirm={() => onDeleteConversation(value.id)}
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
                  <span key={lay.slug}>
                    {value.type === lay.slug ? <span>{lay.name}</span> : null}
                  </span>
                );
              })}
            </span>
            <span style={{ float: "right" }}>{value.timer} Sec</span>
          </div>
        </div>
        {/* description */}
        <div>
          <div>{value.text}</div>
          <hr />

          {value.extra_points !== null ? (
            <div>
              {value.extra_points.length !== 0 ? (
                <div
                  style={{
                    color: "#666666",
                    marginTop: "8px",
                    fontWeight: 600
                  }}
                >
                  Extra Points
                </div>
              ) : null}
            </div>
          ) : null}

          <div>
            {value.extra_points !== null ? (
              <div>
                {value.extra_points.length !== 0 ? (
                  <div>
                    {value.extra_points.map((ep, i) => (
                      <div key={i}>
                        {i + 1}. {ep.text}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <Button
            style={{ marginRight: "10px", fontWeight: "bold" }}
            onClick={() => onMoveUp(ind, value)}
          >
            Move Up
            <Icon
              style={{ fontSize: "17px", color: "black" }}
              type="arrow-up"
            />
          </Button>
          <Button
            style={{ fontWeight: "bold" }}
            onClick={() => onMoveDown(ind, value)}
          >
            Move Down{" "}
            <Icon
              style={{ fontSize: "17px", color: "black" }}
              type="arrow-down"
            />
          </Button>
        </div>
      </li>
    ));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setConversationDetails(arrayMove(conversationDetails, oldIndex, newIndex));
  };

  const updateRPDetail = type => {
    setChangeTypeRp(type);
    setShowUpdateRolePlayModal(true);
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
            <Button type="primary">
              Change Status to
              <span style={{ marginLeft: "5px" }}>
                {status === 1 ? "Live" : "Draft"}
              </span>
            </Button>
          </Popconfirm>
        </div>
        <div style={{ textAlign: "center", background: "lightblue" }}>
          <h3 style={{ lineHeight: "44px" }}>Role Play</h3>
        </div>
        <div
          style={{
            margin: "20px",
            borderRadius: "5px",
            padding: "35px"
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              margin: "auto",
              position: "relative"
            }}
            className="avatarBackground"
          >
            <div className="HoverBgOverlayBtn">
              <Button
                style={{
                  background: "#001529",
                  border: "none",
                  color: "#fff"
                }}
                onClick={() => updateRPDetail("background")}
              >
                Edit
              </Button>
            </div>

            <img
              src={backgroundImage}
              alt="backgroundImage"
              style={{
                maxWidth: "100%"
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "20px",
                width: "100%"
              }}
            >
              <div
                style={{
                  display: "flex"
                }}
              >
                {/* avatar 1 starts */}
                <div
                  style={{
                    margin: "auto",
                    width: "45%",
                    position: "relative"
                  }}
                >
                  <div className="avatarImageContainer avatarImage">
                    <img
                      src={avatarOneImage}
                      style={{
                        maxHeight: "30vh"
                      }}
                      alt="leftAvatar"
                    />
                    <div className="HoverOverlay"></div>
                    <div className="HoverOverlayBtn">
                      <Button
                        style={{
                          background: "#001529",
                          border: "none",
                          color: "#fff"
                        }}
                        onClick={() => updateRPDetail("avatar_left_img")}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div
                    className="avatarImage"
                    style={{ margin: "10px auto", padding: "10px 0px" }}
                  >
                    <div
                      className="avatarName "
                      style={{ background: "#d21b3e" }}
                    >
                      {avatarOneName}
                    </div>
                    <div className="HoverOverlay"></div>
                    <div className="HoverOverlayBtn">
                      <Button
                        style={{
                          background: "#001529",
                          border: "none",
                          color: "#fff"
                        }}
                        onClick={() => updateRPDetail("avatar_left_name")}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                {/* avatar 1 ends */}

                {/* avatar 2 starts */}
                <div
                  style={{
                    margin: "auto",
                    width: "45%",
                    position: "relative"
                  }}
                >
                  <div className="avatarImageContainer avatarImage">
                    <img
                      src={avatarTwoImage}
                      style={{
                        maxHeight: "30vh"
                      }}
                      alt="rightAvatar"
                    />
                    <div className="HoverOverlay"></div>
                    <div className="HoverOverlayBtn">
                      <Button
                        style={{
                          background: "#001529",
                          border: "none",
                          color: "#fff"
                        }}
                        onClick={() => updateRPDetail("avatar_right_img")}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div
                    className="avatarImage"
                    style={{ margin: "10px auto", padding: "10px 0px" }}
                  >
                    <div
                      className="avatarName "
                      style={{ background: "#d21b3e" }}
                    >
                      {avatarTwoName}
                    </div>
                    <div className="HoverOverlay"></div>
                    <div className="HoverOverlayBtn">
                      <Button
                        style={{
                          background: "#001529",
                          border: "none",
                          color: "#fff"
                        }}
                        onClick={() => updateRPDetail("avatar_right_name")}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                {/* avatar 2 ends */}
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", background: "lightblue" }}>
          <h3 style={{ lineHeight: "44px" }}>Sequence</h3>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "45%", margin: "30px 20px", fontWeight: 600 }}>
            Re-arrange to change sequence
          </div>
          <div
            style={{ width: "45%", margin: "30px 20px", textAlign: "right" }}
          >
            <Button onClick={onRolePlaySequenceSave} type="primary">
              Save Sequence
            </Button>
          </div>
        </div>
        <div style={{ margin: "35px" }}>
          {renderConversationList()}
          {/* 
          <SortableListConversation
            items={conversationDetails}
            onSortEnd={onSortEnd}
          />
          */}

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

      {/* update rp detail modal starts */}
      <Modal
        title="Update "
        visible={showUpdateRolePlayModal}
        onCancel={() => setShowUpdateRolePlayModal(false)}
        destroyOnClose={true}
        footer={false}
      >
        <UpdateRp
          changeTypeRp={changeTypeRp}
          closeModal={setShowUpdateRolePlayModal}
          rolePlayId={rolePlayId}
          setLoadAgain={setLoadAgain}
          loadAgain={loadAgain}
        />
      </Modal>
      {/* update rp detail modal ends */}
    </div>
  );
};

export default RolePlayDetails;
