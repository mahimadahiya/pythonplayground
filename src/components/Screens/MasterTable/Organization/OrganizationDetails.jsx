import React, { useEffect, useState } from "react";
import { Descriptions, Card, List, Row, Col ,Button ,Modal } from "antd";
import { fetchOrganizationDetails } from "../../../../actions";
import { useSelector } from "react-redux";
import SPOCCreate from "./SPOC/Create";

const OrganizationDetails = props => {
  const user = useSelector(state => state.userAuth);
  const [details, setDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchOrganizationDetails(
        user.Authorization,
        props.match.params.id
      );
      setDetails(data.result);
    };
    fetchDetails();
  }, [user, props.match.params.id,props.id]);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const addSpoc = ()=> {
    setShowModal(true);
  };

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
              <Descriptions.Item label="SPOC User Id">{(details.organization.spoc_user_id === null || details.organization.spoc_user_id === "" || details.organization.spoc_user_id === " " ) ? <Button type="primary" shape="round"  size="large" onClick={()=> addSpoc()}> Add SPOC</Button> :<span>{details.organization.spoc_user_id}</span>}</Descriptions.Item>
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
      <Modal
        title="Create SPOC"
        visible={showModal}
        footer={null}
        destroyOnClose={true}
        onCancel={onCloseModal}
        closable={true}
        width="1000px"
      >
        <SPOCCreate
          onCloseModal={onCloseModal}
          onCloseModalParent={props.onCloseModal}
        />
      </Modal>
    </div>
  );
};

export default OrganizationDetails;
