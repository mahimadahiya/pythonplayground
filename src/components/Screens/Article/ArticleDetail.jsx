import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchArticleDetail } from "../../../actions";
import { Card, Descriptions } from "antd";

const ArticleDetail = props => {
  const user = useSelector(state => state.userAuth);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [parameter, setParameter] = useState([]);
  const [category, setCategory] = useState([]);
  const [tag, setTag] = useState([]);
  const [handpicked,SetHandPicked] = useState(null);
  const [userStatus,SetUserStatus] = useState(null);
  const [mediaUrl,setMediaUrl] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchArticleDetail(
        props.match.params.id,
        user.Authorization
      );
     
      setName(data.Articles.name);
      setType(data.Articles.type);
      setCategory(data.categories);
      setParameter(data.parameters);
      setTag(data.tags);
      SetHandPicked(data.Articles.handpicked);
      SetUserStatus(data.Articles.status);
      setMediaUrl(data.Articles.url);
      console.log(data.Articles.url);
      
      
    };
    fetchDetails();
  }, [props.match.params.id, user]);

  const renderFields = () => {
    return (
      <>
        <Descriptions bordered size="small">
          <Descriptions.Item label="Name">{name}</Descriptions.Item>
          <Descriptions.Item label="Article Type">{type}</Descriptions.Item>
          <Descriptions.Item label="Category">
            {category.length > 0 ? (
              <>
                <span>
                  <b>{category[0].category_id} </b> :{" "}
                </span>
                <span>{category[0].category__name}</span>
              </>
            ) : (
              "None"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Parameter">
            {parameter.length > 0 ? (
              <>
                <span>
                  <b>{parameter[0].parameter_id} : </b>{" "}
                </span>
                <span>{parameter[0].parameter__name}</span>
              </>
            ) : (
              "None"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Tag">
            {tag.length > 0 ? (
              <>
                <span>
                  <b>{tag[0].tag_id} : </b>{" "}
                </span>
                <span>{tag[0].tag__name}</span>
              </>
            ) : (
              "None"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Handpicked"><span style={handpicked === 0 ?{color:'red'}:{color:'green'}}> {handpicked === 0 ?'no':'Yes'} </span></Descriptions.Item>
          <Descriptions.Item label="Status">
            {(userStatus === 1)? <span style={{color:'red'}}>Draft</span> :  <span style={{color:'green'}}>Live </span> }
          </Descriptions.Item>
        </Descriptions>
      </>
    );
  };

  const showMediaContainer = ({type,mediaUrl}) => {
       
            
            switch(type){
              case 'image':
                return <Card hoverable  title={type} style={{ maxWidth: 525,maxHeight:300,margin:"auto" }} ><img style={{maxWidth:"100%"}} alt="No Media Avialable" src={mediaUrl} /> </Card>;
              case 'video':
                return <Card hoverable title={type} style={{ maxWidth: 525,maxHeight:300,margin:"auto" }} ><video style={{maxWidth:"100%",maxHeight:"100%"}} controls> <source src={mediaUrl} type="video/mp4" /> <source src={mediaUrl} type="video/ogg" /></video> </Card>  ;
              case 'audio':
                return <Card hoverable title={type} style={{ maxWidth: 525,maxHeight:300,margin:"auto" }} ><audio controls><source src={mediaUrl} type="audio/mpeg" /></audio> </Card>;
              case 'html':
                return <Card hoverable title={type} style={{ maxWidth: 525,maxHeight:300,margin:"auto" }}> <a href={mediaUrl}>Html</a> </Card>;
            }
          
    
    
  };

  return (
    <div>
      <Card title={<div className="card-title">Article Details</div>}>
        {renderFields()}
      </Card>
      <div style={{marginTop:"6%",marginBottom:"6%"}}> 
        {showMediaContainer({type,mediaUrl})}
      </div>
    </div>
  );
};

export default ArticleDetail;
