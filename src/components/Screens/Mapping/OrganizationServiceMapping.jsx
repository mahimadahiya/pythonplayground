import React from "react";
import { useSelector } from "react-redux";
import { Card, Form, message } from "antd";
import MButton from "../../Elements/MButton";
import { mapOrganizationService } from "../../../actions";
import Organizations from "../../Elements/Organizations";
import Services from "../../Elements/Services";

const OrganizationServiceMapping = props => {
  const user = useSelector(state => state.userAuth);
  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const servicesList = [];
        servicesList.push(formValues.service_id_list);
        const values = {
          organization_id: formValues.organization_id,
          service_id_list: JSON.stringify(servicesList)
        };
        const response = await mapOrganizationService(
          user.Authorization,
          values
        );
        if (response.status === 200) {
          message.success("Mapped successfully");
        }
      }
    });
  };
  
 const onOrganizationChange = () =>{
   console.log('abc');
 }
 

  const { getFieldDecorator } = props.form;
  return (
    <Card title="Organization Service Mapping">
      <Form onSubmit={onSubmit}>
        <Form.Item label="Organizations">
          {getFieldDecorator("organization_id", {
            rules: [{ required: true }]
          })(<Organizations onChange={onOrganizationChange} />)}
        </Form.Item>
        <Form.Item label="Services">
          {getFieldDecorator("service_id_list", {
            rules: [{ required: true }]
          })(<Services 
              mode="multiple"          
          />)}
        </Form.Item>
        <MButton>Submit</MButton>
      </Form>
    </Card>
  );
};

export default Form.create()(OrganizationServiceMapping);
