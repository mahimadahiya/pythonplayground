import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import Region from "../../Elements/Region";
import Courses from "../../Elements/Courses";
import Industries from "../../Elements/Industries";
import MButton from "../../Elements/MButton";
import { createOrganization } from "../../../actions";

const OrganizationCreate = props => {
  const user = useSelector(state => state.userAuth);
  const [region, setRegion] = useState(null);
  const [course, setCourse] = useState(null);
  const [industry, setIndustry] = useState(null);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          name: formValues.name,
          course_id: course,
          // industry_id: industry,
          region_id: region
        };
        const response = await createOrganization(user.Authorization, values);
        if (response.status === 201) {
          message.success("Organization created successfully");
        }
      }
    });
  };

  const onChangeRegion = val => {
    setRegion(val);
  };

  const onChangeCourse = val => {
    setCourse(val);
  };

  const onChangeIndustry = val => {
    setIndustry(val);
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Name is required" }]
          })(<Input placeholder="Enter name of organization" />)}
        </Form.Item>
        <Region mode="single" onChange={onChangeRegion} />

        <Courses onChange={onChangeCourse} />

        <Industries onChange={onChangeIndustry} />

        <MButton>Create</MButton>
      </Form>
    </div>
  );
};

export default Form.create()(OrganizationCreate);
