import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Card, Form, message, Select } from "antd";
import MButton from "../../../Elements/MButton";
import {
  wyrScenarioMapParameters,
  wyrScenarioList,
  wyrActionList
} from "../../../../actions";
import "./index";

const ScenarioMapActions = props => {
  const user = useSelector(state => state.userAuth);

  const scenarioId = props.scenarioId;
  const technical_service_id = props.selectedTechnicalId;

  const [cardLoading, setCardLoading] = useState(false);
  const [selectedActions, setSelectedActions] = useState([]);
  const [actions, setActions] = useState([]);
  const [actionsList, setActionsList] = useState([]);

  useEffect(() => {
    const fetchAlreadyMappedList = async () => {
      setCardLoading(true);
      try {
        const data = await wyrActionList(
          user.Authorization,
          technical_service_id
        );
        setActionsList(data.result.wyr_action_list);

        const response = await wyrScenarioList(
          user.Authorization,
          technical_service_id
        );
        let tempList = [];

        for (let i = 0; i < response.result.wyr_scenario_list.length; i++) {
          if (response.result.wyr_scenario_list[i].id === scenarioId) {
            if (response.result.wyr_scenario_list[i].mapped_action.length > 0) {
              for (
                let j = 0;
                j < response.result.wyr_scenario_list[i].mapped_action.length;
                j++
              ) {
                tempList.push(
                  response.result.wyr_scenario_list[i].mapped_action[j]
                    .wyr_action_id
                );
              }
            }
          }
        }
        console.log(tempList);
        setSelectedActions(tempList);
        setCardLoading(false);
      } catch (error) {
        setCardLoading(false);
      }
    };
    fetchAlreadyMappedList();
  }, [user.Authorization, scenarioId, technical_service_id]);

  const renderActions = () => {
    return actionsList.map((act, i) => {
      return (
        <Select.Option key={i} value={act.id}>
          {act.action}
        </Select.Option>
      );
    });
  };

  const onChangeAction = values => {
    setActions(values);
  };

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          wyr_scenario_id: scenarioId,
          wyr_action_id_list: JSON.stringify(formValues.action)
        };

        setCardLoading(true);
        try {
          const response = await wyrScenarioMapParameters(
            user.Authorization,
            values
          );
          props.onValuesSubmit();
          if (response.status === 200) {
            message.success("Mapped successfully");
          }
          props.setLoadAgain(!props.loadAgain);
          setCardLoading(false);
        } catch (error) {
          setCardLoading(false);
        }
      }
    });
  };

  const filterActions = (val, option) => {
    const filteredList = actions.filter(({ name }) => {
      if (name.toLowerCase().includes(val) || option.key.includes(val)) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].id.toString() === option.key) return true;
    }
    return false;
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Modal
        title="Map Actions"
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
            <Form.Item label="Actions">
              {getFieldDecorator("action", {
                rules: [{ required: true }],
                initialValue: selectedActions
              })(
                <Select
                  placeholder="Select action"
                  mode="multiple"
                  onChange={onChangeAction}
                  filterOption={filterActions}
                >
                  {renderActions()}
                </Select>
              )}
            </Form.Item>

            <MButton>Submit</MButton>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default Form.create()(ScenarioMapActions);
