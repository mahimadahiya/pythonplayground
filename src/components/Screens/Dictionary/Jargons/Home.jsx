import React from "react";
import { Tabs, Card } from "antd";
import JargonsList from "./List";
import JargonClusterList from "./Clusters/List";

const JargonHome = () => {
  return (
    <Card>
      <Tabs defaultActiveKey="jargon">
        <Tabs.TabPane tab="Jargon" key="jargon">
          <JargonsList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Cluster" key="cluster">
          <JargonClusterList />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default JargonHome;
