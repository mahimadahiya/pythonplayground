import React from "react";
import { Form, Input } from "antd";

const FormItem = Form.Item;

const FontField = AntComponent => ({
  field,
  form,
  hasFeedback,
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
  const onInputChange = ({ target: { value } }) =>
    form.setFieldValue(field.name, value);
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
        />
      </FormItem>
    </div>
  );
};

export const AntInput = FontField(Input);
