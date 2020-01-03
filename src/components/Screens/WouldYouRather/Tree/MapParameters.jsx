import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  Card,
  Form,
  message,
  Icon,
  Select,
  Button,
  Tag,
  Table
} from "antd";
import MButton from "../../../Elements/MButton";
import Parameters from "../../../Elements/Parameters";
import Categories from "../../../Elements/Categories";
import {
  fetchCategories,
  wyrTreeMapParameters,
  wyrTreeList,
  deleteMappedParameter
} from "../../../../actions";
import "./index";

const EpisodeParameterMap = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth);
  const categories = useSelector(state => state.category.categories);

  const actionId = props.actionId;
  const technical_service_id = props.selectedTechnicalId;
  const [cardLoading, setCardLoading] = useState(false);

  const [selectedParameters, setSelectedParameters] = useState([]);
  const [alreadyMappedParameters, setAlreadyMappedParameters] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [finalSelectedList, setFinalSelectedList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const columns = [
    {
      title: "Category Id",
      dataIndex: "category_id",
      key: "category_id"
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name"
    },
    {
      title: "Parameters",
      key: "parameters",
      dataIndex: "parameters",
      render: parameters => (
        <span>
          {parameters.map(param => {
            return <Tag key={param.id}>{param.name}</Tag>;
          })}
        </span>
      )
    }
  ];

  useEffect(() => {
    const fetchAlreadyMappedList = async () => {
      setCardLoading(true);

      try {
        dispatch(fetchCategories(user.Authorization));
      } catch (error) {}

      try {
        const response = await wyrTreeList(
          user.Authorization,
          technical_service_id
        );
        let tempList = [];

        for (let i = 0; i < response.data.result.wyr_episode_list.length; i++) {
          if (response.data.result.wyr_episode_list[i].id === actionId) {
            if (
              response.data.result.wyr_episode_list[i].mapped_parameter.length >
              0
            ) {
              for (
                let j = 0;
                j <
                response.data.result.wyr_episode_list[i].mapped_parameter
                  .length;
                j++
              ) {
                tempList.push(
                  response.data.result.wyr_episode_list[i].mapped_parameter[j]
                    .parameter_id
                );
              }
            }
          }
        }
        setSelectedParameters(tempList);

        let map_parameters = [];
        for (let i = 0; i < response.data.result.wyr_episode_list.length; i++) {
          if (response.data.result.wyr_episode_list[i].id === actionId) {
            if (
              response.data.result.wyr_episode_list[i].mapped_parameter.length >
              0
            ) {
              for (
                let j = 0;
                j <
                response.data.result.wyr_episode_list[i].mapped_parameter
                  .length;
                j++
              ) {
                map_parameters.push(
                  response.data.result.wyr_episode_list[i].mapped_parameter[j]
                );
              }
            }
          }
        }
        setAlreadyMappedParameters(map_parameters);

        setCardLoading(false);
      } catch (error) {
        setCardLoading(false);
      }
    };
    fetchAlreadyMappedList();
  }, [user.Authorization, actionId, technical_service_id, dispatch]);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          wyr_tree_id: actionId,
          parameter_list: JSON.stringify(formValues.parameter)
        };

        setCardLoading(true);
        try {
          const response = await wyrTreeMapParameters(
            user.Authorization,
            values
          );
          props.onValuesSubmit();
          if (response.status === 200) {
            message.success("Mapped successfully");
          }
          props.setLoadAgain(!props.loadAgain);
          props.setShowMapParametersModal(false);
          setCardLoading(false);
        } catch (error) {
          setCardLoading(false);
        }
      }
    });
  };

  const onCategoryChange = value => {
    console.log(value);
    setSelectedCategory(value);
  };

  const onParameterChange = value => {
    console.log(value);
    // setParameters(value);
  };

  const onDeselectingParameter = async e => {
    const gameName = alreadyMappedParameters.find(item => {
      if (item.parameter_id === e) {
        return item;
      }
    });
    try {
      await deleteMappedParameter(user.Authorization, gameName.id);
    } catch (error) {}
  };

  const addComptency = () => {
    let tempList = {
      category_id: selectedCategory,
      category_name: "xyz",
      parameters: [
        {
          id: 1,
          name: "param 1"
        },
        {
          id: 2,
          name: "param 2"
        }
      ]
    };

    setFinalSelectedList([...finalSelectedList, tempList]);
    // set parameter list to null
    setIsDisabled(true);
    setSelectedCategory(null);
  };

  const addNewCategory = () => {
    setIsDisabled(false);
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Modal
        title="Map Competencies"
        visible={props.visible}
        onCancel={props.onCancel}
        destroyOnClose={true}
        footer={false}
      >
        <Card
          bodyStyle={{ padding: "0px" }}
          bordered={false}
          loading={cardLoading}
        >
          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <Icon
              onClick={addNewCategory}
              type="plus"
              style={{ color: "blue", fontSize: "16px", cursor: "pointer" }}
            ></Icon>
          </div>

          <Form>
            <div
              style={{
                border: "1px solid #999999",
                borderRadius: "5px",
                padding: "20px",
                marginBottom: "40px"
              }}
            >
              <Form.Item>
                {getFieldDecorator("competency", {
                  rules: [{ required: true }]
                })(
                  <Select
                    mode={"default"}
                    placeholder="Select a category"
                    onChange={onCategoryChange}
                    showSearch
                    allowClear
                    defaultValue={selectedCategory}
                    value={selectedCategory}
                    disabled={isDisabled === true ? true : false}
                  >
                    {categories.map(category => {
                      return (
                        <Select.Option key={category.id} value={category.id}>
                          {category.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>

              {selectedCategory === null ? (
                <div>Select category to view parameters list</div>
              ) : (
                <Form.Item label="Parameters">
                  {getFieldDecorator("parameter", {
                    rules: [{ required: true }]
                    // initialValue: selectedParameters
                  })(
                    <Parameters
                      mode="multiple"
                      onChange={onParameterChange}
                      onDeselect={e => onDeselectingParameter(e)}
                      categories={[selectedCategory]}
                    />
                  )}
                </Form.Item>
              )}

              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Button
                  type="primary"
                  onClick={addComptency}
                  disabled={isDisabled === true ? true : false}
                >
                  Add Competencies
                </Button>
              </div>
            </div>
          </Form>

          {/* ///////////////////////////////////////////////////////////// */}

          {finalSelectedList.length === 0 ? null : (
            <Table columns={columns} dataSource={finalSelectedList} />
          )}
        </Card>
      </Modal>
    </div>
  );
};

export default Form.create()(EpisodeParameterMap);
