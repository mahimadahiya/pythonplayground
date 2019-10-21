import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Modal ,Card, Form, message 
} from "antd";
import Modules from "../../Elements/Modules";
import MButton from "../../Elements/MButton";
import Parameters from "../../Elements/Parameters";
import {mapRolePlayParameters,rolePlayArticleParametersList } from "../../../actions";
import "./index.css";



const MapRolePlayParametersModal = props => {
const user = useSelector(state => state.userAuth);
const [parameters,setParameters] = useState([]);
const [selectedParameters, setSelectedParameters] = useState([]);

const onSubmit = e => {
  e.preventDefault();
  props.form.validateFields(async (err, formValues) => {
    if (!err) {
      const values = {
        rp_article_id: formValues.module_id,
        parameter_id: JSON.stringify(parameters)
      };
      const response = await mapRolePlayParameters(user.Authorization, values);
      props.onValuesSubmit();
      if (response.status === 200) {
        message.success("Mapped successfully");
      }
    }
  });
};

const moduleChange = async module_id => {
  const response = await rolePlayArticleParametersList(user.Authorization, module_id)
  let tempList = [];
  for(let i = 0; i <response.length ; i++){
    tempList.push(response[i].parameter_id)
  }    
  setSelectedParameters(tempList)
}

 
const onParameterChange = value => {
  setParameters(value);
};



const { getFieldDecorator } = props.form;
    return (
        <div>
            <Modal
              title="Map Parameters"
              visible={props.visible}
              onCancel={props.onCancel}
              destroyOnClose={true}
              footer={false}
            >
             
             <Form onSubmit={onSubmit}>
        <Form.Item label="Modules">
          {getFieldDecorator("module_id", { rules: [{ required: true }] } )(
            <Modules  onChange={moduleChange}  />
          )}
        </Form.Item>
        <Form.Item label="Parameters">
          
          {getFieldDecorator("parameter", { rules: [{ required: true }],initialValue: selectedParameters})(
            <Parameters
              mode="multiple"
              onChange={onParameterChange}
              categories={[null]}
            />
          )}
        </Form.Item>

        <MButton>Submit</MButton>
      </Form>
            </Modal>
        </div>
    )
};

export default Form.create()(MapRolePlayParametersModal);