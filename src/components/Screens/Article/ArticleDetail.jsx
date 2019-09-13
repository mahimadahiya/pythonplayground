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
        </Descriptions>
      </>
    );
  };

  return (
    <div>
      <Card title={<div className="card-title">Article Details</div>}>
        {renderFields()}
      </Card>
    </div>
  );
};

export default ArticleDetail;
