import React from "react";
import { useSelector } from "react-redux";
import { Card, Descriptions } from "antd";

const ServiceDetails = props => {
  const id = props.match.params.id;

  const serviceMap = useSelector(state => state.master.serviceMap);
  const service = serviceMap[id];
  return (
    <div>
      <Card title="Service Details">
        <Descriptions bordered column={3}>
          <Descriptions.Item label="ID" span={1}>
            {service.id}
          </Descriptions.Item>
          <Descriptions.Item label="Name" span={2}>
            {service.name}
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            {service.description}
          </Descriptions.Item>
          <Descriptions.Item label="Type">{service.type}</Descriptions.Item>
          <Descriptions.Item label="Slug">{service.slug}</Descriptions.Item>
          <Descriptions.Item label="Visibility">
            {service.visibility}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ServiceDetails;
