import React, { useState } from "react";
import { Card, Select, Input, Icon, Button, message, Form } from "antd";
import { useSelector } from "react-redux";
import { createNewTechnicalService } from "../../../actions";
import Organizations from "../../Elements/Organizations";
import MButton from "../../Elements/MButton";

const Create = props => {
  const user = useSelector(state => state.userAuth);
  const [name, setName] = useState("");
  const [organizationId, setOrganizationId] = useState(null);

  const onNameChange = event => {
    setName(event.target.value);
  };

  {
    /* 
  const createNew = async () => {
    if (name === null || name === undefined || name === "" || name === " ") {
      message.warning("Please enter name");
      return;
    }

    let formValues = {};
    formValues = {
      name: name,
      organization_id: organizationId
    };

    try {
      await createNewTechnicalService(user.Authorization, formValues);
      message.success("Action Created");
      props.setCreateNewModalShow(false);
      props.setLoadAgain(!props.loadAgain);
    } catch (error) {}
  };
  */
  }

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          organization_id: formValues.organization_id,
          name: formValues.name
        };
        const response = await createNewTechnicalService(
          user.Authorization,
          values
        );
        if (response.status === 201) {
          message.success("created successfully");
          props.setCreateNewModalShow(false);
          props.setLoadAgain(!props.loadAgain);
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;

  const onOrganizationChange = value => {
    setOrganizationId(value);
  };

  return (
    <div>
      {/* 
      <Card
        bodyStyle={{ padding: 0, fontSize: "15px" }}
        //loading={loading}
        bordered={false}
      >
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <div
            style={{
              width: "140px",
              fontWeight: 600
            }}
          >
            Name
            <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
          </div>
          <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
            <div>
              <Input
                type="text"
                placeholder="Action"
                style={{
                  width: "100%"
                }}
                onChange={onNameChange}
              />
            </div>
          </div>
        </div>
        <div style={{ margin: "60px 0px 30px 0px", textAlign: "center" }}>
          <Button type="primary" onClick={() => createNew()}>
            Create New
          </Button>
        </div>
      </Card>
       */}
      <Card>
        <Form onSubmit={onSubmit}>
          <Form.Item label="Organizations">
            {getFieldDecorator("organization_id", {
              rules: [{ required: true }]
            })(<Organizations onChange={onOrganizationChange} />)}
          </Form.Item>
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [{ required: true }]
            })(
              <Input
                type="text"
                placeholder="Name"
                style={{
                  width: "100%"
                }}
                onChange={onNameChange}
              />
            )}
          </Form.Item>
          <MButton>Submit</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(Create);
