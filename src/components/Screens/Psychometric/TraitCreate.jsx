import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Row, Col, Card, message } from "antd";
import TraitTypes from "../../Elements/TraitTypes";
import MButton from "../../Elements/MButton";
import { createTrait } from "../../../actions";

const TraitCreate = props => {
  const user = useSelector(state => state.userAuth);

  const [percentageDetails, setPercentageDetails] = useState({
    40: { description: "" },
    70: { description: "" },
    100: { description: "" }
  });

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          ...formValues,
          percentage_details: JSON.stringify(percentageDetails)
        };
        try {
          await createTrait(user.Authorization, values);
          message.success("Created successfully");
          props.setFilter(true);
          props.onCloseModal();
        } catch (err) {
          message.error("Internal server error");
        }
      }
    });
  };

  const onChangeDesc = (e, percent) => {
    setPercentageDetails({
      ...percentageDetails,
      [percent]: {
        description: e.target.value
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Card title={<div className="card-title">Create Trait</div>}>
        <Form onSubmit={onSubmit}>
          <Form.Item label="Name">
            {getFieldDecorator("name", { rules: [{ required: true }] })(
              <Input placeholder="Enter Name of trait" />
            )}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator("description", { rules: [{ required: true }] })(
              <Input placeholder="Enter Name of description" />
            )}
          </Form.Item>
          <Form.Item label="Type">
            {getFieldDecorator("type", { rules: [{ required: true }] })(
              <TraitTypes />
            )}
          </Form.Item>
          <Form.Item label="Percentage Details">
            {getFieldDecorator("percentage_details")(
              <div>
                <div>
                  <Row gutter={24}>
                    <Col span={2}>40%</Col>
                    <Col span={22}>
                      <Input
                        placeholder="Enter description"
                        onChange={e => onChangeDesc(e, 40)}
                      />
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row gutter={24}>
                    <Col span={2}>70%</Col>
                    <Col span={22}>
                      <Input
                        placeholder="Enter description"
                        onChange={e => onChangeDesc(e, 70)}
                      />
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row gutter={24}>
                    <Col span={2}>100%</Col>
                    <Col span={22}>
                      <Input
                        placeholder="Enter description"
                        onChange={e => onChangeDesc(e, 100)}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            )}
          </Form.Item>
          <MButton>Create</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(TraitCreate);
