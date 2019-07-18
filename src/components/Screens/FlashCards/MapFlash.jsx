import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  fetchModulesFlash,
  fetchFlashCardsList,
  fetchMappedCards,
  mapFlashCards
} from "../../../actions";

import {
  Form,
  Select,
  Card,
  Row,
  Col,
  Table,
  Icon,
  Pagination,
  Switch
} from "antd";
import MButton from "../../Elements/MButton";

class UserTrackMapping extends React.Component {
  state = {
    entity_type: 1,
    entity_id: null,
    selectedFlashCards: [],
    loading: true,
    modules: [],
    loadingFlashCards: false,
    offset: 0
  };

  async componentWillMount() {
    await this.props.fetchModulesFlash(this.props.user.Authorization, 1);
    await this.props.fetchFlashCardsList(this.props.user.Authorization, {
      offset: 0,
      fields: {}
    });
    this.setState({ modules: this.props.modules });
  }

  filterModules = (val, option) => {
    const filteredList = this.state.modules.filter(({ name }) => {
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

  columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    }
  ];

  columnsSelected = [
    {
      key: "id",
      title: "ID",
      render: record => {
        return record.flash_card_id;
      }
    },
    {
      key: "title",
      title: "Title",
      render: record => {
        return record.flash_card__title;
      }
    },
    {
      key: "del",
      title: "",
      render: record => (
        <div style={{ textAlign: "center" }}>
          <Icon
            type="delete"
            theme="twoTone"
            twoToneColor="#ff0000"
            onClick={() => {
              const cards = this.state.selectedFlashCards.filter(card => {
                return card.flash_card_id !== record.flash_card_id;
              });
              this.setState({
                selectedFlashCards: cards
              });
            }}
          />
        </div>
      )
    }
  ];

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const newCards = selectedRows.map(row => {
        return {
          flash_card_id: row.id,
          flash_card__title: row.title
        };
      });
      let cards = [...this.state.selectedFlashCards, ...newCards];
      cards = _.uniqBy(cards, "flash_card_id");
      this.setState({
        selectedFlashCards: cards
      });
    },
    onSelect: (record, selected) => {
      if (!selected) {
        const cards = this.state.selectedFlashCards.filter(card => {
          return card.flash_card_id !== record.id;
        });
        this.setState({
          selectedFlashCards: cards
        });
      }
    }
  };

  handlePageChange = async pageNumber => {
    this.setState({ loadingFlashCards: true });
    const offset = pageNumber * 10 - 10;
    await this.props.fetchFlashCardsList(this.props.user.Authorization, {
      offset
    });
    this.setState({
      loadingUsers: false,
      offset
    });
  };

  onEntityTypeChange = value => {
    this.setState({ entity_type: value === true ? 2 : 1 }, async () => {
      await this.props.fetchModulesFlash(
        this.props.user.Authorization,
        this.state.entity_type
      );
      this.setState({
        modules: this.props.modules
      });
    });
  };

  onEntityChange = async value => {
    await this.setState({ entity_id: value });
    await this.props.fetchMappedCards(this.props.user.Authorization, {
      entity_id: this.state.entity_id,
      entity_type: this.state.entity_type
    });
    this.setState({
      selectedFlashCards: this.props.mappedCards
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, formProps) => {
      if (!err) {
        const flash_card_id = this.state.selectedFlashCards.map(
          card => card.flash_card_id
        );
        const values = {
          entity_type: this.state.entity_type,
          entity_id: this.state.entity_id,
          flash_card_id: JSON.stringify(flash_card_id)
        };
        await this.props.mapFlashCards(this.props.user.Authorization, values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title={<div className="card-title">Map Flash Cards</div>}>
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="Entity Type">
              <Switch
                unCheckedChildren="BM"
                checkedChildren="FM"
                onChange={this.onEntityTypeChange}
              />
            </Form.Item>
            {this.state.entity_type === 1 ? (
              <Form.Item label="Parameter ID">
                {getFieldDecorator("entity_id", {
                  rules: [
                    { required: true, message: "Parameter ID is required" }
                  ]
                })(
                  <Select
                    placeholder="Select a parameter ID"
                    showSearch
                    filterOption={this.filterModules}
                    onChange={this.onEntityChange}
                  >
                    {this.state.modules.map(module => (
                      <Select.Option key={module.id} value={module.id}>
                        {module.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            ) : (
              <Form.Item label="Course ID">
                {getFieldDecorator("entity_id", {
                  rules: [{ required: true, message: "Course ID is required" }]
                })(
                  <Select
										placeholder="Select a course ID"
										showSearch
										filterOption={this.filterModules}
                    onChange={this.onEntityChange}
                  >
                    {this.state.modules.map(module => (
                      <Select.Option key={module.id} value={module.id}>
                        {module.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            )}
            <Row>
              <Col span={16} style={{ padding: 10, paddingLeft: 0 }}>
                <Card
                  title="Flash Cards"
                  loading={this.state.loadingFlashCards}
                  bodyStyle={{ padding: "0" }}
                  headStyle={{ textAlign: "center" }}
                >
                  <Table
                    rowSelection={this.rowSelection}
                    rowKey={record => record.id}
                    columns={this.columns}
                    pagination={false}
                    dataSource={this.props.flashcard_list}
                  />
                  <Pagination
                    onChange={this.handlePageChange}
                    total={this.props.flashcard_list_count}
                    current={(this.state.offset + 10) / 10}
                  />
                </Card>
              </Col>

              <Col
                span={8}
                style={{ padding: 10, paddingRight: 0, marginBottom: 10 }}
              >
                <Card
                  title="Selected Flash Cards"
                  bodyStyle={{ padding: "0" }}
                  headStyle={{ textAlign: "center" }}
                >
                  <Table
                    rowKey={record => record.flash_card_id}
                    pagination={false}
                    columns={this.columnsSelected}
                    dataSource={this.state.selectedFlashCards}
                  />
                </Card>
              </Col>
            </Row>

            <Form.Item>
              <MButton>Map Flash Cards</MButton>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    modules: state.flashcard.modules,
    flashcard_list: state.flashcard.list,
    flashcard_list_count: state.flashcard.count,
    mappedCards: state.flashcard.mappedCards
  };
};

export default connect(
  mapStateToProps,
  {
    fetchModulesFlash,
    fetchFlashCardsList,
    fetchMappedCards,
    mapFlashCards
  }
)(Form.create()(UserTrackMapping));
