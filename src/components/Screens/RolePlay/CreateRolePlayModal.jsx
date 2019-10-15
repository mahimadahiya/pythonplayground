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
    const [avatarName1,setAvatarName1] = useState();
    const [avatarName2,setAvatarName2] = useState();
    
    const [backgroundImage,setBackgroundImage] = useState();
    
    
    const [avatarImage1,setAvatarImage1] = useState(null);
    const [avatarOneSource,setAvatarOneSource] = useState();
    const [isAvatarOneUploaded, SetIsAvatarOneUploaded] = useState(false)

    const [avatarImage2,setAvatarImage2] = useState(null);
    const [avatarTwoSource,setAvatarTwoSource] = useState();
    const [isAvatarTwoUploaded,setIsAvatarTwoUploaded] = useState(false);

    const user = useSelector(state => state.userAuth);
    const onNameChange=(event) =>{
        setName(event.target.value);
    };

    const onAvatar1NameChange=(event) =>{
      setAvatarName1(event.target.value);
    };

    const onAvatar2NameChange=(event) =>{
      setAvatarName2(event.target.value);
    };


   const onAvatar1ImageChange=(event) =>{
      console.log(event.target.files[0]);


        let fileType = event.target.files[0].type
        var reader = new FileReader();
        var url = reader.readAsDataURL(event.target.files[0])
        
        reader.onloadend =  (e) => {
          SetIsAvatarOneUploaded(true)
          setAvatarOneSource(reader.result);
        }
          
        console.log(fileType)
        if(fileType === "image/jpg" || fileType === "image/jpeg" || fileType === "image/png") {
          setAvatarImage1(event.target.files[0]);
        }else{
          message.warning("Please upload image files");
          return;
        }
      
    };

    const onAvatar2ImageChange=(event) =>{
      console.log(event.target.files[0]);

      let fileType = event.target.files[0].type
      
        var reader = new FileReader();
        var url = reader.readAsDataURL(event.target.files[0])
        
        reader.onloadend =  (e) => {
          setIsAvatarTwoUploaded(true)
          setAvatarTwoSource(reader.result);
        }
        
      console.log(fileType)
      if(fileType === "image/jpg" || fileType === "image/jpeg" || fileType === "image/png") {
        setAvatarImage2(event.target.files[0]);
      }else{
        message.warning("Please upload image files");
        return;
      }
    };

    const onBackgroundImageChange=(event) =>{
      console.log(event.target.files[0]);

      let fileType = event.target.files[0].type
      
        
      console.log(fileType)
      if(fileType === "image/jpg" || fileType === "image/jpeg" || fileType === "image/png") {
        setBackgroundImage(event.target.files[0]);
      }else{
        message.warning("Please upload image files");
        return;
      }
    };



    const onAddRolePlay = async() =>{
      console.log(Name)
      console.log(avatarImage1)
      console.log(avatarImage2)
      console.log(avatarName1)
      console.log(avatarName2)
        if (Name === null || Name ==="" ||Name === " " || Name === undefined  ){
             message.warning("please fill name ");
             return;
        }
        if( avatarName1 === null || avatarName1 === "" || avatarName1 === " " || avatarName1 === undefined){
          message.warning("please fill avatar 1 name ");
          return;
        }
        if(  avatarImage1 === null || avatarImage1 === "" || avatarImage1 === " " || avatarImage1 === undefined){
          message.warning("please upload avatar 1 image ");
          return;
        }
        if(avatarName2 === null || avatarName2 === "" || avatarName2 === " " || avatarName2 === undefined){
          message.warning("please fill avatar 2 name ");
          return;
        }
        if(   avatarImage2 === null || avatarImage2 === "" || avatarImage2 === " " || avatarImage2 === undefined){
          message.warning("please upload avatar 2 image ");
          return;
        }
        if(   backgroundImage === null || backgroundImage === "" || backgroundImage === " " || backgroundImage === undefined){
          message.warning("please upload background image ");
          return;
        }
        let formValues = {
            name: Name,
            leftAvatarName: avatarName1,
            rightAvatarName : avatarName2,
            leftAvatarImage : avatarImage1,
            rightAvatarImage : avatarImage2,
            backImage : backgroundImage
        }
        const response = await addRolePlay(user.Authorization, formValues);
        

    };

    return (
        <div>
             <Modal
               title="Add A New RolePlay"
               visible={props.visible}
               onCancel={props.onCancel}
                footer={false}
            >
              <div><p>Give Role Play A Title</p></div>
              <Input style={{width:"60%"}} onChange={onNameChange} placeholder="Title" />
              <Divider type="horizontal" />
              <div  style={{textAlign:"center",marginBottom:"10%"}}><h4>Add Avatar and Background</h4></div>

            <div style={{border: "1px solid #c2c2c2", borderRadius: "5px", marginBottom: "30px"}}>

              <Row style={{margin: "30px 20px"}}>
               <Col sm={6} md={6} lg={8}><Input placeholder="Avatar 1 name" onChange={onAvatar1NameChange} /></Col>
               <Col sm={12} md={12} lg={12} style={{paddingTop: "5px"}}>

                {
                  isAvatarOneUploaded === false ? 
                  <label style={{marginLeft: "30px"}}>
                    <span style={{background:"deepskyblue",padding:"5px 12px",color:"white",borderRadius:"4px"}}>
                     <input type="file" style={{display:"none"}} accept=" image/jpeg, image/png" onChange={onAvatar1ImageChange}/>
                     <Icon type="upload" />
                       <b> Add Avatar 1 Image</b>
                    </span>
                  </label> : <img src={avatarOneSource} style={{width: "120px", marginLeft: "30px"}} />
                }   
               
               </Col>
              </Row>
                  </div>
              
             <div style={{border: "1px solid #c2c2c2", borderRadius: "5px", marginBottom: "30px"}}>
              <Row style={{margin: "30px 20px"}}>
               <Col sm={6} md={6} lg={8}><Input placeholder="Avatar 2 name"  onChange={onAvatar2NameChange} /></Col>
               <Col sm={12} md={12} lg={12} style={{paddingTop: "5px"}}>
                 {
                   isAvatarTwoUploaded === false ?
               <label style={{marginLeft: "30px"}}>
                    <span style={{background:"deepskyblue",padding:"5px 12px",color:"white",borderRadius:"4px"}}>
                     <input type="file" style={{display:"none"}} accept=" image/jpeg, image/png" onChange={onAvatar2ImageChange}/>
                     <Icon type="upload" />
                       <b> Add Avatar 2 Image</b>
                    </span>
               </label> :
                   <img src={avatarTwoSource} style={{width: "120px", marginLeft: "30px"}} />
                 }
               </Col>
              </Row>
             </div>
              <Row>
              <Col sm={12} md={12} lg={12} >
              <label>
                    <span style={{background:"deepskyblue",padding:"1px 5px 12px 5px",color:"white",borderRadius:"4px"}}>
                     <input type="file" style={{display:"none"}} accept=" image/jpeg, image/png" onChange={onBackgroundImageChange}/>
                     <Icon type="upload" />
                       <b> Add Background Image</b>
                    </span>
               </label>
              </Col>
              </Row>
              <div style={{textAlign:"center",marginTop:"8%"}}><Button onClick={() => onAddRolePlay()} style={{background:"deepskyblue",color:"white",fontWeight:"bold",padding:"2px 25px"}}>Create</Button></div>
            </Modal>
        </div>
    )
}

export default CreateRolePlayModal;