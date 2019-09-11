import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Form, message, Select, Input, Button } from "antd";
import {
  fetchJargonList,
  createJargonCluster,
  mapJargonClusterJargons
} from "../../../../../actions";

const CreateJargonCluster = props => {
  const user = useSelector(state => state.userAuth);
  const [jargonList, setJargonList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showMapJargonList, setshowMapJargonList] = useState(false);
  const [jargonClusterId, setJargonClusterId] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);

      setLoading(false);
    };
    fetchList();
  }, [user.Authorization]);

  const onCreateJargon = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formProps) => {
      if (!err) {
        if (
          formProps.name === undefined ||
          formProps.name === null ||
          formProps.name === ""
        ) {
          message.warning("Please fill name");
          return;
        }
        if (
          formProps.description === undefined ||
          formProps.description === null ||
          formProps.description === ""
        ) {
          message.warning("Please fill description");
          return;
        }
        setLoading(true);
        try {
          let response = await createJargonCluster(user.Authorization, {
            ...formProps
          });
          setLoading(false);
          message.success("Created successfully");

          // fetch jargonList
          setJargonClusterId(response.data.result.jargon_cluster_id);
          setLoading(true);
          try {
            let jargonListData = await fetchJargonList(user.Authorization);
            setJargonList(jargonListData);
            setshowMapJargonList(true);
            props.setCreateJargonClusterTitle("Map Jargons to Jargon Cluster");

            setLoading(false);
          } catch (err) {
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
          message.error("Internal server error");
        }
      }
    });
  };

  const onMapJargons = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formProps) => {
      if (!err) {
        if (
          formProps.jargon_id_list === undefined ||
          formProps.jargon_id_list === null ||
          formProps.jargon_id_list.length === 0
        ) {
          message.warning("Please select atleast 1 jargon for mapping");
          return;
        }
        setLoading(true);
        try {
          await mapJargonClusterJargons(user.Authorization, {
            // ...formProps,
            jargon_cluster_id: jargonClusterId,
            jargon_id_list: JSON.stringify(formProps.jargon_id_list)
          });
          setLoading(false);
          message.success("jargons mapped successfully");
          props.setloadAgain(!props.loadAgain);
          props.onCloseModal();
        } catch (err) {
          setLoading(false);
          message.error("Internal server error");
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Card loading={loading}>
        {showMapJargonList === false ? (
          <span>
            <Form>
              <Form.Item
                label={
                  <span>
                    <span style={{ color: "red" }}>*</span> Name
                  </span>
                }
              >
                {getFieldDecorator("name")(<Input />)}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    <span style={{ color: "red" }}>*</span> Description
                  </span>
                }
              >
                {getFieldDecorator("description")(<Input />)}
              </Form.Item>
              <Button type="primary" onClick={onCreateJargon}>
                Create
              </Button>
            </Form>
          </span>
        ) : (
          <span>
            <Form>
              <Form.Item
                label={
                  <span>
                    <span style={{ color: "red" }}>*</span> Jargons
                  </span>
                }
              >
                {getFieldDecorator("jargon_id_list")(
                  <Select mode="multiple">
                    {jargonList.map(jargon => (
                      <Select.Option key={jargon.id} value={jargon.id}>
                        {jargon.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Button type="primary" onClick={onMapJargons}>
                Map Jargons
              </Button>
            </Form>
          </span>
        )}
      </Card>
    </div>
  );
};

export default Form.create()(CreateJargonCluster);
