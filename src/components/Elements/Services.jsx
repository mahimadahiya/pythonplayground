import React, { useEffect, forwardRef, useState } from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { fetchAllServices } from "../../actions";

const Services = forwardRef((props, ref) => {
  const user = useSelector(state => state.userAuth);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const orgs = await fetchAllServices(user.Authorization);
      setServices(orgs);
    };
    fetchData();
  }, [user]);

  const filterServices = (val, option) => {
    const filteredList = services.filter(({ name }) => {
      if (name.toLowerCase().includes(val) || option.key.includes(val)) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].id.toString() === option.key) return true;
    }
    return false;
  };

  const renderServices = () => {
    return services.map(service => (
      <Select.Option key={service.id} value={service.id}>
        {service.name}
      </Select.Option>
    ));
  };

  return (
    <Select
      placeholder="Select organization(s)"
      onChange={props.onChange}
      mode={props.mode}
      showSearch
      allowClear
      filterOption={(val, option) => filterServices(val, option)}
    >
      {renderServices()}
    </Select>
  );
});

export default Services;
