import React, { useEffect, useState } from "react";
import { Descriptions, Card } from "antd";
import { useSelector } from "react-redux";
import { fetchTagDetails } from "../../../../actions";

const TagDetails = props => {
  const user = useSelector(state => state.userAuth);

  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchTagDetails(
        user.Authorization,
        props.match.params.id
      );
      setId(details.result.tag.id);
      setName(details.result.tag.name);
      setLoading(false);
    };
    fetchDetails();
  }, []);

  return (
    <div>
      <Card title={<div className="card-title">Tag details</div>}>
        <Descriptions bordered size="small">
          <Descriptions.Item label="id">{id}</Descriptions.Item>
          <Descriptions.Item label="Name">{name}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default TagDetails;
