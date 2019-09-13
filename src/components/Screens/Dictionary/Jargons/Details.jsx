import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchJargonDetails } from "../../../../actions";
import { Descriptions, Card } from "antd";

const JargonDetails = props => {
  const user = useSelector(state => state.userAuth);
  const [jargon, setJargon] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchJargonDetails(
        user.Authorization,
        props.match.params.id
      );
      setLoading(false);
      setJargon(data.result.jargon_details);
    };
    fetchDetails();
  }, [user.Authorization, props.match.params.id]);

  return (
    <div>
      <Card loading={loading}>
        {jargon !== null ? (
          <Descriptions bordered size="small" column={2}>
            <Descriptions.Item label="ID" span={1}>
              {jargon.id}
            </Descriptions.Item>
            <Descriptions.Item label="Creator ID" span={1}>
              {jargon.creater_id}
            </Descriptions.Item>
            <Descriptions.Item label="Name" span={2}>
              {jargon.name}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={2}>
              {jargon.description}
            </Descriptions.Item>
          </Descriptions>
        ) : null}
      </Card>
    </div>
  );
};

export default JargonDetails;
