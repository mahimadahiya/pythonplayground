import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row,Col } from "antd";
import { rolePlayConversationDetails } from "../../../actions";

const RolePlayDetails = props => {
    const user = useSelector(state => state.userAuth);

    const [avatarOneName,setAvatarOneName] = useState();
    const [avatarOneImage,setAvatarOneImage] = useState();

    const [avatarTwoName,setAvatarTwoName] = useState();
    const [avatarTwoImage,setAvatarTwoImage] = useState();

    const [backgroundImage,setBackgroundImage] = useState();
    
    useEffect(() => {
        const fetchDetails = async () => {
            
          const details = await rolePlayConversationDetails(
            user.Authorization,
            props.match.params.id
          );
          console.log(details.result.rp_article_details);
          setAvatarOneName(details.result.rp_article_details.avatar_details[0].name);
          setAvatarTwoName(details.result.rp_article_details.avatar_details[1].name);
          setAvatarOneImage(details.result.rp_article_details.avatar_details[0].media_url);
          setAvatarTwoImage(details.result.rp_article_details.avatar_details[1].media_url);
          setBackgroundImage(details.result.rp_article_details.background_url);
          
        };
        fetchDetails();
      }, [user, props.match.params.id]);

    return (
        <div>
            <div style={{textAlign:"center",background:"lightblue"}}><h3 style={{lineHeight:"44px"}}>Role Play</h3></div>
              <div style={{border:"1px solid black",margin:"20px",borderRadius:"36px"}}>
                  <Row style={{marginTop:"50px"}}>
                      <Col sm={22} md={16} lg={16} style={{marginLeft:"40px"}}>
                          <div style={{display:"flex",marginBottom:"30px"}}>
                              <div style={{width:"40%"}}> <h3 style={{border:"1px solid black",padding:"12px",marginBottom:"30px"}} >{avatarOneName}</h3></div>
                              <div style={{width:"50%",textAlign:"center"}}> <img src={avatarOneImage} style={{width:"90px"}} /> </div>
                          </div>

                          <div style={{display:"flex"}}>
                              <div style={{width:"40%"}}> <h3 style={{border:"1px solid black",padding:"12px",marginBottom:"30px"}} >{avatarTwoName}</h3></div>
                              <div style={{width:"50%",textAlign:"center"}}> <img src={avatarTwoImage} style={{width:"90px"}} /> </div>
                          </div>
                         
                          
                      </Col>
                      <Col sm={22} md={7} lg={7}>
                            <div style={{textAlign:"center"}}>
                                <img style={{width:"120px",height:"150px"}} src={backgroundImage} />
                            </div>
                      </Col>
                      
                  </Row>
              </div>
        </div>
    );
};

export default RolePlayDetails;