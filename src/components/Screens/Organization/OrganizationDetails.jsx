import React, { useEffect, useState } from "react";
import { Descriptions, Card, List, Row, Col } from "antd";
import { fetchOrganizationDetails } from "../../../actions";
import { useSelector } from "react-redux";

const OrganizationDetails = props => {
  const user = useSelector(state => state.userAuth);
  const [details, setDetails] = useState(null);
  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchOrganizationDetails(
        user.Authorization,
        props.match.params.id
      );
      setDetails(data.result);
    };
    fetchDetails();
  }, [user, props.match.params.id]);
  return (
    <div>
      <Card title="Organization details" loading={!details}>
        {!details ? null : (
          <>
            <Descriptions bordered size="small">
              <Descriptions.Item label="Organization ID">
                {details.organization.id}
              </Descriptions.Item>
              <Descriptions.Item label="Name">
                {details.organization.name}
              </Descriptions.Item>
            </Descriptions>
            <Row style={{ marginTop: 20 }} gutter={48}>
              <Col span={8}>
                <List header={<b>Organization Services</b>}>
                  {details.organization_services.map(service => (
                    <List.Item>{service.service__name}</List.Item>
                  ))}
                </List>
              </Col>
              <Col span={8}>
                <List header={<b>Organization Tabs</b>}>
                  {details.organization_tabs.map(tab => (
                    <List.Item>{tab.tab__name}</List.Item>
                  ))}
                </List>
              </Col>
              <Col span={8}>
                <List header={<b>Organization Tech Services</b>}>
                  {details.organization_tech_service.map(service => (
                    <List.Item>{service.technical_service__name}</List.Item>
                  ))}
                </List>
              </Col>
            </Row>
          </>
        )}
      </Card>
    </div>
  );
};

export default OrganizationDetails;
