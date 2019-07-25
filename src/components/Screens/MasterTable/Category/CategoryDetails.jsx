import React, { useEffect, useState } from "react";
import { Descriptions, Card } from "antd";
import { useSelector } from "react-redux";
import { fetchCategoryDetails } from "../../../../actions";

const CategoryDetails = props => {
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchCategoryDetails(
        user.Authorization,
        props.match.params.id
      );
      setId(details.result.Category.id);
      setName(details.result.Category.name);
      setDescription(details.result.Category.description);
      setIcon(details.result.Category.icon_url);
      setLoading(false);
    };
    fetchDetails();
  }, []);

  return (
    <div>
      <Card title={<div className="card-title">Category details</div>}>
        <Descriptions bordered size="small">
          <Descriptions.Item label="id">{id}</Descriptions.Item>
          <Descriptions.Item label="Name">{name}</Descriptions.Item>
          <Descriptions.Item label="Description">
            {description}
          </Descriptions.Item>
          <Descriptions.Item label="Icon">
            <a href={icon}>View image</a>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default CategoryDetails;
