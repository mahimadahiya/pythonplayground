import React, { useState, useEffect } from "react";
import { Card, Select, Input, Icon, Button, message } from "antd";
import { wyrEpisodeSceneUpdate } from "../../../../../actions";
import { useSelector } from "react-redux";

const MapScenarioModal = props => {
  const sceneDetails = props.sceneDetails;
  const episodeId = props.episodeId;
  const SceneId = sceneDetails.id;
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(false);

  return (
    <Card
      bodyStyle={{ padding: 0, fontSize: "15px" }}
      loading={loading}
      bordered={false}
    ></Card>
  );
};

export default MapScenarioModal;
