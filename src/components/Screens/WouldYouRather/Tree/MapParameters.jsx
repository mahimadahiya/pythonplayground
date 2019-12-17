import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Card, Form, message } from "antd";
import MButton from "../../../Elements/MButton";
import Parameters from "../../../Elements/Parameters";
import { wyrTreeMapParameters, wyrTreeList } from "../../../../actions";
import "./index";

const EpisodeParameterMap = props => {
  const user = useSelector(state => state.userAuth);

  const actionId = props.actionId;
  const technical_service_id = props.selectedTechnicalId;
  //console.log(props);
  const [cardLoading, setCardLoading] = useState(false);
  // const [parameters, setParameters] = useState([]);
  const [selectedParameters, setSelectedParameters] = useState([]);

  useEffect(() => {
    const fetchAlreadyMappedList = async () => {
      setCardLoading(true);
      try {
        const response = await wyrTreeList(
          user.Authorization,
          technical_service_id
        );
        let tempList = [];

        for (let i = 0; i < response.result.wyr_episode_list.length; i++) {
          if (response.result.wyr_episode_list[i].id === actionId) {
            if (
              response.result.wyr_episode_list[i].mapped_parameter.length > 0
            ) {
              for (
                let j = 0;
                j < response.result.wyr_episode_list[i].mapped_parameter.length;
                j++
              ) {
                tempList.push(
                  response.result.wyr_episode_list[i].mapped_parameter[j]
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
  }, [user.Authorization, actionId, technical_service_id]);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          wyr_action_id: actionId,
          // parameter_id_list: JSON.stringify(parameters)
          parameter_id_list: JSON.stringify(formValues.parameter)
        };

        setCardLoading(true);
        try {
          const response = await wyrTreeMapParameters(
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

export default Form.create()(EpisodeParameterMap);
