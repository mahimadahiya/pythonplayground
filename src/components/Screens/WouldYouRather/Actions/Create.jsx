import React, { useState } from "react";
import { Card, Select, Input, Icon, Button, message } from "antd";
import { createNewWyrAction } from "../../../../actions";
import { useSelector } from "react-redux";

const Create = props => {
  const user = useSelector(state => state.userAuth);

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
  const [techincalService, setTechincalService] = useState(null);
  const [complexity, setComplexity] = useState(null);
  const [level, setLevel] = useState(null);

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

  const filechangeHandler = event => {
    let fileType = event.target.files[0].type;
    var reader = new FileReader();
    var url = reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = e => {
      console.log(reader.result);
    };

    // fileType === "image/jpg" ||
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

    let formValues = {
      action: action,
      technical_service_id: techincalService,
      complexity: complexity,
      level: level
    };

    try {
      console.log(formValues);
      setLoading(true);
      const response = await createNewWyrAction(user.Authorization, formValues);
      setLoading(false);
      message.success("Action Created");
      props.setCreateNewModalShow(false);
      props.submitCreateNewAction(techincalService);
    } catch (error) {
      setLoading(false);
      props.setCreateNewModalShow(false);
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
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <div>
              <Select
                style={{ width: "100%" }}
                placeholder="Select Level"
                onChange={value => setLevel(value)}
              >
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
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <div>
              <Select
                style={{ width: "100%" }}
                placeholder="Select Complexity"
                onChange={value => setComplexity(value)}
              >
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
        {/* <div style={{ display: "flex", marginBottom: "35px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Media Type
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <Select style={{ width: "100%" }} placeholder="Select Media Type">
              {mediaTypeList.map((item, i) => (
                <Select.Option key={i} value={item.slug}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div> */}
        {/* media type ends */}

        {/* media file starts */}
        {/* <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Media Upload
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
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
          </div>
        </div> */}
        {/* media file ends */}

        <div style={{ margin: "60px 0px 30px 0px", textAlign: "center" }}>
          <Button type="primary" onClick={() => createNew()}>
            Create New Action
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Create;
