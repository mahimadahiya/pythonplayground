import React, { useEffect, useState } from "react";
import { Descriptions, Card } from "antd";
import { useSelector } from "react-redux";
import { fetchParameterDetails } from "../../../../actions";

const ParameterDetails = props => {
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [icon, setIcon] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchParameterDetails(
        user.Authorization,
        props.match.params.id
      );
      setId(details.result.parameter.id);
      setName(details.result.parameter.name);
      setDescription(details.result.parameter.description);
      setIcon(details.result.parameter.icon_url);
      setImage(details.result.parameter.image_url);
      setLoading(false);
    };
    fetchDetails();
  }, []);

  return (
    <div>
      <Card title={<div className="card-title">Parameter details</div>}>
        <Descriptions bordered size="small">
          <Descriptions.Item label="id">{id}</Descriptions.Item>
          <Descriptions.Item label="Name">{name}</Descriptions.Item>
          <Descriptions.Item label="Description">
            {description}
          </Descriptions.Item>
          <Descriptions.Item label="Icon">
            <img src={icon} height="100" />
          </Descriptions.Item>
          <Descriptions.Item label="Image">
            <img src={image} height="100" />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ParameterDetails;
