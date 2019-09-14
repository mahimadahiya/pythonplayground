import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Card, Row, Col, Input, message, Checkbox } from "antd";
import Gender from "../../Elements/Gender";
import MButton from "../../Elements/MButton";
import ContentComplexityLevel from "../../Elements/ContentComplexityLevel";
import { updateArticle, fetchArticleDetail, setStep } from "../../../actions";
import Complexity from "../../Elements/Complexity";
import Region from "../../Elements/Region";
import State from "../../Elements/State";

const ArticleEdit = props => {
  const dispatch = useDispatch();

  const [complexity, setComplexity] = useState(null);
  const [gender, setGender] = useState(null);
  const [region, setRegion] = useState([]);
  const [state, setState] = useState([]);
  const [details, setDetails] = useState(null);
  const [contentComplexityLevel, setContentComplexityLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [handpicked, setHandpicked] = useState(0);
  const user = useSelector(state => state.userAuth);
  useEffect(() => {
    const fetchDetails = async () => {
      if (props.id) {
        const data = await fetchArticleDetail(props.id, user.Authorization);
        setDetails(data.Articles);
        setGender(data.Articles.gender);
        setComplexity(data.Articles.complexity);
        setHandpicked(data.Articles.handpicked);
        setContentComplexityLevel(data.complexity);
        props.form.setFieldsValue({
          levels: [{key: 1}]
        });
        setLoading(false);
      }
    };
    fetchDetails();
  }, [user, props.id]);

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
          contentcomplexitylevels: JSON.stringify(contentComplexityLevel),
          regions: JSON.stringify(region),
          states: JSON.stringify(state),
          handpicked: handpicked
        };
        await updateArticle(props.id, user.Authorization, values);
        message.success("Article updated successfully");
        dispatch(setStep(2));
      } else {
        console.log(err);
      }
    });
  };
  console.log(contentComplexityLevel);
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
              rules: [{ required: true, message: "Name is required" }],
              initialValue: details ? details.name : null
            })(<Input placeholder="Name" />)}
          </Form.Item>
          <Form.Item label="Objective">
            {getFieldDecorator("objective", {
              rules: [{ required: true }],
              initialValue: details ? details.objective : null
            })(<Input placeholder="Objective" />)}
          </Form.Item>
          <Form.Item label="Takeaway">
            {getFieldDecorator("takeaway", {
              rules: [{ required: true }],

              initialValue: details ? details.takeaway : null
            })(<Input placeholder="Takeaway" />)}
          </Form.Item>
          <Row gutter={48}>
            <Col span={8}>
              <Form.Item label="Gender">
                {getFieldDecorator("gender", {
                  rules: [{ required: true }],

                  initialValue: gender
                })(<Gender onChange={onChangeGender} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Complexity">
                {getFieldDecorator("complexity", {
                  rules: [{ required: true }],

                  initialValue: complexity
                })(<Complexity onChange={onChangeComplexity} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Content Complexity levels">
                {getFieldDecorator("levels", {
                  rules: [{ required: true }]
                  // initialValue: {["1"]}
                })(
                  <ContentComplexityLevel
                    onChange={onChangeContentComplexityLevel}
                    mode="multiple"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Region">
                {getFieldDecorator("region", {
                  rules: [{ required: true }],

                  initialValue: region
                })(<Region onChange={onChangeRegion} mode="multiple" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="State">
                {getFieldDecorator("state", {
                  rules: [{ required: true }],

                  initialValue: state
                })(
                  <State
                    onChange={onChangeState}
                    mode="multiple"
                    regions={region}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            Handpicked
            <span style={{ marginLeft: 5 }}>
              <Checkbox
                title="Handpicked"
                onChange={() => {
                  setHandpicked(1);
                }}
                defaultChecked={handpicked}
              />
            </span>
          </Form.Item>
          <MButton>Submit</MButton>
        </Form>
      </Card>
    </>
  );
};

export default Form.create()(ArticleEdit);
