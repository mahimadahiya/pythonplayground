import React, { useState } from "react";
import { addConversation } from "../../../actions";
import { useSelector } from "react-redux";
import {
  Input,
  Modal,
  Button,
  Select,
  message,
  Card
} from "antd";

import "./index.css";
const { Option } = Select;

 const AddConversationModal = props => {
    const user = useSelector(state => state.userAuth);
    const rolePlayId = props.rolePlayId;
    const [loader, setLoader] = useState(false);
    const [type,SetType] = useState();
    const [text,SetText] = useState();
    const [timer,SetTimer] = useState(25);
    const [title,setTitle] = useState();

    const onSelectTypeChange = (value) =>{
        SetType(value);
    }

    const onTextChange = (event) =>{
        SetText(event.target.value);
    }

    const onTimerChange = (event) =>{
      
        SetTimer(event.target.value);
        
    }

    const onTitleChange = (event) =>{
        setTitle(event.target.value);
    }

    const onAddingConversation = async () => {

        if(
            type === null ||
            type === ""   ||
            type === " "  ||
            type === undefined
            ){
                message.warning("Please Select Type");
                return;
            }
        
        if(
            text === null ||
            text === ""   ||
            text === " "  ||
            text === undefined
            ){
                message.warning("Please Fill Text");
                return; 
            }
         if(    
             timer === null ||
             timer === ""  ||
             timer === " " ||
             timer === undefined ||
             timer < 25
            ){
                message.warning("Please Add Timer");
                return; 
            }
        
        
        let formValues = {
            text: text,
            conversation_type: type,
            timer: timer,
            rp_article_id: rolePlayId,
            title: title
        };
        setLoader(true);
        try{
            await addConversation(user.Authorization, formValues);
            message.success("Conversation Added");
            props.onSubmitValues();
            setLoader(false);
            props.setLoadAgain(!props.loadAgain);
        }catch (error){
            setLoader(false);
        }
    };


    return (
        <div>
            <Modal
                title="Add A Conversation"
                visible={props.visible}
                onCancel={props.onCancel}
                destroyOnClose={true}
                footer={false}
            >
                <Card loading={loader}>
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
              min="25"
              step="10"
              placeholder="Timer Minimum time 25 sec"
              onChange={onTimerChange}
             />
             </div>

             <div style={{marginTop:"30px"}}>
             <Input
              style={{ maxWidth: "450px", width: "100%" }}
              placeholder="Title"
              onChange={onTitleChange}
             />
             </div>

             <div style={{marginTop:"30px",textAlign:"center"}}>
             <Button type="primary" onClick={onAddingConversation} >Add </Button>
             </div>
             </div>
             </Card>
            </Modal>

        </div>
        );
};

export default AddConversationModal;