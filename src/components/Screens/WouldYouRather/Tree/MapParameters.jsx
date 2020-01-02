import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Card, Form, message, Spin } from "antd";
import MButton from "../../../Elements/MButton";
import Parameters from "../../../Elements/Parameters";
import Categories from "../../../Elements/Categories";
import {
  wyrTreeMapParameters,
  wyrTreeList,
  deleteMappedParameter
} from "../../../../actions";
import "./index";

const EpisodeParameterMap = props => {
  const user = useSelector(state => state.userAuth);

  const actionId = props.actionId;
  // console.log(props);
  const technical_service_id = props.selectedTechnicalId;
  //console.log(props);
  const [cardLoading, setCardLoading] = useState(false);
  const [parameterListLoading, setParameterListLoading] = useState(false);
  // const [parameters, setParameters] = useState([]);

  const [category, setCategory] = useState([]);
  const [selectedParameters, setSelectedParameters] = useState([]);
  const [alreadyMappedParameters, setAlreadyMappedParameters] = useState([]);

  useEffect(() => {
    const fetchAlreadyMappedList = async () => {
      setCardLoading(true);

      try {
        const response = await wyrTreeList(
          user.Authorization,
          technical_service_id
        );
        // console.log(response.data.result.wyr_episode_list);
        let tempList = [];

        for (let i = 0; i < response.data.result.wyr_episode_list.length; i++) {
          if (response.data.result.wyr_episode_list[i].id === actionId) {
            if (
              response.data.result.wyr_episode_list[i].mapped_parameter.length >
              0
            ) {
              for (
                let j = 0;
                j <
                response.data.result.wyr_episode_list[i].mapped_parameter
                  .length;
                j++
              ) {
                tempList.push(
                  response.data.result.wyr_episode_list[i].mapped_parameter[j]
                    .parameter_id
                );
              }
            }
          }
        }
        //console.log(tempList);
        setSelectedParameters(tempList);

        let map_parameters = [];
        for (let i = 0; i < response.data.result.wyr_episode_list.length; i++) {
          if (response.data.result.wyr_episode_list[i].id === actionId) {
            if (
              response.data.result.wyr_episode_list[i].mapped_parameter.length >
              0
            ) {
              for (
                let j = 0;
                j <
                response.data.result.wyr_episode_list[i].mapped_parameter
                  .length;
                j++
              ) {
                map_parameters.push(
                  response.data.result.wyr_episode_list[i].mapped_parameter[j]
                );
              }
            }
          }
        }
        // console.log(map_parameters);
        setAlreadyMappedParameters(map_parameters);

        setCardLoading(false);
      } catch (error) {
        setCardLoading(false);
      }
    };
    fetchAlreadyMappedList();
  }, [user.Authorization, actionId, technical_service_id]);

  //console.log(selectedParameters);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          wyr_tree_id: actionId,
          // parameter_id_list: JSON.stringify(parameters)
          parameter_list: JSON.stringify(formValues.parameter)
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
          props.setShowMapParametersModal(false);
          setCardLoading(false);
        } catch (error) {
          setCardLoading(false);
        }
      }
    });
  };

  const onCategoryChange = value => {
    setParameterListLoading(true);
    setCategory(value);
    setParameterListLoading(false);
  };

  const onParameterChange = value => {
    // setParameters(value);
  };

  const onDeselectingParameter = async e => {
    // console.log(e);
    const gameName = alreadyMappedParameters.find(item => {
      if (item.parameter_id === e) {
        return item;
      }
    });
    // console.log(gameName.id);
    try {
      await deleteMappedParameter(user.Authorization, gameName.id);
    } catch (error) {}
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Modal
        title="Map Competencies"
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
            <Form.Item label="Categories">
              {getFieldDecorator("categories", {
                rules: [{ required: true }]
              })(<Categories onChange={onCategoryChange} />)}
            </Form.Item>

            <Form.Item label="Competencies">
              {getFieldDecorator("parameter", {
                rules: [{ required: true }],
                initialValue: selectedParameters
              })(
                <Spin spinning={parameterListLoading}>
                  <Parameters
                    mode="multiple"
                    onChange={onParameterChange}
                    onDeselect={e => onDeselectingParameter(e)}
                    categories={category}
                  />
                </Spin>
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
