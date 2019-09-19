import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  message,
  Card,
  Button,
  Modal,
  Select,
  Row,
  Col
} from "antd";
import { useSelector } from "react-redux";
import Industries from "../../../Elements/Industries";
import MButton from "../../../Elements/MButton";
import {
  createOrganization,
  fetchOrganizationDetails
} from "../../../../actions";
import SPOCList from "./SPOC/List";

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

const OrganizationCreate = props => {
  const user = useSelector(state => state.userAuth);
  const [industry, setIndustry] = useState(null);
  const [subType, setSubType] = useState(null);
  const [subTypeList, setSubTypeList] = useState([]);
  const [name, setName] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchOrganizationDetails(
        user.Authorization,
        props.id
      );
      setName(details.result.organization.name);
      setIndustry(details.result.organization.industry_type_id);
    };
    if (props.id) {
      fetchDetails();
    }
  }, [props.id, user]);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          name: formValues.name,
          org_industy_type: industry,
          org_subtype: formValues.subtype
        };
        clean(values);
        const response = await createOrganization(user.Authorization, values);
        if (response.status === 201) {
          message.success("Organization created successfully");
          props.onCloseModal();
        }
      }
    });
  };

  const onChangeIndustry = (val, industry) => {
    setIndustry(val);
    props.form.setFieldsValue({ subtype: null });
    setSubTypeList(industry.props.subtypes);
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Card>
        <Form onSubmit={onSubmit}>
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Name is required" }],
              initialValue: name
            })(<Input placeholder="Enter name of organization" />)}
          </Form.Item>

          <Row gutter={48}>
            <Col span={12}>
              <Form.Item label="Industry Type">
                {getFieldDecorator("industry", {
                  rules: [{ required: true, message: "Industry is required" }],
                  initialValue: industry
                })(<Industries onChange={onChangeIndustry} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Industry Subtype">
                {getFieldDecorator("subtype", {
                  rules: [{ required: true, message: "Industry is required" }],
                  initialValue: subType
                })(
                  <Select>
                    {subTypeList.map(subtype => (
                      <Select.Option key={subtype} value={subtype}>
                        {subtype}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Button onClick={() => setShowModal(true)}>Add SPOC</Button>

          <MButton>{props.id ? "Edit" : "Create"}</MButton>
        </Form>
      </Card>
      <Modal
        title="Create Parameter"
        visible={showModal}
        footer={null}
        destroyOnClose={true}
        onCancel={onCloseModal}
        closable={true}
        width="1000px"
      >
        <SPOCList onCloseModal={onCloseModal} />
      </Modal>
    </div>
  );
};

export default Form.create()(OrganizationCreate);
