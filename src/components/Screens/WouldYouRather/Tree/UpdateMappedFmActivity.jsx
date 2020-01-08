import React, { useState, useEffect } from "react";
import {
  Card,
  Select,
  Button,
  message,
  InputNumber,
  Popconfirm,
  Table
} from "antd";
import {
  getEpisodeActivityListForFm,
  getMappingActivityEntityList,
  wyrTreeActivityUpdate
} from "../../../../actions";
import ArticleList from "./ArticlesList";
import SimulationList from "./SimulationList";
import GameList from "./GamesList";
import { useSelector } from "react-redux";

const UpdateMappedActivity = props => {
  const user = useSelector(state => state.userAuth);
  const courseId = props.selectedMappedActivityDetails.chapter_id;
  const [mappedEntityArticle, setMappedEntityArticle] = useState([]);
  const [numberOfAttempts, setNumberOfAttempts] = useState([]);
  const [normalGameList, setNormalGameList] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [gameName, setGameName] = useState("");
  const [gameTableListLoading, setGameTableListLoading] = useState(false);

  //console.log(props.selectedMappedActivityDetails);

  useEffect(() => {
    const fetchList = async () => {
      setGameTableListLoading(true);
      let tempList = [];
      if (props.selectedMappedActivityDetails.mapped_entity) {
        for (
          let i = 0;
          i < props.selectedMappedActivityDetails.mapped_entity.length;
          i++
        ) {
          if (props.selectedMappedActivityDetails.activity__slug === "game") {
            tempList = [
              ...tempList,
              {
                id: props.selectedMappedActivityDetails.mapped_entity[i].id,
                n_attempt:
                  props.selectedMappedActivityDetails.mapped_entity[i]
                    .n_attempt,
                name: props.selectedMappedActivityDetails.mapped_entity[i].name,
                is_selected: true
              }
            ];
          } else {
            tempList.push(
              props.selectedMappedActivityDetails.mapped_entity[i].id
            );
          }
        }
      }
      setMappedEntityArticle(tempList);
      setGameTableListLoading(false);

      try {
        if (props.selectedTechnicalId === 1) {
          const response = await getMappingActivityEntityList(
            user.Authorization,
            props.selectedMappedActivityDetails.parameter_id
          );

          let apiResponseGameList = response.data.result.game;
          let mappedGameList =
            props.selectedMappedActivityDetails.mapped_entity;

          for (let i = 0; i < apiResponseGameList.length; i++) {
            apiResponseGameList[i]["is_selected"] = false;
            apiResponseGameList[i]["n_attempt"] = null;

            for (let j = 0; j < mappedGameList.length; j++) {
              if (apiResponseGameList[i].id === mappedGameList[j].id) {
                //console.log(apiResponseGameList[i]);
                apiResponseGameList[i]["n_attempt"] =
                  mappedGameList[j]["n_attempt"];
                apiResponseGameList[i]["is_selected"] = !apiResponseGameList[i][
                  "is_selected"
                ];
              }
            }
          }
          setNormalGameList(apiResponseGameList);
        } else {
          const response = await getEpisodeActivityListForFm(
            user.Authorization,
            courseId
          );

          let apiResponseGameList = response.data.result.game;
          let mappedGameList =
            props.selectedMappedActivityDetails.mapped_entity;

          for (let i = 0; i < apiResponseGameList.length; i++) {
            apiResponseGameList[i]["is_selected"] = false;
            apiResponseGameList[i]["n_attempt"] = null;

            for (let j = 0; j < mappedGameList.length; j++) {
              if (apiResponseGameList[i].id === mappedGameList[j].id) {
                //console.log(apiResponseGameList[i]);
                apiResponseGameList[i]["n_attempt"] =
                  mappedGameList[j]["n_attempt"];
                apiResponseGameList[i]["is_selected"] = !apiResponseGameList[i][
                  "is_selected"
                ];
              }
            }
          }
          setNormalGameList(apiResponseGameList);
        }
      } catch (error) {
        setGameTableListLoading(false);
      }
    };
    fetchList();
  }, [user.Authorization]);

  const columnName = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: record => {
        return (
          <div>
            {record === null || record === "" || record === undefined
              ? "-"
              : record}
          </div>
        );
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: record => {
        return (
          <div>
            {record === null || record === "" || record === undefined
              ? "-"
              : record}
          </div>
        );
      }
    },
    {
      title: "Attempts",
      // dataIndex: "n_attempt",
      key: "n_attempt",
      render: record => {
        return (
          <div>
            {record.is_edit ? (
              <span>
                <InputNumber
                  onChange={onGameAttemptsChange}
                  placeholder="Number of Attempts"
                  min={1}
                  step={1}
                  value={record.n_attempt}
                  style={{
                    width: "100%"
                  }}
                />
              </span>
            ) : (
              <span>
                {record.n_attempt === null ||
                record.n_attempt === "" ||
                record.n_attempt === undefined
                  ? "-"
                  : record.n_attempt}
              </span>
            )}
          </div>
        );
      }
    },
    {
      title: "Actions",
      key: "action",
      render: record => (
        <span>
          {record.is_edit === true ? (
            <Button
              type="link"
              style={{ padding: 0, marginRight: "10px" }}
              onClick={() => onGameEditSave(record)}
            >
              Save
            </Button>
          ) : (
            <Button
              type="link"
              style={{ padding: 0, marginRight: "10px" }}
              onClick={() => onGameEdit(record)}
            >
              Edit
            </Button>
          )}
        </span>
      )
    }
  ];

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
                  selectedTechnicalId={props.selectedTechnicalId}
                  courseId={courseId}
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
                  selectedTechnicalId={props.selectedTechnicalId}
                  courseId={courseId}
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
                    mode="default"
                    onChange={onGameChange}
                    // value={mappedEntityArticle.id}
                    selectedParameterId={
                      props.selectedMappedActivityDetails.parameter_id
                    }
                    normalGameList={normalGameList}
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
                    placeholder="Number of Attempts"
                    min={1}
                    style={{
                      width: "100%"
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <div style={{ margin: "60px 0px 30px 0px", textAlign: "center" }}>
                <Button
                  type="primary"
                  onClick={() => onAddGame()}
                  disabled={
                    normalGameList.length === mappedEntityArticle.length
                  }
                >
                  Add
                </Button>
              </div>
            </div>

            <div>
              <Card
                bodyStyle={{ padding: 0, fontSize: "15px" }}
                // loading={mappedActivityLoading}
                bordered={false}
              >
                <Table
                  loading={gameTableListLoading}
                  dataSource={mappedEntityArticle}
                  columns={columnName}
                  rowKey={row => row.id}
                  pagination={false}
                />
              </Card>
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
    //setMappedEntityArticle(val);
    setGameId(val);
    const gameName = normalGameList.find(item => {
      if (item.id === val) {
        return item;
      }
    });
    setGameName(gameName.name);
  };

  const onGameAttemptsChange = e => {
    setNumberOfAttempts(e);
  };

  const onAddGame = () => {
    if (
      gameId === null ||
      gameId === undefined ||
      gameId === "" ||
      gameId === ""
    ) {
      message.warning("Please Select Game");
      return;
    }

    if (
      numberOfAttempts === null ||
      numberOfAttempts === undefined ||
      numberOfAttempts === "" ||
      numberOfAttempts === ""
    ) {
      message.warning("Please Select Game");
      return;
    }

    for (let i = 0; i < mappedEntityArticle.length; i++) {
      if (mappedEntityArticle[i].id === gameId) {
        message.warning("Game is Already Selected");
        return;
      }
    }

    setGameTableListLoading(true);
    let final_game_list = [];
    final_game_list = [...mappedEntityArticle];
    final_game_list = [
      ...final_game_list,
      {
        id: gameId,
        name: gameName,
        n_attempt: numberOfAttempts,
        is_selected: true
      }
    ];
    for (let i = 0; i < normalGameList.length; i++) {
      if (normalGameList[i].id === gameId) {
        normalGameList[i]["is_selected"] = !normalGameList[i]["is_selected"];
      }
    }
    setNormalGameList(normalGameList);
    setMappedEntityArticle(final_game_list);
    setGameTableListLoading(false);
  };

  //game edit

  const onGameEdit = data => {
    let game_id = data.id;
    let game_table_data = [...mappedEntityArticle];
    for (let i = 0; i < game_table_data.length; i++) {
      game_table_data[i] = {
        ...game_table_data[i],
        is_edit: false
      };
      if (game_table_data[i].id === game_id) {
        game_table_data[i].is_edit = true;
      }
    }
    //console.log(game_table_data);
    setMappedEntityArticle(game_table_data);
    // setIsGameEdit(true);
  };
  //console.log(mappedEntityArticle);

  const onGameEditSave = data => {
    let game_id = data.id;
    let game_table_data = [...mappedEntityArticle];
    if (
      numberOfAttempts === null ||
      numberOfAttempts === undefined ||
      numberOfAttempts === "" ||
      numberOfAttempts === ""
    ) {
      message.warning("Please enter number of Attempts");
      return;
    }
    for (let i = 0; i < game_table_data.length; i++) {
      if (game_table_data[i].id === game_id) {
        game_table_data[i] = {
          ...game_table_data[i],
          n_attempt: numberOfAttempts,
          is_edit: false
        };
      }
    }
    //console.log(game_table_data);
    setMappedEntityArticle(game_table_data);
  };

  const onDelete = data => {
    for (let i = 0; i < normalGameList.length; i++) {
      if (normalGameList[i].id === data.id) {
        //console.log(normalGameList[i]);
        normalGameList[i]["n_attempt"] = null;
        normalGameList[i]["is_selected"] = !normalGameList[i]["is_selected"];
      }
    }
    setNormalGameList(normalGameList);
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
        return {
          game_id: item.id,
          n_attempt: item.n_attempt
        };
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

    //console.log(formValues);

    try {
      await wyrTreeActivityUpdate(
        user.Authorization,
        props.selectedMappedActivityDetails.id,
        formValues
      );
      message.success("Entity Mapped Succesfully");
      props.setMappedActivityUpdateModalShow(false);
      //  props.setLoadAgain(!props.loadAgain);
      props.setListLoadAgain(!props.listLoadAgain);
      // props.closeMapLIModal();
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
            Map LI
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UpdateMappedActivity;
