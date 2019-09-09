import React, { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContentComplexityLevel } from "../../actions";
import { Select } from "antd";

const renderLevels = levels => {
  return levels.map(level => {
    return (
      <Select.Option key={level.id} value={level.id}>
        {level.description}
      </Select.Option>
    );
  });
};

const ContentComplexityLevel = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.userAuth);
  const levels = useSelector(state => state.contentComplexityLevel.levels);

  React.useEffect(() => {
    dispatch(fetchContentComplexityLevel(user.Authorization));
  }, [dispatch, user]);
  return (
    <div>
      <Select
        placeholder="Select a level"
        onChange={props.onChange}
        mode={props.mode}
      >
        {renderLevels(levels)}
      </Select>
    </div>
  );
});

export default ContentComplexityLevel;
