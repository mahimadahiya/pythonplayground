import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Form, message } from "antd";
import MButton from "../../Elements/MButton";
import { mapOrganizationService,getAlreadyMappedServices } from "../../../actions";
import Organizations from "../../Elements/Organizations";
import Services from "../../Elements/Services";

const OrganizationServiceMapping = props => {
  const [selectedServices,setSelectedServices] = useState([]);
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
  
  const onServiceChange = value => {
    setSelectedServices(value);
  };

 const onOrganizationChange = async organization_id => {
  const response = await getAlreadyMappedServices(user.Authorization, organization_id)
  // console.log(response.data.result[0].service_id);
  let tempList = [];
  if( response.data.result.length>0){
    for(let i = 0; i <response.data.result.length ; i++){
      tempList.push(response.data.result[i].service_id)
    }    
    setSelectedServices(tempList)
  }
 
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
            rules: [{ required: true }], initialValue: selectedServices
          })(<Services 
              mode="multiple"   
              onChange={onServiceChange}       
          />)}
        </Form.Item>
        <MButton>Submit</MButton>
      </Form>
    </Card>
  );
};

export default Form.create()(OrganizationServiceMapping);
