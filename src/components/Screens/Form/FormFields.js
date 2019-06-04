import React from "react";
import { Form, Input, Select, DatePicker } from "antd";

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
  const onChange = value => form.setFieldValue(field.name, value);
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
          onBlur={onBlur}
          onChange={type ? onInputChange : onChange}
        >
          {/* {selectOptions &&
            selectOptions.map((name) => <Option key={name}>{name}</Option>)} */}
          {selectOptionObject &&
            selectOptionObject.map(({ id, name }) => (
              <Option key={id}>{name}</Option>
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
