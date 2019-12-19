import React, { useState, useEffect } from "react";
import { Card, Select, Button, message } from "antd";
import { wyrTreeActivityUpdate } from "../../../../actions";
import ArticleList from "./ArticlesList";
import SimulationList from "./SimulationList";
import { useSelector } from "react-redux";

const UpdateMappedActivity = props => {
  const user = useSelector(state => state.userAuth);
  const [mappedEntity, setMappedEntity] = useState([]);

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
      setMappedEntity(tempList);
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
                  value={mappedEntity}
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
                <SimulationList />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const onArticleChange = val => {
    setMappedEntity(val);
  };

  const onUpdateLi = async () => {
    let formValues = {};
    if (props.selectedMappedActivityDetails.activity__slug === "article") {
      if (mappedEntity.length < 1) {
        return message.warning("Please select Atleast one Article");
      } else {
        formValues = {
          extra_details: JSON.stringify({
            article_list: mappedEntity
          })
        };
      }
    }
    try {
      await wyrTreeActivityUpdate(
        user.Authorization,
        props.selectedMappedActivityDetails.id,
        formValues
      );
      message.success("Entity Mapped Succesfully");
      props.submitCreateNewActivity(props.selectedTechnicalId);
      props.setMappedActivityUpdateModalShow(false);
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
