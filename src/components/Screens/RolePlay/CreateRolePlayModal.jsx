import React from "react";

import {
  Input,
  Modal,
  Button
} from "antd";

import "./index.css"

const CreateRolePlayModal = props => {
    return (
        <div>
             <Modal
               title="Add A New RolePlay"
               visible={props.visible}
               onCancel={props.onCancel}
                footer={false}
            >
              <div><p>Give Role Play A Title</p></div>
              <Input style={{width:"60%"}} placeholder="......." />
              <div style={{textAlign:"center",marginTop:"8%"}}><Button style={{background:"green",color:"white",fontWeight:"bold",padding:"2px 25px"}}>Create</Button></div>
            </Modal>
        </div>
    )
}

export default CreateRolePlayModal;