import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Descriptions } from "antd";
import { fetchModuleDetails } from "../../../actions/masterActions";

const ModuleDetails = props => {
  const id = props.match.params.id;
  const user = useSelector(state => state.userAuth);

  useEffect(() => {
    const fetchDetails = async () => {
      await fetchModuleDetails(user.Authorization, id);
    };
    fetchDetails();
  });

  const moduleMap = useSelector(state => state.master.moduleMap);
  const module = moduleMap[id];
  return (
    <div>
      <Card title="Module Details">
        {/* <Descriptions bordered column={3}>
          <Descriptions.Item label="ID" span={1}>
            {module.id}
          </Descriptions.Item>
          <Descriptions.Item label="Name" span={2}>
            {module.name}
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            {module.description}
          </Descriptions.Item>
          <Descriptions.Item label="Slug">{module.slug}</Descriptions.Item>
        </Descriptions> */}
      </Card>
    </div>
  );
};

export default ModuleDetails;
