import React, { useState, useEffect } from "react";
import { Form, Input, message, Card } from "antd";
import { useSelector } from "react-redux";
import MButton from "../../../Elements/MButton";
import { fetchCategoryDetails } from "../../../../actions";

const CategoryCreate = props => {
  const user = useSelector(state => state.userAuth);
  const [iconUrl, setIconUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      console.log("herer");
      setLoading(true);
      const details = await fetchCategoryDetails(user.Authorization, props.id);
      console.log(props.form.getFieldValue("name"));

      props.form.setFieldsValue({
        name: details.result.Category.name
      });
    };
    setLoading(false);

    if (props.id) {
      fetchDetails();
    }
  }, [fetchCategoryDetails, props.id]);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          name: formValues.name
        };
        // const response = await createOrganization(user.Authorization, values);
        // if (response.status === 201) {
        //   message.success("Organization created successfully");
        // }
      }
    });
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

          <MButton>{props.id ? "Edit" : "Create"}</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(CategoryCreate);
