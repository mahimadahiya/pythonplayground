import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Card, Row, Col, Input, message } from "antd";
import Gender from "../../Elements/Gender";
import MButton from "../../Elements/MButton";
import { updateArticle, fetchArticleDetail } from "../../../actions";
import Complexity from "../../Elements/Complexity";

const ArticleEdit = props => {
  const [complexity, setComplexity] = useState(null);
  const [gender, setGender] = useState(null);
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

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formProps) => {
      if (!err) {
        const values = {
          ...formProps,
          complexity,
          gender
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
          </Row>
          <MButton>Submit</MButton>
        </Form>
      </Card>
    </>
  );
};

export default Form.create()(ArticleEdit);
