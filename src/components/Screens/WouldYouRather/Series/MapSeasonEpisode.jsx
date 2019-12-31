import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Card, Form, message } from "antd";
import MButton from "../../../Elements/MButton";
import {
  wyrSeasonsEpisodeList,
  wyrMapSeasonEpisode
} from "../../../../actions";
import EpisodeList from "./EpisodeList";
import "./index";

const MapSeasonEpisode = props => {
  const selectedSeasonId = props.selectedSeasonId;
  const selectedTechnicalId = props.selectedTechnicalId;
  const user = useSelector(state => state.userAuth);

  const [cardLoading, setCardLoading] = useState(false);
  const [selectedEpisodes, setSelectedEpisodes] = useState([]);

  useEffect(() => {
    const fetchAlreadyMappedList = async () => {
      setCardLoading(true);
      try {
        const response = await wyrSeasonsEpisodeList(
          user.Authorization,
          selectedSeasonId
        );
        // console.log(response.data.result.wyr_episode_list);
        let tempList = [];

        for (let i = 0; i < response.data.result.wyr_episode_list.length; i++) {
          if (response.data.result.wyr_episode_list.length > 0) {
            tempList.push(response.data.result.wyr_episode_list[i].id);
          }
        }
        // console.log(tempList);
        setSelectedEpisodes(tempList);
        setCardLoading(false);
      } catch (error) {
        setCardLoading(false);
      }
    };
    fetchAlreadyMappedList();
  }, [user.Authorization]);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          wyr_season_id: selectedSeasonId,
          wyr_episode_list: JSON.stringify(formValues.episodes)
        };

        setCardLoading(true);
        try {
          const response = await wyrMapSeasonEpisode(
            user.Authorization,
            values
          );
          props.onValuesSubmit();
          if (response.status === 200) {
            message.success("Mapped successfully");
          }
          props.setLoadAgain(!props.loadAgain);
          props.setMapEpisodesModalShow(false);
          setCardLoading(false);
        } catch (error) {
          setCardLoading(false);
        }
      }
    });
  };

  const onEpisodeChange = value => {
    // setParameters(value);
  };

  const onDeselectingEpisode = async e => {
    /* 
    const para_list = alreadyMappedParameters.find(item => {
      if (item.parameter_id === e) {
        return item;
      }
    });
    try {
      await deleteMappedSeriesParameter(user.Authorization, para_list.id);
    } catch (error) {}
    */
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Modal
        title="Map Episode"
        visible={props.visible}
        onCancel={props.onCancel}
        destroyOnClose={true}
        footer={false}
      >
        <Card
          bodyStyle={{ padding: "0px" }}
          bordered={false}
          loading={cardLoading}
        >
          <Form onSubmit={onSubmit}>
            <Form.Item label="Episodes">
              {getFieldDecorator("episodes", {
                rules: [{ required: true }],
                initialValue: selectedEpisodes
              })(
                <EpisodeList
                  mode="multiple"
                  onChange={onEpisodeChange}
                  onDeselect={e => onDeselectingEpisode(e)}
                  categories={[null]}
                  selectedTechnicalId={selectedTechnicalId}
                />
              )}
            </Form.Item>

            <MButton>Submit</MButton>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default Form.create()(MapSeasonEpisode);
