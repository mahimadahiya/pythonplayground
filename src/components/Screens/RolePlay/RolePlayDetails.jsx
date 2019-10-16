import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row,Col,List } from "antd";
import { rolePlayConversationDetails } from "../../../actions";

const RolePlayDetails = props => {
    const user = useSelector(state => state.userAuth);

    const [avatarOneName,setAvatarOneName] = useState();
    const [avatarOneImage,setAvatarOneImage] = useState();

    const [avatarTwoName,setAvatarTwoName] = useState();
    const [avatarTwoImage,setAvatarTwoImage] = useState();

    const [backgroundImage,setBackgroundImage] = useState();
    const [conversationDetails,setConversationDetails] = useState();
    
    useEffect(() => {
        const fetchDetails = async () => {
            
          const details = await rolePlayConversationDetails(
            user.Authorization,
            props.match.params.id
          );
          console.log(details.result.article_conversation);
          setAvatarOneName(details.result.rp_article_details.avatar_details[0].name);
          setAvatarTwoName(details.result.rp_article_details.avatar_details[1].name);
          setAvatarOneImage(details.result.rp_article_details.avatar_details[0].media_url);
          setAvatarTwoImage(details.result.rp_article_details.avatar_details[1].media_url);
          setBackgroundImage(details.result.rp_article_details.background_url);
          setConversationDetails(details.result.article_conversation);
          
          
        };
        fetchDetails();
      }, [user, props.match.params.id]);

    return (
        <div>
            <div style={{textAlign:"center",background:"lightblue"}}><h3 style={{lineHeight:"44px"}}>Role Play</h3></div>
              <div style={{border:"1px solid #999999",margin:"20px",borderRadius:"5px",padding:"35px"}}>
                  <Row style={{marginTop:"50px"}}>
                      <Col sm={22} md={16} lg={16} style={{marginLeft:"40px"}}>
                          <div style={{display:"flex",marginBottom:"30px"}}>
                              <div style={{width:"40%"}}> <h3 style={{border:"1px solid #999999",padding:"12px",marginBottom:"30px"}} >{avatarOneName}</h3></div>
                              <div style={{width:"50%",textAlign:"center"}}> <img src={avatarOneImage} style={{width:"90px"}} alt="leftAvatar" /> </div>
                          </div>

                          <div style={{display:"flex"}}>
                              <div style={{width:"40%"}}> <h3 style={{border:"1px solid #999999",padding:"12px",marginBottom:"30px"}} >{avatarTwoName}</h3></div>
                              <div style={{width:"50%",textAlign:"center"}}> <img src={avatarTwoImage} style={{width:"90px"}} alt="rightAvatar" /> </div>
                          </div>
                         
                          
                      </Col>
                      <Col sm={22} md={7} lg={7}>
                            <div style={{textAlign:"center"}}>
                                <div>
                                <img style={{width:"120px",height:"150px"}} src={backgroundImage} alt="background" />
                                </div>
                                <div style={{marginTop:"10px"}}>
                                    <span style={{fontWeight:"bold"}}>Background</span>
                                </div>
                            </div>
                      </Col>
                      
                  </Row>
              </div>

              <div style={{textAlign:"center",background:"lightblue"}}><h3 style={{lineHeight:"44px"}}>Sequence</h3></div>
              <div style={{padding:"35px"}}>
              <List
                  itemLayout="horizontal"
                  dataSource={conversationDetails}
                  renderItem={item => (
                <List.Item>
                     <List.Item.Meta style={{border:"1px solid #999999",padding:"20px",borderRadius:"5px"}}
          
                         title={<div><span>{item.type}</span><span style={{float:"right"}}>{item.timer}</span></div>}
                         description={item.text}
                 />
                </List.Item>
                 )}
               />
              </div>

        </div>
        
    );
};

export default RolePlayDetails;