import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Card, Form, message } from "antd";
import Modules from "../../Elements/Modules";
import MButton from "../../Elements/MButton";
import Parameters from "../../Elements/Parameters";
import {
  mapRolePlayParameters,
  rolePlayArticleParametersList
} from "../../../actions";
import "./index.css";

const MapRolePlayParametersModal = props => {
  const user = useSelector(state => state.userAuth);

  const rp_article_id = props.rpArticleId;

  const [cardLoading, setCardLoading] = useState(false);
  const [parameters, setParameters] = useState([]);
  const [selectedParameters, setSelectedParameters] = useState([]);

  useEffect(() => {
    const fetchAlreadyMappedList = async () => {
      setCardLoading(true);
      try {
        const response = await rolePlayArticleParametersList(
          user.Authorization,
          rp_article_id
        );
        let tempList = [];
        for (let i = 0; i < response.length; i++) {
          tempList.push(response[i].parameter_id);
        }
        setSelectedParameters(tempList);
        setCardLoading(false);
      } catch (error) {
        setCardLoading(false);
      }
    };
    fetchAlreadyMappedList();
  }, [user.Authorization, rp_article_id]);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          rp_article_id: rp_article_id,
          parameter_id_list: JSON.stringify(parameters)
        };

        setCardLoading(true);
        try {
          const response = await mapRolePlayParameters(
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
    setParameters(value);
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
            {/* <Form.Item label="Modules">
          {getFieldDecorator("module_id", { rules: [{ required: true }] } )(
            <Modules  onChange={moduleChange}  />
            )}
        </Form.Item> */}
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

export default Form.create()(MapRolePlayParametersModal);
