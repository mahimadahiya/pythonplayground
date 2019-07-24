import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchIndustries } from "../../actions";
import { Select, Form } from "antd";

const Industries = props => {
  const user = useSelector(state => state.userAuth);
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchIndustries(user.Authorization);
      setIndustries(data);
    };
    fetchData();
  }, [user]);
  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Form.Item label="Industry">
        {getFieldDecorator("industry", {
          rules: [{ required: true, message: "Industry is required" }]
        })(
          <Select placeholder="Select an industry" onChange={props.onChange}>
            {industries.length > 0 &&
              industries.map(industry => (
                <Select.Option key={industry.id}>{industry.name}</Select.Option>
              ))}
          </Select>
        )}
      </Form.Item>
    </div>
  );
};

export default Form.create()(Industries);
