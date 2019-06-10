import React from "react";
import { Form, Input, Select, DatePicker, Switch } from "antd";

const FormItem = Form.Item;
const { Option } = Select;

const CreateAntField = AntComponent => ({
  field,
  form,
  hasFeedback,
  selectOptions,
  selectOptionObject,
  label,
  submitCount,
  type,
  ...props
}) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }) => {
    form.setFieldValue(field.name, value);
  };
  const onChange = value => {
    form.setFieldValue(field.name, value);
    if (props.onChange) props.onChange(value);
  };

  const onBlur = () => form.setFieldTouched(field.name, true);
  return (
    <div className="field-container">
      <FormItem
        label={label}
        hasFeedback={
          (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
        }
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? "error" : "success"}
      >
        <AntComponent
          {...field}
          {...props}
          size="large"
          onBlur={onBlur}
          onChange={type ? onInputChange : onChange}
        >
          {selectOptionObject &&
            selectOptionObject.map(({ id, name }) => (
              <Option key={id}>{`${name} (${id})`}</Option>
            ))}
        </AntComponent>
      </FormItem>
    </div>
  );
};

export const AntInput = CreateAntField(Input);
export const AntInputPassword = CreateAntField(Input.Password);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntSelect = CreateAntField(Select);
export const AntSwitch = CreateAntField(Switch);
