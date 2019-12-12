import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  message,
  Form,
  Select,
  Row,
  Col,
  Icon,
  Radio,
  InputNumber,
  DatePicker
} from "antd";
import { useSelector } from "react-redux";
import { updateOrganizationAssesment } from "../../../actions";
import Categories from "../../Elements/Categories";
import MButton from "../../Elements/MButton";
import moment from "moment";
const { Option } = Select;

const EditOrgAssesment = props => {
  const user = useSelector(state => state.userAuth);
  const [guideLinesCount, setGuideLinesCount] = useState(1);
  const [popupCount, setPopupCount] = useState(1);
  const [guideLineData, setGuideLineData] = useState([{ id: 1, title: "" }]);
  const [popupData, setPopupData] = useState([{ id: 1, title: "" }]);
  const [showPopup, setShowPopup] = useState();

  const selectedData = props.selectedOrgDetails;
  const selectedGuidelineData = selectedData.guidelines.guidelines;
  const selectedPopupData = selectedData.popup_text.points;
  const selectedId = selectedData.id;
  const organizationId = selectedData.organization;
  //console.log(selectedId);

  useEffect(() => {
    const dataCall = () => {
      setPopupData(selectedPopupData);
      setGuideLinesCount(selectedGuidelineData.length);
      setPopupCount(selectedPopupData.length);

      let recivedGuidelineData = [];
      for (let i = 0; i < selectedGuidelineData.length; i++) {
        recivedGuidelineData = [
          ...recivedGuidelineData,
          { id: i + 1, title: selectedGuidelineData[i] }
        ];
      }
      setGuideLineData(recivedGuidelineData);
      let recivedPopupData = [];
      for (let i = 0; i < selectedPopupData.length; i++) {
        recivedPopupData = [
          ...recivedPopupData,
          { id: i + 1, title: selectedPopupData[i] }
        ];
      }
      setPopupData(recivedPopupData);
    };
    dataCall();
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        let finalGuidelineData = guideLineData.map(item => item.title);

        let finalPopupData = popupData.map(item => item.title);
        // console.log(finalPopupData);

        const values = {
          name: formValues.name,
          slug: formValues.slug,
          organization_id: organizationId,
          category_id: formValues.categories,
          validity: formValues.validity,
          duration: formValues.duration,
          next_assessment_lockout_period:
            formValues.next_assessment_lockout_period,
          attempts: formValues.attempts,
          attempt_lockout_period: formValues.attempt_lockout_period,
          passing_percentage: formValues.passing_percentage,
          is_sequential: formValues.is_sequential,
          sequence: formValues.sequence,
          going_live_at: formValues.going_live_at,
          is_resumable: formValues.is_resumable,
          sections: formValues.sections,
          show_certificate: formValues.show_certificate,
          show_popup: formValues.show_popup,
          guidelines: JSON.stringify({
            guidelines: finalGuidelineData
          }),
          popup_text: JSON.stringify({
            points: finalPopupData
          }),
          organization_assessment_group_id: props.organizationGroupId
        };
        //console.log(values);

        const response = await updateOrganizationAssesment(
          selectedId,
          user.Authorization,
          values
        );
        if (response.status === 200) {
          message.success("Organization Assesment updated successfully");
          props.setEditModalShow(false);
          props.setLoadAgain(!props.loadAgain);
        }
      }
    });
  };

  // console.log(popupData);

  const onAddGuidelinesContent = () => {
    setGuideLinesCount(guideLinesCount + 1);
    setGuideLineData([
      ...guideLineData,
      {
        id: guideLinesCount + 1,
        title: ""
      }
    ]);
  };
  const onAddPopupContent = () => {
    setPopupCount(popupCount + 1);
    setPopupData([
      ...popupData,
      {
        id: popupCount + 1,
        title: ""
      }
    ]);
  };

  const onGuideFieldDelete = id => {
    let guideLine_data = guideLineData;
    guideLine_data = guideLine_data.filter((choice, i) => {
      return choice.id !== id;
    });
    setGuideLineData(guideLine_data);
    setGuideLinesCount(guideLinesCount - 1);
  };

  const onPopupFieldDelete = id => {
    let popup_data = popupData;
    popup_data = popup_data.filter((choice, i) => {
      return choice.id !== id;
    });
    setPopupData(popup_data);
    setPopupCount(popupCount - 1);
  };

  const onInputGuidelinesChange = (e, i) => {
    let guidelines_data = [...guideLineData];
    guidelines_data[i] = {
      ...guidelines_data[i],
      title: e.target.value
    };
    //console.log(guideliines_data);
    setGuideLineData(guidelines_data);
  };

  const onInputPopupChange = (e, i) => {
    let popup_data = [...popupData];
    popup_data[i] = {
      ...popup_data[i],
      title: e.target.value
    };
    //console.log(popup_data);
    setPopupData(popup_data);
  };

  const onShowPopupChange = e => {
    setShowPopup(e.target.value);
  };

  const renderGuideLinesFields = () => {
    return guideLineData.map((col, i) => (
      <div key={i} style={{}}>
        <Row gutter={24}>
          <Col span={20}>
            <Form.Item label="Title">
              <Input
                placeholder="Enter title"
                onChange={e => onInputGuidelinesChange(e, i)}
                value={col.title}
              />
            </Form.Item>
          </Col>
          <Col span={4} style={{ paddingLeft: 15, paddingTop: 43 }}>
            <Icon
              type="minus-circle"
              onClick={() => onGuideFieldDelete(col.id)}
              theme="twoTone"
              twoToneColor="red"
              style={{ fontSize: 30 }}
            />
          </Col>
        </Row>
      </div>
    ));
  };

  const renderPopupFields = () => {
    return popupData.map((col, i) => (
      <div key={i} style={{}}>
        <Row gutter={24}>
          <Col span={20}>
            <Form.Item label="Title">
              <Input
                placeholder="Enter title"
                onChange={e => onInputPopupChange(e, i)}
                value={col.title}
              />
            </Form.Item>
          </Col>
          <Col span={4} style={{ paddingLeft: 15, paddingTop: 43 }}>
            <Icon
              type="minus-circle"
              onClick={() => onPopupFieldDelete(col.id)}
              theme="twoTone"
              twoToneColor="red"
              style={{ fontSize: 30 }}
            />
          </Col>
        </Row>
      </div>
    ));
  };

  const { getFieldDecorator } = props.form;

  return (
    <div>
      <Card>
        <Form onSubmit={onSubmit}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Name">
                {getFieldDecorator("name", {
                  rules: [{ required: true }],
                  initialValue: selectedData.name
                })(
                  <Input
                    type="text"
                    placeholder="Name"
                    style={{
                      width: "100%"
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Slug">
                {getFieldDecorator("slug", {
                  rules: [{ required: true }],
                  initialValue: selectedData.slug
                })(
                  <Input
                    type="text"
                    placeholder="Slug"
                    style={{
                      width: "100%"
                    }}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Categories">
                {getFieldDecorator("categories", {
                  rules: [{ required: true }],
                  initialValue: selectedData.category
                })(<Categories />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Validity (days)">
                {getFieldDecorator("validity", {
                  rules: [{ required: true }],
                  initialValue: selectedData.validity
                })(
                  <InputNumber
                    min={1}
                    style={{
                      width: "100%"
                    }}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Duration (seconds)">
                {getFieldDecorator("duration", {
                  rules: [{ required: true }],
                  initialValue: selectedData.duration
                })(
                  <InputNumber
                    min={1}
                    style={{
                      width: "100%"
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Lockout Period (hours)">
                {getFieldDecorator("next_assessment_lockout_period", {
                  rules: [{ required: true }],
                  initialValue: selectedData.next_assessment_lockout_period
                })(
                  <InputNumber
                    min={1}
                    style={{
                      width: "100%"
                    }}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Attempts">
                {getFieldDecorator("attempts", {
                  rules: [{ required: true }],
                  initialValue: selectedData.attempts
                })(
                  <InputNumber
                    min={1}
                    style={{
                      width: "100%"
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Attempts Lockout Period (hours)">
                {getFieldDecorator("attempt_lockout_period", {
                  rules: [{ required: true }],
                  initialValue: selectedData.attempt_lockout_period
                })(
                  <InputNumber
                    min={1}
                    style={{
                      width: "100%"
                    }}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Passing Percentage">
                {getFieldDecorator("passing_percentage", {
                  rules: [{ required: true }],
                  initialValue: selectedData.passing_percentage
                })(
                  <InputNumber
                    min={1}
                    style={{
                      width: "100%"
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Sequential">
                {getFieldDecorator("is_sequential", {
                  rules: [{ required: true }],
                  initialValue: selectedData.is_sequential
                })(
                  <Select disabled placeholder="Select Sequential">
                    <Option value={1}>true</Option>
                    <Option value={0}>flase</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Sequence">
                {getFieldDecorator("sequence", {
                  rules: [
                    {
                      required: selectedData.is_sequential === 1 ? true : false
                    }
                  ],
                  initialValue: selectedData.sequence
                    ? selectedData.sequence
                    : null
                })(
                  <InputNumber
                    disabled={selectedData.is_sequential === 1 ? false : true}
                    min={1}
                    style={{
                      width: "100%"
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Going Live At">
                {getFieldDecorator("going_live_at", {
                  rules: [{ required: true }],
                  initialValue: moment(selectedData.going_live_at)
                })(
                  <DatePicker
                    format="YYYY-MM-DDTHH:mm:ss"
                    showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                    // onChange={onTimeDateChange}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Resumable">
                {getFieldDecorator("is_resumable", {
                  rules: [{ required: true }],
                  initialValue: selectedData.is_resumable
                })(
                  <Select placeholder="Select Resumable">
                    <Option value={1}>true</Option>
                    <Option value={0}>flase</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Sections">
                {getFieldDecorator("sections", {
                  rules: [{ required: true }],
                  initialValue: selectedData.sections
                })(
                  <InputNumber
                    min={1}
                    style={{
                      width: "100%"
                    }}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Show Certificate">
                {getFieldDecorator("show_certificate", {
                  rules: [{ required: true }],
                  initialValue: selectedData.show_certificate
                })(
                  <Select placeholder="Select Show Certificate">
                    <Option value={1}>true</Option>
                    <Option value={0}>flase</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Is Duration">
                {getFieldDecorator("is_duration", {
                  rules: [{ required: true }],
                  initialValue: selectedData.is_duration
                })(
                  <Radio.Group>
                    <Radio value={1}>True</Radio>
                    <Radio value={0}>False</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Show Popup">
                {getFieldDecorator("show_popup", {
                  rules: [{ required: true }],
                  initialValue: selectedData.show_popup
                })(
                  <Radio.Group onChange={onShowPopupChange}>
                    <Radio value={1}>True</Radio>
                    <Radio value={0}>False</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          {selectedData.show_popup === 1 ? (
            <div>
              <Row>
                <Form.Item label="Pop Up">{renderPopupFields()}</Form.Item>
              </Row>
              <Row>
                <div
                  onClick={onAddPopupContent}
                  style={{ marginBottom: 40, textAlign: "center" }}
                >
                  <Icon
                    type="plus-circle"
                    theme="twoTone"
                    style={{ marginLeft: 15, fontSize: 30 }}
                  />
                </div>
              </Row>
            </div>
          ) : null}
          <Row>
            <Form.Item label="Guidelines">{renderGuideLinesFields()}</Form.Item>
          </Row>
          <Row>
            <div
              onClick={onAddGuidelinesContent}
              style={{ marginBottom: 40, textAlign: "center" }}
            >
              <Icon
                type="plus-circle"
                theme="twoTone"
                style={{ marginLeft: 15, fontSize: 30 }}
              />
            </div>
          </Row>

          <MButton>Submit</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(EditOrgAssesment);
