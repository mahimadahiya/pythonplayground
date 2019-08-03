import React, { useEffect, forwardRef, useState } from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { fetchModules } from "../../actions";

const Modules = forwardRef((props, ref) => {
  const user = useSelector(state => state.userAuth);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const modules = await fetchModules(user.Authorization);
      setModules(modules);
    };
    fetchData();
  }, [user]);

  const filterModules = (val, option) => {
    const filteredList = modules.filter(({ name }) => {
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

  const renderModules = () => {
    return modules.map(module => (
      <Select.Option key={module.id} value={module.id}>
        {module.name}
      </Select.Option>
    ));
  };

  return (
    <Select
      placeholder="Select module(s)"
      onChange={props.onChange}
      showSearch
      filterOption={(val, option) => filterModules(val, option)}
    >
      {renderModules()}
    </Select>
  );
});

export default Modules;
