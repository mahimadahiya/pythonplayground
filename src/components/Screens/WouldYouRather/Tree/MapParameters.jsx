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
  Table,
  Popconfirm
} from "antd";
import MButton from "../../../Elements/MButton";
import Modules from "../../../Elements/Modules";
import {
  wyrTreeMapParameters,
  wyrTreeList,
  deleteMappedParameter,
  fetchAllModules,
  getAlreadyMappedParameters
} from "../../../../actions";
import "./index";

const EpisodeParameterMap = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth);

  const actionId = props.actionId;
  const technical_service_id = props.selectedTechnicalId;
  const [cardLoading, setCardLoading] = useState(false);

  const [parameters, setParameters] = useState([]);

  const [selectedParameters, setSelectedParameters] = useState([]);
  const [alreadyMappedParameters, setAlreadyMappedParameters] = useState([]);

  const [selectedModule, setSelectedModule] = useState(null);

  const [finalSelectedList, setFinalSelectedList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  //module
  const [modules, setModules] = useState([]);
  const [moduleParameters, setModuleParameters] = useState([]);

  const columns = [
    {
      title: "Module Id",
      dataIndex: "module_id",
      key: "module_id",
      width: 60
    },
    {
      title: "Module Name",
      dataIndex: "module_name",
      key: "module_name",
      width: 100
    },
    {
      title: "Parameters id",
      key: "parameters",
      // dataIndex: "parameters",
      width: 200,
      render: record => (
        <span>
          {record.parameters.map(param => {
            return <Tag key={param.parameter_id}>{param.parameter_name}</Tag>;
          })}
        </span>
      )
    },
    {
      title: "Actions",
      key: "action",
      width: 50,
      render: record => (
        <span>
          <Popconfirm
            title="Are you sure you want to delete ?"
            okText="Yes"
            cancelText="No"
            // onConfirm={() => onDeleteAddedCompetency(record)}
          >
            <Button
              type="link"
              style={{ color: "red", padding: 0, marginRight: "10px" }}
            >
              Delete
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ];

  useEffect(() => {
    const fetchAlreadyMappedList = async () => {
      setCardLoading(true);

      try {
        const moduleResponse = await fetchAllModules(user.Authorization);
        // setModules(moduleResponse);
        let extraModuleResponse = moduleResponse;
        for (let i = 0; i < extraModuleResponse.length; i++) {
          extraModuleResponse[i]["is_selected"] = false;
        }
        setModules(extraModuleResponse);
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
          module_wise_parameter: JSON.stringify(finalSelectedList)
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

  const onModuleChange = async value => {
    setSelectedModule(value);
    try {
      const response = await getAlreadyMappedParameters(
        user.Authorization,
        value
      );
      setModuleParameters(response.data.result);
    } catch (error) {}
  };

  const onParameterChange = value => {
    setParameters(value);
  };

  const onDeleteAddedCompetency = data => {
    // console.log(data);
    let module_isSelected_details = [...modules];

    for (let i = 0; i < module_isSelected_details.length; i++) {
      if (module_isSelected_details[i].id === data.module_id) {
        module_isSelected_details[i] = {
          ...module_isSelected_details[i],
          is_selected: false
        };
      }
    }
    setModules(module_isSelected_details);

    let tempList = [...finalSelectedList];

    for (let i = 0; i < tempList.length; i++) {
      if (tempList[i].module_id !== data.module_id) {
        console.log(tempList[i]);
      }
    }

    // console.log(tempList);
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
    if (
      selectedModule === null ||
      selectedModule === undefined ||
      selectedModule === " " ||
      selectedModule === ""
    ) {
      message.warning("please select Module");
      return;
    }
    if (parameters.length === 0) {
      message.warning("please select Parameter");
      return;
    }

    const moduleName = modules.find(item => {
      if (item.id === selectedModule) {
        return item;
      }
    });
    let parameter_id_list = [];
    for (let i = 0; i < parameters.length; i++) {
      const parameter_data = moduleParameters.find(item => {
        if (item.parameter_id === parameters[i]) return item;
      });
      parameter_id_list = [
        ...parameter_id_list,
        {
          parameter_id: parameters[i],
          parameter_name: parameter_data.parameter__name
        }
      ];
    }

    let module_isSelected_details = [...modules];

    for (let i = 0; i < module_isSelected_details.length; i++) {
      if (module_isSelected_details[i].id === selectedModule) {
        module_isSelected_details[i] = {
          ...module_isSelected_details[i],
          is_selected: true
        };
      }
    }
    setModules(module_isSelected_details);

    let tempList = {
      module_id: selectedModule,
      module_name: moduleName.name,
      parameters: parameter_id_list
    };
    setFinalSelectedList([...finalSelectedList, tempList]);
    // set parameter list to null
    setIsDisabled(true);
    setSelectedModule(null);

    props.form.setFieldsValue({
      module: null
    });
  };

  const addNewCategory = () => {
    setIsDisabled(false);
  };

  const filterModules = (val, option) => {
    const filteredList = modules.filter(({ name }) => {
      if (name.toLowerCase().includes(val) || option.key.includes(val)) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].id.toString() === option.key) return true;
    }
    return false;
  };

  const renderModules = () => {
    return modules.map(module => (
      <Select.Option
        key={module.id}
        value={module.id}
        disabled={module.is_selected}
      >
        {module.name}
      </Select.Option>
    ));
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
            <Button onClick={addNewCategory}>
              Add More Competencies
              <Icon
                type="plus"
                //  style={{ color: "blue", fontSize: "16px", cursor: "pointer" }}
              />
            </Button>
          </div>

          <Form onSubmit={onSubmit}>
            <div
              style={{
                border: "1px solid #999999",
                borderRadius: "5px",
                padding: "20px",
                marginBottom: "40px"
              }}
            >
              <Form.Item>
                {getFieldDecorator("module", {
                  rules: [{ required: true }]
                  //initialValue: selectedModule
                })(
                  <Select
                    placeholder="Select module(s)"
                    onChange={onModuleChange}
                    mode="default"
                    allowClear
                    showSearch
                    disabled={isDisabled === true ? true : false}
                    filterOption={(val, option) => filterModules(val, option)}
                  >
                    {renderModules()}
                  </Select>
                )}
              </Form.Item>

              {selectedModule === null ? (
                <div>Select Module to view parameters list</div>
              ) : (
                <Form.Item label="Competencies">
                  {getFieldDecorator("parameter", {
                    rules: [{ required: true }]
                    // initialValue: selectedParameters
                  })(
                    <Select
                      mode="multiple"
                      placeholder="Select a Parameter"
                      onChange={onParameterChange}
                      showSearch
                      allowClear
                      // defaultValue={selectedCategory}
                      // value={selectedCategory}
                      disabled={isDisabled === true ? true : false}
                    >
                      {moduleParameters.map(para => {
                        return (
                          <Select.Option
                            key={para.parameter_id}
                            value={para.parameter_id}
                          >
                            {para.parameter__name}
                          </Select.Option>
                        );
                      })}
                    </Select>
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
            <div style={{ textAlign: "center" }}>
              <MButton>Submit</MButton>
            </div>
          </Form>

          {/* ///////////////////////////////////////////////////////////// */}

          {finalSelectedList.length === 0 ? null : (
            <Table
              columns={columns}
              dataSource={finalSelectedList}
              rowKey={row => row.module_id}
            />
          )}
        </Card>
      </Modal>
    </div>
  );
};

export default Form.create()(EpisodeParameterMap);
