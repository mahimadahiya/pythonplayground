import React, { useState, useEffect } from "react";
import { Form, Input, message, Card, Button, Modal } from "antd";
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
  const [region, setRegion] = useState(null);
  const [course, setCourse] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [name, setName] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchOrganizationDetails(
        user.Authorization,
        props.id
      );
      setName(details.result.organization.name);
      setRegion(details.result.organization.region_id);
      setCourse(details.result.organization.course_id);
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
          course_id: course,
          industry_type_id: industry,
          region_id: region,
          module_id: formValues.module_id
        };
        clean(values);
        const response = await createOrganization(user.Authorization, {
          fields: JSON.stringify(values),
          service_id: formValues.service_id
        });
        if (response.status === 201) {
          message.success("Organization created successfully");
          props.onCloseModal();
        }
      }
    });
  };

  const onChangeIndustry = val => {
    setIndustry(val);
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
          
          <Form.Item label="Industry">
            {getFieldDecorator("industry", {
              rules: [{ required: true, message: "Industry is required" }],
              initialValue: industry
            })(<Industries onChange={onChangeIndustry} />)}
          </Form.Item>

         

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
