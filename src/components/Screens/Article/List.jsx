import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Card,
  Pagination,
  Row,
  Divider,
  Modal,
  Button,
  Form,
  Col,
  Popconfirm,
  DatePicker
} from "antd";
import Filters from "../../Elements/Helper/Filters";
import Categories from "../../Elements/Categories";
import Parameters from "../../Elements/Parameters";
import { fetchArticleList, updateArticle, setStep } from "../../../actions";
import ArticleCreate from "./ArticleCreate";
import Complexity from "../../Elements/Complexity";
import moment from "moment";

//TODO: Filters not working yet

const ArticleList = props => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState(null);
  const [parameterId, setParameterId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [complexity, setComplexity] = useState(null);
  const [offset, setOffset] = useState(0);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [filterId, setFilterId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);
  const [type, setType] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [filter, setFilter] = useState(true);

  const user = useSelector(state => state.userAuth);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const fields = {
        articlesparameters__parameter_id: parameterId,
        articlescategories__category_id: categoryId,
        complexity,
        status,
        type,
        id: filterId,
        updated_at: createdAt ? moment(createdAt).format("YYYY-MM-DD") : null
      };
      clean(fields);
      const result = await fetchArticleList(user.Authorization, {
        offset,
        searchText,
        fields
      });
      const list = result.list.filter(item => {
        return item.flag !== 0;
      });
      setList(list);
      setCount(result.count);
      setLoading(false);
    };
    if (filter) {
      fetchList();
      setFilter(false);
    }
  }, [
    user,
    offset,
    searchText,
    filter,
    parameterId,
    categoryId,
    status,
    type,
    complexity,
    createdAt,
    filterId
  ]);

  const column = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: id => {
        return <a href={`/article/detail/${id}`}>{id}</a>;
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "60%",
      render: text => {
        return <div style={{ minHeight: "60px" }}>{text}</div>;
      }
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: date => {
        return moment(date).format("YYYY-MM-DD");
      }
    },
    {
      title: "Actions",
      key: "action",
      width: 360,
      render: record => (
        <span>
          <Button
            type="link"
            onClick={() => {
              dispatch(setStep(1));
              setId(record.id);
              setShowModal(true);
            }}
          >
            Edit
          </Button>
          <Divider type="vertical" />
          <Popconfirm title="Delete" onConfirm={() => onDelete(record.id)}>
            <Button type="link">Delete</Button>
          </Popconfirm>
          <Divider type="vertical" />
          <Popconfirm
            title={record.status === 1 ? "Publish" : "Unpublish"}
            onConfirm={
              record.status === 1
                ? () => onPublish(record.id)
                : () => onUnpublish(record.id)
            }
          >
            <Button type="link">
              {record.status === 1 ? "Publish" : "Unpublish"}
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ];

  const onDelete = async id => {
    setLoading(true);
    await updateArticle(id, user.Authorization, {
      flag: 0
    });
    setFilter(true);
  };

  const onPublish = async id => {
    setLoading(true);
    await updateArticle(id, user.Authorization, {
      status: 4
    });
    setFilter(true);
  };

  const onUnpublish = async id => {
    setLoading(true);
    await updateArticle(id, user.Authorization, {
      status: 1
    });
    setFilter(true);
  };

  const handlePageChange = async pageNumber => {
    const offset = pageNumber * 10 - 10;
    setOffset(offset);
    setFilter(true);
  };

  const onSearch = e => {
    setSearchText(e.target.value);
    setFilter(true);
  };

  const onCategoryChange = value => {
    setCategoryId(value);
    setParameterId(null);
  };

  const onParameterChange = value => {
    setParameterId(value);
  };

  const clean = obj => {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  };

  const onFilterClick = async () => {
    setFilter(true);
  };

  const onStatusChange = val => {
    setStatus(val);
  };

  const onSearchID = e => {
    setFilterId(e.target.value);
  };

  const onTypeChange = val => {
    setType(val);
  };

  const onComplexityChange = val => {
    setComplexity(val);
  };

  const onSelectDate = val => {
    setCreatedAt(val);
  };

  const fields = [
    {
      key: "1",
      type: "input",
      label: "Search by Name or ID",
      placeholder: "Search by Name or ID",
      onChange: onSearch
    },
    {
      key: "id",
      type: "input",
      label: "Search by ID",
      placeholder: "Search by ID",
      onChange: onSearchID
    },
    {
      key: "2",
      type: "select",
      label: "Status",
      placeholder: "Select status",
      onChange: onStatusChange,
      options: [
        {
          key: "all",
          value: null,
          label: "All"
        },
        {
          key: "live",
          value: 4,
          label: "Live"
        },
        {
          key: "draft",
          value: 1,
          label: "Draft"
        }
      ]
    },
    {
      key: "3",
      type: "select",
      label: "Article Type",
      placeholder: "Select Article Type",
      onChange: onTypeChange,
      options: [
        {
          key: "all",
          value: null,
          label: "All"
        },
        {
          key: "image",
          value: "image",
          label: "Image"
        },
        {
          key: "audio",
          value: "audio",
          label: "Audio"
        },
        {
          key: "video",
          value: "video",
          label: "Video"
        },
        {
          key: "html",
          value: "html",
          label: "HTML"
        }
      ]
    }
  ];

  const onCloseModal = () => {
    setShowModal(false);
    setFilter(true);
  };
  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Card title={<div className="card-title">Filters</div>}>
        <Row>
          <Filters fields={fields} />
        </Row>
        <Row>
          <Form>
            <Col span={8} style={{ padding: "0 24px" }}>
              <Form.Item label="Created At">
                {getFieldDecorator("created_at", { initalValue: createdAt })(
                  <DatePicker onChange={onSelectDate} />
                )}
              </Form.Item>
            </Col>
            <Col span={8} style={{ padding: "0 24px" }}>
              <Form.Item label="Complexity">
                {getFieldDecorator("complexity", { initalValue: complexity })(
                  <Complexity onChange={onComplexityChange} mode="single" />
                )}
              </Form.Item>
            </Col>
            <Col span={8} style={{ padding: "0 24px" }}>
              <Form.Item label="Categories">
                {getFieldDecorator("categories", { initalValue: categoryId })(
                  <Categories onChange={onCategoryChange} mode="single" />
                )}
              </Form.Item>
            </Col>
            <Col span={8} style={{ padding: "0 24px" }}>
              <Form.Item label="Parameters">
                {getFieldDecorator("parameter", { initalValue: parameterId })(
                  <Parameters
                    onChange={onParameterChange}
                    mode="single"
                    categories={[categoryId]}
                  />
                )}
              </Form.Item>
            </Col>
          </Form>
        </Row>

        <div style={{ textAlign: "right" }}>
          <Button
            onClick={onFilterClick}
            type="primary"
            shape="round"
            size="large"
            style={{ marginTop: 10, marginRight: 10 }}
          >
            Filter
          </Button>
        </div>
      </Card>
      <Card
        style={{ marginTop: 20 }}
        title={<div className="card-title">Article List</div>}
      >
        <Row style={{ marginBottom: 20 }}>
          <Button
            shape="round"
            type="primary"
            onClick={() => {
              dispatch(setStep(0));
              setShowModal(true);
            }}
          >
            Create Article
          </Button>
        </Row>
        <Row>
          <Table
            loading={loading}
            dataSource={list}
            columns={column}
            rowKey={row => row.id}
            pagination={false}
          />
        </Row>
        {/* <div style={{ marginTop: "20px", textAlign: "right" }}>
          <Pagination onChange={handlePageChange} total={count} />
        </div> */}
        <div style={{ marginTop: "20px" }}>
          Showing {offset + 1}-{offset + 10} results from {count} records
          <span style={{ textAlign: "right" }}>
            <Pagination
              current={(offset + 10) / 10}
              onChange={handlePageChange}
              total={count}
            />
          </span>
        </div>
      </Card>
      <Modal
        title="Create Article"
        visible={showModal}
        footer={null}
        destroyOnClose={true}
        onCancel={onCloseModal}
        closable={true}
        width="1000px"
      >
        <ArticleCreate id={id} />
      </Modal>
    </div>
  );
};
export default Form.create()(ArticleList);
