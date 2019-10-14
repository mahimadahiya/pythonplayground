import React, { useState } from "react";
import {addRolePlay} from "../../../actions";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Modal,
  Button,
  Divider,
  Upload,
  message,
  Icon,
  Row,
  Col
} from "antd";

import "./index.css"

const CreateRolePlayModal = props => {
    const [Name,setName] = useState();
    const user = useSelector(state => state.userAuth);
    const onNameChange=(event) =>{
        console.log(event.target.value)
    }

    const onAddRolePlay = async() =>{
        let formValues = {
            name: "axc"
        }
        const response = await addRolePlay(user.Authorization, formValues);
        console.log("called");

    }

    return (
        <div>
             <Modal
               title="Add A New RolePlay"
               visible={props.visible}
               onCancel={props.onCancel}
                footer={false}
            >
              <div><p>Give Role Play A Title</p></div>
              <Input style={{width:"60%"}} onChange={onNameChange} placeholder="......." />
              <Divider type="horizontal" />
              <div  style={{textAlign:"center",marginBottom:"10%"}}><h4>Add Avatar and Background</h4></div>

              <Row style={{marginBottom:"6%"}}>
               <Col lg={8}><Input placeholder="Avatar 1 name" /></Col>
               <Col lg={8}><Upload >
                  <Button type="danger">
                     <Icon type="upload" /> Add Avatar 1 Image
                  </Button>
                </Upload>  </Col>
              </Row>

              <Row style={{marginBottom:"6%"}}>
               <Col lg={8}><Input placeholder="Avatar 2 name" /></Col>
               <Col lg={8}><Upload >
                  <Button type="danger">
                     <Icon type="upload" /> Add Avatar 2 Image
                  </Button>
                </Upload>  </Col>
              </Row>

              <Row>
              <Col lg={8}><Upload >
                  <Button type="danger">
                     <Icon type="upload" /> Add Background Image
                  </Button>
                </Upload>  </Col>
              </Row>
              <div style={{textAlign:"center",marginTop:"8%"}}><Button onClick={() => onAddRolePlay()} style={{background:"deepskyblue",color:"white",fontWeight:"bold",padding:"2px 25px"}}>Create</Button></div>
            </Modal>
        </div>
    )
}

export default CreateRolePlayModal;