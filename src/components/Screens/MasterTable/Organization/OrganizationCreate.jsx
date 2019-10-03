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
import SPOCCreate from "./SPOC/Create";

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
  const [id, setId] = useState(null);
  const [showInput, setShowInput] = useState(false);

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
        const orgname = {
          name: formValues.name
        }
        const values = {
          fields: JSON.stringify(orgname),
          org_industy_type: industry,
          org_subtype: subType
        };
        clean(values);
        const response = await createOrganization(user.Authorization, values);
        if (response.status === 201) {
          setId(response.data.result.id);
          message.success("Organization created successfully");
          setShowModal(true);
        }
      }
    });
  };

  const onChangeIndustry = (val, industry) => {
    setIndustry(val);
    if (val === 11) {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
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
              {showInput ? (
                <Form.Item label="Industry Type">
                  {getFieldDecorator("subtype", {
                    rules: [
                      { required: true, message: "Industry is required" }
                    ],
                    initialValue: industry
                  })(<Input onChange={e => setSubType(e.target.value)} />)}
                </Form.Item>
              ) : (
                <Form.Item label="Industry Subtype">
                  {getFieldDecorator("subtype", {
                    initialValue: subType
                  })(
                    <Select onChange={val => setSubType(val)}>
                      {subTypeList.map(subtype => (
                        <Select.Option key={subtype} value={subtype}>
                          {subtype}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              )}
            </Col>
          </Row>

          <MButton>{props.id ? "Edit" : "Create"}</MButton>
        </Form>
      </Card>
      <Modal
        title="Create SPOC"
        visible={showModal}
        footer={null}
        destroyOnClose={true}
        onCancel={onCloseModal}
        closable={true}
        width="1000px"
      >
        <SPOCCreate
          id={id}
          onCloseModal={onCloseModal}
          onCloseModalParent={props.onCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Form.create()(OrganizationCreate);
