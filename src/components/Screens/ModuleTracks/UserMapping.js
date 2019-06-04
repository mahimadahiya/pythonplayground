import React from "react";
import { connect } from "react-redux";

import { Field, reduxForm } from "redux-form";
import { Form, Radio, Select, Checkbox, Button } from "antd";

import {
  fetchModuleTracks,
  fetchOrganizations,
  fetchOrganizationBatches,
  fetchOrganizationTracks,
  createUserTrackMapping
} from "../../../actions";
// import { throwStatement } from "@babel/types";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
// const { Option } = Select;
// const { TextArea } = Input;
// const { RangePicker } = DatePicker;

const makeField = Component => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  ...rest
}) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} children={children} />
    </FormItem>
  );
};

// const AInput = makeField(Input);
const ARadioGroup = makeField(RadioGroup);
// const ASelect = makeField(Select);
// const ACheckbox = makeField(Checkbox);
// const ATextarea = makeField(TextArea);
// const ARangePicker = makeField(RangePicker);

class UserTrackMapping extends React.Component {
  state = {
    mode: null,
    organization_id: null,
    selectedTracks: [],
    selectedBatches: []
  };

  setMode = e => {
    this.setState({ mode: e.target.value });
  };

  componentWillMount = () => {
    this.props.fetchOrganizations(this.props.user.Authorization);
  };

  onTrackSelect = e => {
    this.setState({ selectedTracks: e });
  };

  onBatchSelect = e => {
    this.setState({ selectedBatches: e });
  };

  onOrgSelect = e => {
    this.setState({ organization_id: e }, () => this.loadBatchTrackData());
  };

  loadBatchTrackData = () => {
    const query = { organization_id: this.state.organization_id };
    this.props.fetchOrganizationTracks(this.props.user.Authorization, query);
    this.props.fetchOrganizationBatches(this.props.user.Authorization, query);
  };

  renderTrackList = () => {
    const { organizationTracks } = this.props;
    if (organizationTracks.length > 0) {
      let options = [];
      options.push(
        organizationTracks.map(track => {
          return { label: track.name, value: track.id, key: track.id };
        })
      );
      return (
        <Checkbox.Group options={options[0]} onChange={this.onTrackSelect} />
      );
    }
  };

  renderOrgOptions = (id, name) => {
    const { Option } = Select;
    return <Option value={id} key={id}>{`${name} (${id})`}</Option>;
  };

  renderModeOptions = () => {
    if (this.state.mode === 1) {
      const { organizationBatches } = this.props;
      if (organizationBatches.length > 0) {
        let options = [];
        options.push(
          organizationBatches.map(track => {
            return { label: track.name, value: track.id, key: track.id };
          })
        );
        return (
          <Checkbox.Group options={options[0]} onChange={this.onBatchSelect} />
        );
      }
    } else if (this.state.mode === 2) {
      return <div>Entire org user will be mapped</div>;
    } else if (this.state.mode === 3) {
      return <div>Mode 3</div>;
    } else {
      return <div />;
    }
  };

  onSubmit = e => {
    const formValues = this.state;
    this.props.createUserTrackMapping(
      this.props.user.Authorization,
      formValues
    );
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Select onChange={this.onOrgSelect}>
            {this.props.organizations.map(({ id, name }) => {
              return this.renderOrgOptions(id, name);
            })}
          </Select>
          {this.renderTrackList()}
          <Field
            label="Select Mode"
            name="mode"
            component={ARadioGroup}
            onChange={this.setMode}
          >
            <Radio value="1">Track-Batch-Mapping</Radio>
            <Radio value="2">Track-Organization-Wide-Mapping</Radio>
            <Radio value="3">Track-UserMapping</Radio>
          </Field>
          {this.renderModeOptions()}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    tracks: Object.values(state.moduleTrack.moduleTracks),
    organizations: Object.values(state.organization.organizationList),
    organizationBatches: Object.values(state.organization.organizationBatches),
    organizationTracks: Object.values(state.organization.organizationTracks)
  };
};

const wrappedForm = reduxForm({ form: "userTrackMapping" })(UserTrackMapping);

export default connect(
  mapStateToProps,
  {
    fetchModuleTracks,
    fetchOrganizations,
    fetchOrganizationTracks,
    fetchOrganizationBatches,
    createUserTrackMapping
  }
)(wrappedForm);
