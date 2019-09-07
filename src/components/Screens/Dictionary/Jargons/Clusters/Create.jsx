import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Form, message, Select } from "antd";
import MButton from "../../../../Elements/MButton";
import {
  fetchJargonList,
  fetchKeywordsList,
  createJargonCluster
} from "../../../../../actions";

const CreateJargonCluster = props => {
  const user = useSelector(state => state.userAuth);
  const [jargonList, setJargonList] = useState([]);
  const [keywordsList, setKeywordsList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      let data = await fetchJargonList(user.Authorization);
      setJargonList(data);
      data = await fetchKeywordsList(user.Authorization);
      setKeywordsList(data);
      setLoading(false);
    };
    fetchList();
  }, [user.Authorization]);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formProps) => {
      if (!err) {
        try {
          await createJargonCluster(user.Authorization, {
            ...formProps,
            keyword_id_list: JSON.stringify(formProps.keyword_id_list)
          });
          message.success("Created successfully");
          props.onCloseModal();
        } catch (err) {
          message.error("Internal server error");
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Card loading={loading}>
        <Form onSubmit={onSubmit}>
          <Form.Item label="Jargon">
            {getFieldDecorator("jargon_id", { rules: [{ required: true }] })(
              <Select>
                {jargonList.map(jargon => (
                  <Select.Option key={jargon.id} value={jargon.id}>
                    {jargon.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Keywords">
            {getFieldDecorator("keyword_id_list", {
              rules: [{ required: true }]
            })(
              <Select mode="multiple">
                {keywordsList.map(keyword => (
                  <Select.Option key={keyword.id} value={keyword.id}>
                    {keyword.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <MButton>Create</MButton>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(CreateJargonCluster);
