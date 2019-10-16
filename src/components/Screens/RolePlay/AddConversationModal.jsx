import React, { useState } from "react";

import { useSelector } from "react-redux";
import {
  Input,
  Modal,
  Button,
  Select
} from "antd";

import "./index.css";
const { Option } = Select;

 const AddConversationModal = props => {


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
             <Select
                 showSearch
                 style={{ width: 200 }}
                 placeholder="Select Type"
                 optionFilterProp="children"
                
             >
                <Option value="Full Overlay">Full Overlay</Option>
                <Option value="Right Overlay">Right Overlay</Option>
                <Option value="Left Overlay">Left Overlay</Option>
                <Option value="Speaking-Left">Speaking-Left</Option>
                <Option value="Speaking-Right">Speaking-Right</Option>
            </Select>
             </div>

            </Modal>

        </div>
        );
};



export default AddConversationModal;