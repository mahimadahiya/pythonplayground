import React, { useEffect, useState } from "react";
import { addConversation, fetchRpLayoutList } from "../../../actions";
import { useSelector } from "react-redux";
import { Input, Modal, Button, Select, message, Card, Icon } from "antd";

import "./index.css";
const { Option } = Select;

const AddConversationModal = props => {
  const user = useSelector(state => state.userAuth);

  const rolePlayId = props.rolePlayId;
  const [loader, setLoader] = useState(false);
  const [type, SetType] = useState("");
  const [text, SetText] = useState("");
  const [timer, SetTimer] = useState(null);
  const [title, setTitle] = useState("");

  const [timerError, setTimerError] = useState(false);

  const [extraPoints, setExtraPoints] = useState([
    {
      id: 1,
      point: ""
    }
  ]);

  const [typeLayoutList, setTypeLayoutList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      setLoader(true);
      try {
        let response = await fetchRpLayoutList(user.Authorization);
        setTypeLayoutList(response.data.result.layout_list);
        setLoader(false);
      } catch (error) {
        setLoader(false);
      }
    };
    fetchList();

    // console.log("???????????");
    return () => {
      // console.log("?>>>>>>>>>>>>>>>>>");
      SetType("");
      SetText("");
      SetTimer(null);
      setTitle("");
      setTimerError(false);
      setExtraPoints([
        {
          id: 1,
          point: ""
        }
      ]);
    };
  }, [user.Authorization]);

  const onSelectTypeChange = value => {
    SetType(value);
  };

  const onTextChange = event => {
    SetText(event.target.value);
  };

  const onTimerChange = event => {
    if (event.target.value < 5) {
      setTimerError(true);
    } else {
      setTimerError(false);
      SetTimer(event.target.value);
    }
  };

  const onTitleChange = event => {
    setTitle(event.target.value);
  };

  const onExtraPoints = (i, event) => {
    let { name, value } = event.target;
    let ePoints = [...extraPoints];
    ePoints[i] = { ...ePoints[i], [name]: value };
    ePoints[i] = { ...ePoints[i], id: extraPoints.length + 1 };
    //    setExtraPoints({ePoints})
    setExtraPoints(ePoints);
  };

  const onAddingConversation = async () => {
    console.log(extraPoints);
    if (timerError === true) {
      message.warning("Timer cannot be less than 5 sec");
      return;
    }
    if (type === null || type === "" || type === " " || type === undefined) {
      message.warning("Please Select Type");
      return;
    }

    // if (
    //   title === null ||
    //   title === "" ||
    //   title === " " ||
    //   title === undefined
    // ) {
    //   message.warning("Please Fill Title");
    //   return;
    // }

    if (text === null || text === "" || text === " " || text === undefined) {
      message.warning("Please Fill Text");
      return;
    }
    if (
      timer === null ||
      timer === "" ||
      timer === " " ||
      timer === undefined
    ) {
      message.warning("Please Add Timer");
      return;
    }
    if (timer < 5) {
      message.warning("Timer cannot be less than 5 sec");
      return;
    }

    // if (
    //   extraPoints === null ||
    //   extraPoints === "" ||
    //   extraPoints === " " ||
    //   extraPoints === undefined ||
    //   extraPoints.length === 0
    // ) {
    //   message.warning("Please Add Extra Points");
    //   return;
    // }

    for (let i = 0; i < extraPoints.length; i++) {
      if (
        extraPoints[i].point === null ||
        extraPoints[i].point === "" ||
        extraPoints[i].point === " " ||
        extraPoints[i].point === undefined
      ) {
        message.warning(
          "Please fill all fields of extra points or delete the field"
        );
        return;
      }
    }

    const tempExtraPoints = extraPoints.map(item => item.point);

    let formValues = {
      text: text,
      conversation_type: type,
      timer: timer,
      rp_article_id: rolePlayId,
      title: title,
      extra_points: JSON.stringify(tempExtraPoints)
    };

    setLoader(true);
    try {
      await addConversation(user.Authorization, formValues);
      message.success("Conversation Added");
      props.onSubmitValues();
      setLoader(false);
      props.setLoadAgain(!props.loadAgain);
    } catch (error) {
      setLoader(false);
    }
  };

  const renderExtraPointsUi = data =>
    data.map((item, i) => (
      <div style={{ marginTop: "30px" }} key={i}>
        <Input
          style={{ maxWidth: "400px", width: "100%" }}
          placeholder=""
          name="point"
          value={item.point || ""}
          onChange={value => onExtraPoints(i, value)}
        />
        <Icon
          onClick={() => deleteEpInputField(i)}
          type="minus-circle-o"
          style={{
            color: "red",
            fontSize: "18px",
            marginLeft: "10px",
            marginTop: "10px"
          }}
        />
      </div>
    ));

  const addEpInputField = () => {
    let field = {
      id: extraPoints.length + 1,
      point: ""
    };
    let newData = [...extraPoints, field];
    setExtraPoints(newData);
  };

  const deleteEpInputField = i => {
    let ep = [...extraPoints];
    ep.splice(i, 1);
    setExtraPoints(ep);
  };

  return (
    <div>
      <Modal
        title="Add A Conversation"
        visible={props.visible}
        onCancel={props.onCancel}
        destroyOnClose={true}
        footer={false}
      >
        <Card loading={loader}>
          <div>
            <div>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select Type"
                optionFilterProp="children"
                onChange={onSelectTypeChange}
              >
                {typeLayoutList.map(item => {
                  return (
                    <Option value={item.slug} key={item.slug}>
                      {item.name}
                    </Option>
                  );
                })}
                {/* <Option value="Full Overlay">Full Overlay</Option>
                <Option value="Right Overlay">Right Overlay</Option>
                <Option value="Left Overlay">Left Overlay</Option>
                <Option value="Speaking-Left">Speaking-Left</Option>
                <Option value="Speaking-Right">Speaking-Right</Option> */}
              </Select>
            </div>

            <div style={{ marginTop: "30px" }}>
              <Input
                style={{ maxWidth: "400px", width: "100%" }}
                placeholder="Title"
                onChange={onTitleChange}
              />
            </div>

            <div style={{ marginTop: "30px" }}>
              <Input
                style={{ maxWidth: "400px", width: "100%" }}
                onChange={onTextChange}
                placeholder="Text"
              />
            </div>

            <div style={{ marginTop: "30px" }}>
              <div>
                <Input
                  type="number"
                  min="5"
                  step="5"
                  placeholder="Timer Minimum time 5 sec"
                  onChange={onTimerChange}
                  style={
                    timerError === true
                      ? {
                          border: "1px solid red",
                          maxWidth: "400px",
                          width: "100%",
                          outline: "none"
                        }
                      : {
                          border: "1px solid #d9d9d9",
                          maxWidth: "400px",
                          width: "100%",
                          outline: "none"
                        }
                  }
                />
              </div>
              {timerError === true ? (
                <div style={{ color: "red" }}>
                  * Timer cannot not be less than 5 secs
                </div>
              ) : null}
            </div>

            <div>
              <div style={{ marginTop: "18px", fontWeight: "bold" }}>
                Extra Points
              </div>
              <div style={{ maxWidth: "400px", textAlign: "right" }}>
                <Icon
                  onClick={addEpInputField}
                  type="plus-circle"
                  theme="filled"
                  style={{
                    color: "blue",
                    fontSize: "18px"
                  }}
                ></Icon>
              </div>

              <div>{renderExtraPointsUi(extraPoints)}</div>
            </div>

            <div style={{ marginTop: "30px", textAlign: "center" }}>
              <Button type="primary" onClick={onAddingConversation}>
                Add
              </Button>
            </div>
          </div>
        </Card>
      </Modal>
    </div>
  );
};

export default AddConversationModal;
