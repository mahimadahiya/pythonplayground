import React, { useEffect, forwardRef } from "react";
import { Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchTraitsList } from "../../actions";

const Traits = forwardRef((props, ref) => {
  const user = useSelector(state => state.userAuth);
  const traits = useSelector(state => state.trait.traits);
  const dispatch = useDispatch();

  useEffect(() => {
    if (traits.length === 0) {
      dispatch(fetchTraitsList(user.Authorization));
    }
  }, [user, dispatch, traits.length]);

  const filterTraits = (val, option) => {
    const filteredList = traits.filter(({ name }) => {
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

  const renderTraits = () => {
    return traits.map(trait => (
      <Select.Option key={trait.id} value={trait.id}>
        {trait.name}
      </Select.Option>
    ));
  };

  return (
    <Select
      style={props.style}
      placeholder="Select Trait(s)"
      onChange={props.onChange}
      showSearch
      filterOption={(val, option) => filterTraits(val, option)}
    >
      {renderTraits()}
    </Select>
  );
});

export default Traits;
