import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Card, Row, Col, Input, message } from "antd";
import Gender from "../../Elements/Gender";
import MButton from "../../Elements/MButton";
import ContentComplexityLevel from "../../Elements/ContentComplexityLevel";
import { updateArticle, fetchArticleDetail } from "../../../actions";
import Complexity from "../../Elements/Complexity";
import Region from "../../Elements/Region";
import State from "../../Elements/State";

const ArticleEdit = props => {
  const [complexity, setComplexity] = useState(null);
  const [gender, setGender] = useState(null);
  const [region, setRegion] = useState([]);
  const [state, setState] = useState([]);
  const [contentComplexityLevel, setContentComplexityLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.userAuth);

  useEffect(() => {
    const fetchDetails = async () => {
      if (props.id) {
        const data = await fetchArticleDetail(props.id, user.Authorization);
        console.log(data);
        props.form.setFieldsValue({
          name: data.Articles.name,
          takeaway: data.Articles.takeaway,
          objective: data.Articles.objective
        });
        setGender(data.Articles.gender);
        setComplexity(data.Articles.complexity);
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  const onChangeGender = val => {
    setGender(val);
  };

  const onChangeComplexity = val => {
    setComplexity(val);
  };

  const onChangeContentComplexityLevel = val => {
    setContentComplexityLevel(val);
  };

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formProps) => {
      if (!err) {
        const values = {
          ...formProps,
          complexity,
          gender,
          contentComplexityLevels: JSON.stringify(contentComplexityLevel),
          regions: JSON.stringify(region),
          states: JSON.stringify(state)
        };
        const response = await updateArticle(
          props.id,
          user.Authorization,
          values
        );
        console.log(response);
        message.success("Article updated successfully");
        props.setStep(2);
      } else {
        console.log(err);
      }
    });
  };

  const onChangeRegion = val => {
    setRegion(val);
  };

  const onChangeState = val => {
    setState(val);
  };

  const { getFieldDecorator } = props.form;
  return (
    <>
      <Card
        loading={loading}
        title={<div className="card-title">Edit Article</div>}
      >
        <Form onSubmit={onSubmit}>
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Name is required" }]
            })(<Input placeholder="Name" />)}
          </Form.Item>
          <Form.Item label="Objective">
            {getFieldDecorator("objective")(<Input placeholder="Objective" />)}
          </Form.Item>
          <Form.Item label="Takeaway">
            {getFieldDecorator("takeaway")(<Input placeholder="Takeaway" />)}
          </Form.Item>
          <Row gutter={48}>
            <Col span={8}>
              <Gender onChange={onChangeGender} value={gender} />
            </Col>
            <Col span={8}>
              <Complexity onChange={onChangeComplexity} value={complexity} />
            </Col>
            <Col span={8}>
              <ContentComplexityLevel
                onChange={onChangeContentComplexityLevel}
                mode="multiple"
                value={contentComplexityLevel}
              />
            </Col>
            <Col span={8}>
              <Region
                onChange={onChangeRegion}
                mode="multiple"
                value={region}
              />
            </Col>
            <Col span={8}>
              <State
                onChange={onChangeState}
                value={state}
                mode="multiple"
                regions={region}
              />
            </Col>
          </Row>
          <MButton>Submit</MButton>
        </Form>
      </Card>
    </>
  );
};

export default Form.create()(ArticleEdit);
