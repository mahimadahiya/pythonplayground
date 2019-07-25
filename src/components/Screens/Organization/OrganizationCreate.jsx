import React, { useState, useEffect } from "react";
import { Form, Input, message, Card } from "antd";
import { useSelector } from "react-redux";
import Region from "../../Elements/Region";
import Courses from "../../Elements/Courses";
import Industries from "../../Elements/Industries";
import MButton from "../../Elements/MButton";
import { createOrganization, fetchOrganizationDetails } from "../../../actions";

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

const OrganizationCreate = props => {
  const user = useSelector(state => state.userAuth);
  const [region, setRegion] = useState(null);
  const [course, setCourse] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const details = await fetchOrganizationDetails(
        user.Authorization,
        props.id
      );
      props.form.setFieldsValue({
        name: details.result.organization.name
      });
      setRegion(details.result.organization.region_id);
      setCourse(details.result.organization.course_id);
      setIndustry(details.result.organization.industry_type_id);
      setLoading(false);
    };
    if (props.id) {
      fetchDetails();
    }
  }, [fetchOrganizationDetails, props.id]);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          name: formValues.name,
          course_id: course,
          industry_type_id: industry,
          region_id: region
        };
        clean(values);
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
      <Card>
        <Form onSubmit={onSubmit}>
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Name is required" }]
            })(<Input placeholder="Enter name of organization" />)}
          </Form.Item>
          <Region mode="single" onChange={onChangeRegion} value={region} />

          <Courses onChange={onChangeCourse} value={course} />

          <Industries onChange={onChangeIndustry} value={industry} />

          <MButton>{props.id ? "Edit" : "Create"}</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(OrganizationCreate);
