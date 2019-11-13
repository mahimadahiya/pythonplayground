import React,{useState,useEffect} from 'react';
import { Card, Select, Input, Icon, Button, message } from "antd";
import { updateWyrScenario } from "../../../../actions";
import { useSelector } from "react-redux";

const Edit = props => {
    const user = useSelector(state => state.userAuth);
    const actionDetails = props.actionDetails;
    //console.log(actionDetails);
    const [actionId, setActionId] = useState(null);
   // const [action, setAction] = useState("");
  
    const [loading, setLoading] = useState(false);
  
    const complexityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
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
    const [objective, setObjective] = useState("");
    const [preDescription,setPreDescription] =  useState("");
    const [postDescription,setPostDescription] = useState("");
    const [technicalServiceId, setTechnicalServiceId] = useState(null);
    const [complexity, setComplexity] = useState(null);
    const [timer,setTimer] = useState(null);
    
  
    const [mediaType, setMediaType] = useState("");
    const [mediaFile, setMediaFile] = useState(null);
    const [isFileUplaoded, setIsFileUplaoded] = useState(false);
    const [fileSrc, setFileSrc] = useState("");
    const [isFileChanged, setIsFileChanged] = useState(false);

    useEffect(() => {
        // console.log(actionDetails);
    
        if (actionDetails && Object.keys(actionDetails).length !== 0) {
          setActionId(actionDetails.id);
          setObjective(actionDetails.objective);
          setPreDescription(actionDetails.pre_description);
          setPostDescription(actionDetails.post_description);
          setTimer(actionDetails.timer);
          //setAction(actionDetails.action);
          
          setTechnicalServiceId(actionDetails.technical_service_id);
          
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
  
    const onObjectiveChange = event => {
      if (
        event.target.value === "" ||
        event.target.value === "" ||
        event.target.value === undefined
      ) {
        setObjective(null);
      } else {
        setObjective(event.target.value);
      }
    };
    
    const onPreDescriptionChange = event => {
        if (
          event.target.value === "" ||
          event.target.value === "" ||
          event.target.value === undefined
        ) {
            setPreDescription(null);
        } else {
            setPreDescription(event.target.value);
        }
      };
      
      const onPostDescriptionChange = event => {
        if (
          event.target.value === "" ||
          event.target.value === "" ||
          event.target.value === undefined
        ) {
            setPostDescription(null);
        } else {
            setPostDescription(event.target.value);
        }
      };

      
      const onTimerChange = event => {
        if (
          event.target.value === "" ||
          event.target.value === "" ||
          event.target.value === undefined
        ) {
            setTimer(null);
        } else {
            setTimer(event.target.value);
        }
      };
  
    const onMediaTypeChange = event => {
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
      setMediaType("");
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
            objective === null ||
            objective === undefined ||
            objective === "" ||
            objective === " "
          ) {
            message.warning("Please enter objective");
            return;
          }
      
          
      
          if (
            postDescription === null ||
            postDescription === undefined ||
            postDescription === "" ||
            postDescription === " "
          ) {
    
            message.warning("Please select post description");
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
            preDescription === null ||
            preDescription === undefined ||
            preDescription === "" ||
            preDescription === " "
          ) {
            message.warning("Please select pre description");
            return;
          }
    
          if (
            timer === null ||
            timer === undefined ||
            timer === "" ||
            timer === " "
          ) {
            setTimer(undefined);
            message.warning("Please select timer ");
            return;
          }
          if (
            timer === null ||
            timer === undefined ||
            timer === "" ||
            timer === " "
          ) {
            
            message.warning("Please select timer ");
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
            objective: objective,
          complexity: complexity,
          pre_description: preDescription,
          timer: timer,
          post_description: JSON.stringify(postDescription)
          };
        } else {
          if (isFileChanged === true) {
            if (mediaFile === null || mediaFile === undefined) {
              message.warning("Please upload media file or discard media change");
              return;
            } else {
              formValues = {
                objective: objective,
            complexity: complexity,
            pre_description: preDescription,
            post_description: JSON.stringify(postDescription),
            timer: timer,
            media_type: mediaType,
            media_file: mediaFile
              };
            }
          } else {
            formValues = {
                objective: objective,
                complexity: complexity,
                pre_description: preDescription,
                timer: timer,
                post_description: JSON.stringify(postDescription)
            };
          }
        }
    
        try {
          // console.log(formValues);
          setLoading(true);
          await updateWyrScenario(user.Authorization, actionId, formValues);
          setLoading(false);
          message.success("Scenario Updated");
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
          {/* objective starts */}
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <div
              style={{
                width: "140px",
                fontWeight: 600
              }}
            >
              Objective
              <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
            </div>
            <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
              <div>
                <Input
                  type="text"
                  placeholder="Objective"
                  style={
                    objective === null
                      ? {
                          width: "100%",
                          border: "0.5px solid red"
                        }
                      : {
                          width: "100%"
                        }
                  }
                  onChange={onObjectiveChange}
                  value={objective}
                />
              </div>
              {objective === null ? (
                <div style={{ color: "red", marginTop: "5px" }}>* Required</div>
              ) : null}
            </div>
          </div>
          {/* objective ends */}
  
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

          {/* pre description starts */}
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <div
              style={{
                width: "140px",
                fontWeight: 600
              }}
            >
              Pre Description
              <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
            </div>
            <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
              <div>
                <Input
                  type="text"
                  placeholder="Pre Description"
                  style={
                    preDescription === null
                      ? {
                          width: "100%",
                          border: "0.5px solid red"
                        }
                      : {
                          width: "100%"
                        }
                  }
                  onChange={onPreDescriptionChange}
                  value={preDescription}
                />
              </div>
              {preDescription === null ? (
                <div style={{ color: "red", marginTop: "5px" }}>* Required</div>
              ) : null}
            </div>
          </div>

          {/* pre description starts */}

          {/* post description starts */}
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <div
              style={{
                width: "140px",
                fontWeight: 600
              }}
            >
              Post Description
              <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
            </div>
            <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
              <div>
                <Input
                  type="text"
                  placeholder="Post Description"
                  style={
                    postDescription === null
                      ? {
                          width: "100%",
                          border: "0.5px solid red"
                        }
                      : {
                          width: "100%"
                        }
                  }
                  onChange={onPostDescriptionChange}
                  value={JSON.stringify(postDescription) }
                />
              </div>
              {postDescription === null ? (
                <div style={{ color: "red", marginTop: "5px" }}>* Required</div>
              ) : null}
            </div>
          </div>
          {/* post description starts */}
  
          {/* timer starts */}
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <div
              style={{
                width: "140px",
                fontWeight: 600
              }}
            >
              Timer
              <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
            </div>
            <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
              <div>
                <Input
                  type="number"
                  placeholder="Timer"
                  style={
                    timer === undefined
                      ? {
                          width: "100%",
                          border: "0.5px solid red"
                        }
                      : {
                          width: "100%"
                        }
                  }
                  onChange={onTimerChange}
                  value={timer}
                />
              </div>
              {timer === undefined ? (
                <div style={{ color: "red", marginTop: "5px" }}>* Required</div>
              ) : null}
            </div>
          </div>
          {/* timer ends */}
  
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
              <Select
                style={{ width: "100%" }}
                placeholder="Select Media Type"
                onChange={onMediaTypeChange}
                allowClear={true}
                value={mediaType}
              >
                <Select.Option key={""} value={""} disabled>
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
              Update Scenario
            </Button>
          </div>
        </Card>
      </div>
    );
  };
  
  export default Edit;