import React, { useEffect, forwardRef, useState } from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { fetchAllOrganizations } from "../../actions";

const Organizations = forwardRef((props, ref) => {
  const user = useSelector(state => state.userAuth);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const orgs = await fetchAllOrganizations(user.Authorization);
      setOrganizations(orgs);
    };
    fetchData();
  }, [user]);

  const filterOrganizations = (val, option, parameters) => {
    const filteredList = parameters.filter(({ name }) => {
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

  const renderOrganizations = () => {
    return organizations.map(org => (
      <Select.Option key={org.id} value={org.id}>
        {org.name}
      </Select.Option>
    ));
  };

  return (
    <Select
      placeholder="Select organization(s)"
      onChange={props.onChange}
      showSearch
      filterOption={(val, option) => filterOrganizations(val, option, modules)}
    >
      {renderOrganizations()}
    </Select>
  );
});

export default Organizations;
