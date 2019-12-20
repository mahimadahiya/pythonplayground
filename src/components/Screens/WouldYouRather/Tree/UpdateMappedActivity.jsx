import React, { useState, useEffect } from "react";
import { Card, Select, Button, message, InputNumber } from "antd";
import { wyrTreeActivityUpdate } from "../../../../actions";
import ArticleList from "./ArticlesList";
import SimulationList from "./SimulationList";
import GameList from "./GamesList";
import { useSelector } from "react-redux";

const UpdateMappedActivity = props => {
  const user = useSelector(state => state.userAuth);
  const [mappedEntityArticle, setMappedEntityArticle] = useState([]);
  const [numberOfAttempts, setNumberOfAttempts] = useState(null);

  // console.log(props.selectedMappedActivityDetails.parameter_id);

  useEffect(() => {
    const fetchList = () => {
      let tempList = [];
      for (
        let i = 0;
        i < props.selectedMappedActivityDetails.mapped_entity.length;
        i++
      ) {
        tempList.push(props.selectedMappedActivityDetails.mapped_entity[i].id);
      }
      // console.log(tempList);
      setMappedEntityArticle(tempList);
    };
    fetchList();
  }, []);

  const renderInputOptions = details => {
    switch (details.activity__slug) {
      case "article":
        return (
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <div
              style={{
                width: "140px",
                fontWeight: 600
              }}
            >
              Articles
              <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
            </div>
            <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
              <div>
                <ArticleList
                  mode="multiple"
                  onChange={onArticleChange}
                  selectedMappedActivityDetails={
                    props.selectedMappedActivityDetails
                  }
                  value={mappedEntityArticle}
                  selectedParameterId={
                    props.selectedMappedActivityDetails.parameter_id
                  }
                />
              </div>
            </div>
          </div>
        );
      case "simulation":
        return (
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <div
              style={{
                width: "140px",
                fontWeight: 600
              }}
            >
              Simulation
              <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
            </div>
            <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
              <div>
                <SimulationList
                  mode="multiple"
                  onChange={onSimulationChange}
                  value={mappedEntityArticle}
                  selectedParameterId={
                    props.selectedMappedActivityDetails.parameter_id
                  }
                />
              </div>
            </div>
          </div>
        );
      case "game":
        return (
          <div>
            <div style={{ display: "flex", marginBottom: "25px" }}>
              <div
                style={{
                  width: "140px",
                  fontWeight: 600
                }}
              >
                Game
                <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
              </div>
              <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
                <div>
                  <GameList
                    mode="multiple"
                    onChange={onGameChange}
                    value={mappedEntityArticle}
                    selectedParameterId={
                      props.selectedMappedActivityDetails.parameter_id
                    }
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", marginBottom: "25px" }}>
              <div
                style={{
                  width: "140px",
                  fontWeight: 600
                }}
              >
                No. of Attempts
                <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
              </div>
              <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
                <div>
                  <InputNumber
                    onChange={onGameAttemptsChange}
                    min={1}
                    style={{
                      width: "100%"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const onArticleChange = val => {
    setMappedEntityArticle(val);
  };

  const onSimulationChange = val => {
    setMappedEntityArticle(val);
  };

  const onGameChange = val => {
    setMappedEntityArticle(val);
  };

  const onGameAttemptsChange = e => {
    setNumberOfAttempts(e);
    //console.log(e);
  };

  const onUpdateLi = async () => {
    let formValues = {};
    if (props.selectedMappedActivityDetails.activity__slug === "article") {
      if (mappedEntityArticle.length < 1) {
        message.warning("Please select Atleast one Article");
        return;
      } else {
        formValues = {
          extra_details: {
            article_list: mappedEntityArticle
          }
        };
      }
    }

    if (props.selectedMappedActivityDetails.activity__slug === "simulation") {
      if (mappedEntityArticle.length < 1) {
        message.warning("Please select Atleast one Simulation");
        return;
      } else {
        formValues = {
          extra_details: {
            question_list: mappedEntityArticle
          }
        };
      }
    }

    if (props.selectedMappedActivityDetails.activity__slug === "game") {
      const gameList = mappedEntityArticle.map(item => {
        return { game_id: item, n_attempt: numberOfAttempts };
      });
      if (
        numberOfAttempts === null ||
        numberOfAttempts === undefined ||
        numberOfAttempts === "" ||
        numberOfAttempts === " "
      ) {
        message.warning("Please enter no. of attempts");
        return;
      }
      if (mappedEntityArticle.length < 1) {
        message.warning("Please select game");
        return;
      } else {
        formValues = {
          extra_details: {
            game_list: gameList
            // n_attempt
          }
        };
      }
    }

    // console.log(formValues);

    try {
      await wyrTreeActivityUpdate(
        user.Authorization,
        props.selectedMappedActivityDetails.id,
        formValues
      );
      message.success("Entity Mapped Succesfully");
      props.setMappedActivityUpdateModalShow(false);
      props.setLoadAgain(!props.loadAgain);
      // props.submitCreateNewActivity(props.selectedTechnicalId);
      props.closeMapLIModal();
    } catch (error) {
      props.setMappedActivityUpdateModalShow(false);
    }
  };

  return (
    <div>
      <Card
        bodyStyle={{ padding: 0, fontSize: "15px" }}
        // loading={loading}
        bordered={false}
      >
        {renderInputOptions(props.selectedMappedActivityDetails)}

        <div style={{ margin: "60px 0px 30px 0px", textAlign: "center" }}>
          <Button type="primary" onClick={() => onUpdateLi()}>
            Update LI
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UpdateMappedActivity;
