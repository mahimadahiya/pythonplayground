import React, { useState } from "react";
import { Card, Select, Form } from "antd";
import TraitTypes from "../../Elements/TraitTypes";
import QuestionBankList from "./QuestionBankList";

const MapTraits = () => {
  const [type, setType] = useState(1);

  const onTypeChange = value => {
    setType(value);
  };

  return (
    <div>
      <Card title={<div className="card-title">Map Traits</div>}>
        <Form.Item label="Select Type">
          <TraitTypes
            style={{ width: "40%" }}
            value={type}
            onChange={onTypeChange}
          />
        </Form.Item>
        {type === 1 ? <QuestionBankList /> : null}
      </Card>
    </div>
  );
};

export default MapTraits;
