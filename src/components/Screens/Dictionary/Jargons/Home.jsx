import React from "react";
import { Tabs, Card } from "antd";
import JargonsList from "./List";

const JargonHome = () => {
  return (
    <Card>
      <Tabs defaultActiveKey="jargon">
        <Tabs.TabPane tab="Jargon" key="jargon">
          <JargonsList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Cluster" key="cluster">
          <JargonsList />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default JargonHome;
