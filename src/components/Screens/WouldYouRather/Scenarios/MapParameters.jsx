import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Card, Form, message } from "antd";
import MButton from "../../../Elements/MButton";
import Parameters from "../../../Elements/Parameters";
import { wyrScenarioMapParameters, wyrScenarioList } from "../../../../actions";
import "./index";

const ScenarioMapParameters = props => {
  const user = useSelector(state => state.userAuth);

  const scenarioId = props.scenarioId;
  const technical_service_id = props.selectedTechnicalId;

  const [cardLoading, setCardLoading] = useState(false);
  // const [parameters, setParameters] = useState([]);
  const [selectedParameters, setSelectedParameters] = useState([]);

  useEffect(() => {
    const fetchAlreadyMappedList = async () => {
      setCardLoading(true);
      try {
        const response = await wyrScenarioList(
          user.Authorization,
          technical_service_id
        );
        let tempList = [];

        for (let i = 0; i < response.result.wyr_scenario_list.length; i++) {
          if (response.result.wyr_scenario_list[i].id === scenarioId) {
            if (
              response.result.wyr_scenario_list[i].mapped_parameters.length > 0
            ) {
              for (
                let j = 0;
                j <
                response.result.wyr_scenario_list[i].mapped_parameters.length;
                j++
              ) {
                tempList.push(
                  response.result.wyr_scenario_list[i].mapped_parameters[j]
                    .parameter_id
                );
              }
            }
          }
        }
        setSelectedParameters(tempList);
        setCardLoading(false);
      } catch (error) {
        setCardLoading(false);
      }
    };
    fetchAlreadyMappedList();
  }, [user.Authorization, scenarioId, technical_service_id]);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          wyr_scenario_id: scenarioId,
          // parameter_id_list: JSON.stringify(parameters)
          parameter_id_list: JSON.stringify(formValues.parameter)
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

  const onParameterChange = value => {
    // setParameters(value);
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Modal
        title="Map Parameters"
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
            <Form.Item label="Parameters">
              {getFieldDecorator("parameter", {
                rules: [{ required: true }],
                initialValue: selectedParameters
              })(
                <Parameters
                  mode="multiple"
                  onChange={onParameterChange}
                  categories={[null]}
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

export default Form.create()(ScenarioMapParameters);
