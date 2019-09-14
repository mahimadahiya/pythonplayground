import React, { useEffect, useState, forwardRef } from "react";
import { useSelector } from "react-redux";
import { fetchIndustries } from "../../actions";
import { Select } from "antd";

const Industries = forwardRef((props, ref) => {
  const user = useSelector(state => state.userAuth);
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchIndustries(user.Authorization);
      setIndustries(data);
    };
    fetchData();
  }, [user]);
  return (
    <Select placeholder="Select an industry" onChange={props.onChange}>
      {industries.length > 0 &&
        industries.map(industry => (
          <Select.Option allowClear key={industry.id} value={industry.id}>
            {industry.name}
          </Select.Option>
        ))}
    </Select>
  );
});

export default Industries;
