import React from "react";
import { connect } from "react-redux";
import { fetchContentComplexityLevel } from "../../actions";
import { Select, Form } from "antd";

const getLevels = async (user, fetchContentComplexityLevel, levels) => {
  if (levels.length === 0) {
    await fetchContentComplexityLevel(user.Authorization);
  }
};

const renderLevels = levels => {
  return levels.map(level => {
    return <Select.Option value={level.id}>{level.description}</Select.Option>;
  });
};

const ContentComplexityLevel = props => {
  React.useEffect(() => {
    getLevels(props.user, props.fetchContentComplexityLevel, props.levels);
  }, [props.levels]);
  return (
    <div>
      <Form.Item label="Content Complexity Levels">
        <Select
          placeholder="Select a level"
          onChange={props.onChange}
          mode={props.mode}
        >
          {renderLevels(props.levels)}
        </Select>
      </Form.Item>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    levels: state.contentComplexityLevel.levels,
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { fetchContentComplexityLevel }
)(ContentComplexityLevel);
