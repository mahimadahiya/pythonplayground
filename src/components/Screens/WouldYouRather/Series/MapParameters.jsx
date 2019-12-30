import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Card, Form, message } from "antd";
import MButton from "../../../Elements/MButton";
import Parameters from "../../../Elements/Parameters";
import {
  wyrSeriesMapParameters,
  wyrSeriesList,
  deleteMappedSeriesParameter
} from "../../../../actions";
import "./index";

const SeriesParameterMap = props => {
  const user = useSelector(state => state.userAuth);

  const actionId = props.actionId;
  const technical_service_id = props.selectedTechnicalId;
  const [cardLoading, setCardLoading] = useState(false);
  const [selectedParameters, setSelectedParameters] = useState([]);
  const [alreadyMappedParameters, setAlreadyMappedParameters] = useState([]);

  useEffect(() => {
    const fetchAlreadyMappedList = async () => {
      setCardLoading(true);
      try {
        const response = await wyrSeriesList(
          user.Authorization,
          technical_service_id
        );
        let tempList = [];

        for (let i = 0; i < response.data.result.wyr_series_list.length; i++) {
          if (response.data.result.wyr_series_list[i].id === actionId) {
            if (
              response.data.result.wyr_series_list[i].mapped_parameter.length >
              0
            ) {
              for (
                let j = 0;
                j <
                response.data.result.wyr_series_list[i].mapped_parameter.length;
                j++
              ) {
                tempList.push(
                  response.data.result.wyr_series_list[i].mapped_parameter[j]
                    .parameter_id
                );
              }
            }
          }
        }
        setSelectedParameters(tempList);

        let map_parameters = [];
        for (let i = 0; i < response.data.result.wyr_series_list.length; i++) {
          if (response.data.result.wyr_series_list[i].id === actionId) {
            if (
              response.data.result.wyr_series_list[i].mapped_parameter.length >
              0
            ) {
              for (
                let j = 0;
                j <
                response.data.result.wyr_series_list[i].mapped_parameter.length;
                j++
              ) {
                map_parameters.push(
                  response.data.result.wyr_series_list[i].mapped_parameter[j]
                );
              }
            }
          }
        }
        setAlreadyMappedParameters(map_parameters);

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
          wyr_series_id: actionId,
          // parameter_id_list: JSON.stringify(parameters)
          parameter_list: JSON.stringify(formValues.parameter)
        };

        setCardLoading(true);
        try {
          const response = await wyrSeriesMapParameters(
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

  const onParameterChange = value => {
    // setParameters(value);
  };

  const onDeselectingParameter = async e => {
    const para_list = alreadyMappedParameters.find(item => {
      if (item.parameter_id === e) {
        return item;
      }
    });
    try {
      await deleteMappedSeriesParameter(user.Authorization, para_list.id);
    } catch (error) {}
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
                  onDeselect={e => onDeselectingParameter(e)}
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

export default Form.create()(SeriesParameterMap);
