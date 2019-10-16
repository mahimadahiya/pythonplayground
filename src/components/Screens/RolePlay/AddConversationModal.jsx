import React, { useState } from "react";

import { useSelector } from "react-redux";
import {
  Input,
  Modal,
  Button,
  Select,
  message
} from "antd";

import "./index.css";
const { Option } = Select;

 const AddConversationModal = props => {

    const [type,SetType] = useState();
    const [text,SetText] = useState();
    const [timer,SetTimer] = useState();

    const onSelectTypeChange = (value) =>{
        SetType(value);
    }

    const onTextChange = (event) =>{
        SetText(event.target.value);
    }

    const onTimerChange = (event) =>{
        SetTimer(event.target.value);
    }

    const onAddingConversation = async () => {

        if(type === null ||
            type === "" ||
            type === " " ||
            type === undefined
            
            ){
                message.warning("Type is Null");
                return;
            }
    }





    return (
        <div>
            
            <Modal
                title="Add A Conversation"
                visible={props.visible}
                onCancel={props.onCancel}
                destroyOnClose={true}
                footer={false}
            >
             <div>
             <div>
             <Select
                 showSearch
                 style={{ width: 200 }}
                 placeholder="Select Type"
                 optionFilterProp="children"
                 onChange={onSelectTypeChange}
             >
                <Option value="Full Overlay">Full Overlay</Option>
                <Option value="Right Overlay">Right Overlay</Option>
                <Option value="Left Overlay">Left Overlay</Option>
                <Option value="Speaking-Left">Speaking-Left</Option>
                <Option value="Speaking-Right">Speaking-Right</Option>
            </Select>
             </div>

             <div style={{marginTop:"30px"}}>
             <Input
              style={{ maxWidth: "450px", width: "100%" }}
              onChange={onTextChange}
              placeholder="Text"
             />
             </div>

             <div style={{marginTop:"30px"}}>
             <Input
              style={{ maxWidth: "450px", width: "100%" }}
              type="number"
              placeholder="Timer"
              onChange={onTimerChange}
             />
             </div>

             <div style={{marginTop:"30px",textAlign:"center"}}>
             <Button type="primary" onClick={onAddingConversation} >Add </Button>
             </div>
             </div>
            </Modal>

        </div>
        );
};



export default AddConversationModal;