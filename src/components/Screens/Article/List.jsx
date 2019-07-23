import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Card, Pagination, Row, Divider, Modal, Button } from "antd";
import history from "../../../history";
import Filters from "../../Elements/Helper/Filters";
// import Categories from "../../Elements/Categories";
// import Parameters from "../../Elements/Parameters";
import { fetchArticleList } from "../../../actions/articleActions";
import ArticleCreate from "./ArticleCreate";

//TODO: Filters not working yet

const ArticleList = props => {
  // state = {
  //   loading: true,
  //   searchText: "",
  //   status: null,
  //   parameterId: [],
  //   categoryId: [],
  // };
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState();
  const [parameterId, setParameterId] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [offset, setOffset] = useState(0);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const user = useSelector(state => state.userAuth);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const result = await fetchArticleList(user.Authorization, {
        offset,
        searchText,
        fields: {}
      });
      setList(result.list);
      setCount(result.count);
      setLoading(false);
    };
    fetchList();
  }, [user, offset, searchText]);

  const onEdit = record => {
    history.push("/article/edit/" + record.id);
  };

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
      title: "Actions",
      key: "action",
      width: 360,
      render: record => (
        <span>
          <Link to={`/article/edit/${record.id}`}>Edit</Link>
          <Divider type="vertical" />
          {/* <Popconfirm
              title="Delete"
              onConfirm={() => onDelete(record.id)}
            >
              <Button type="link">Delete</Button>
            </Popconfirm> */}
          <Divider type="vertical" />
          {/* <Popconfirm
              title={record.status === 1 ? "Publish" : "Unpublish"}
              onConfirm={
                record.status === 1
                  ? () => this.onPublish(record.id)
                  : () => this.onUnpublish(record.id)
              }
            >
              <Button type="link">
                {record.status === 1 ? "Publish" : "Unpublish"}
              </Button>
            </Popconfirm> */}
        </span>
      )
    }
  ];

  // const onDelete = async id => {
  //   this.setState({ loading: true });
  //   await this.props.updateComprehension(id, this.props.user.Authorization, {
  //     flag: 0
  //   });
  //   await this.props.fetchComprehensionsList(this.props.user.Authorization, {
  //     offset: 0,
  //     fields: { comprehension_type: this.state.comprehension_type }
  //   });
  //   this.setState({ loading: false });
  // };

  // onPublish = async id => {
  //   this.setState({ loading: true });
  //   await this.props.updateComprehension(id, this.props.user.Authorization, {
  //     status: 2
  //   });
  //   await this.props.fetchComprehensionsList(this.props.user.Authorization, {
  //     offset: 0,
  //     fields: { comprehension_type: this.state.comprehension_type }
  //   });
  //   this.setState({ loading: false });
  // };

  // onUnpublish = async id => {
  //   this.setState({ loading: true });
  //   await this.props.updateComprehension(id, this.props.user.Authorization, {
  //     status: 1
  //   });
  //   await this.props.fetchComprehensionsList(this.props.user.Authorization, {
  //     offset: 0,
  //     fields: { comprehension_type: this.state.comprehension_type }
  //   });
  //   this.setState({ loading: false });
  // };

  const handlePageChange = async pageNumber => {
    const offset = pageNumber * 10 - 10;

    // const fields = {
    //   comprehensionfmarticle__fmarticle_id: this.state.articleId
    // };
    setOffset(offset);
  };

  const onSearch = e => {
    setSearchText(e.target.value);
  };

  // const onCategoryChange = value => {
  //   setCategoryId(value)
  // };

  // onParameterChange = value => {
  //   this.setState({
  //     parameterId: value
  //   });
  // };

  function clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }

  // const onFilterClick = async () => {
  //   if (this.state.comprehension_type === 2) {
  //     await this.props.fetchComprehensionsList(this.props.user.Authorization, {
  //       searchText: this.state.searchText,
  //       fields: {
  //         status: this.state.status,
  //         comprehension_type: this.state.comprehension_type,
  //         comprehensionfmarticle__fmarticle_id: this.state.articleId
  //       },
  //       offset: 0
  //     });
  //   } else {
  //     await this.props.fetchComprehensionsList(this.props.user.Authorization, {
  //       searchText: this.state.searchText,
  //       fields: {
  //         status: this.state.status,
  //         comprehension_type: this.state.comprehension_type,
  //         comprehensionparameter__parameter_id: this.state.parameterId,
  //         comprehensioncategory__category_id: this.state.categoryId
  //       },
  //       offset: 0
  //     });
  //   }
  //   this.setState({ loading: false });
  // };

  // onStatusChange = val => {
  //   this.setState({ status: val });
  // };

  const fields = [
    {
      key: "1",
      type: "input",
      label: "Search by Name or ID",
      placeholder: "Search by Name or ID",
      onChange: onSearch
    }
    // {
    //   key: "5",
    //   type: "select",
    //   label: "Status",
    //   placeholder: "Select status",
    //   onChange: this.onStatusChange,
    //   options: [
    //     {
    //       key: "all",
    //       value: null,
    //       label: "All"
    //     },
    //     {
    //       key: "live",
    //       value: 2,
    //       label: "Live"
    //     },
    //     {
    //       key: "draft",
    //       value: 1,
    //       label: "Draft"
    //     }
    //   ]
    // }
  ];

  // const onComprehensionTypeChange = async val => {
  //   await this.setState({
  //     comprehension_type: val === true ? 2 : 1,
  //     loading: true
  //   });
  //   await this.props.fetchComprehensionsList(this.props.user.Authorization, {
  //     offset: 0,
  //     fields: { comprehension_type: this.state.comprehension_type }
  //   });
  //   await this.setState({ loading: false });
  // };

  // onArticleChange = e => {
  //   this.setState({
  //     articleId: e.target.value
  //   });
  // };

  return (
    <div>
      <Card title={<div className="card-title">Filters</div>}>
        <Row>
          <Filters fields={fields} />
          {/* <Col span={8} style={{ padding: "0 24px" }}>
              <Form.Item label="Comprehension Type">
                <Switch
                  unCheckedChildren="BM"
                  checkedChildren="FM"
                  checked={this.state.comprehension_type === 2}
                  onChange={this.onComprehensionTypeChange}
                />
              </Form.Item>
            </Col> */}
        </Row>
        {/* {this.state.comprehension_type === 1 ? (
            <Row>
              <Form>
                <Col span={8} style={{ padding: "0 24px" }}>
                  <Categories
                    onChange={this.onCategoryChange}
                    mode="single"
                    value={this.state.categoryId}
                  />
                </Col>
                <Col span={8} style={{ padding: "0 24px" }}>
                  <Parameters
                    onChange={this.onParameterChange}
                    mode="single"
                    categories={[this.state.categoryId]}
                    value={this.state.parameterId}
                  />
                </Col>
              </Form>
            </Row>
          ) : (
              <Col span={8} style={{ padding: "0 24px" }}>
                <label htmlFor="article">Article ID</label>
                <Input
                  placeholder="FM Article ID"
                  name="article"
                  onChange={this.onArticleChange}
                  value={this.state.articleId}
                />
              </Col>
            )} */}

        {/* <div style={{ textAlign: "right" }}>
            <Button
              onClick={onFilterClick}
              type="primary"
              shape="round"
              size="large"
              style={{ marginTop: 10, marginRight: 10 }}
            >
              Filter
            </Button>
          </div> */}
      </Card>
      <Card
        style={{ marginTop: 20 }}
        title={<div className="card-title">Article List</div>}
      >
        <Row style={{ marginBottom: 20 }}>
          <Button
            shape="round"
            type="primary"
            onClick={() => setShowModal(true)}
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
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <Pagination onChange={handlePageChange} total={count} />
        </div>
      </Card>
      <Modal
        title="Create Article"
        visible={showModal}
        footer={null}
        onCancel={() => setShowModal(false)}
        closable={true}
        width="1000px"
      >
        <ArticleCreate />
      </Modal>
    </div>
  );
};

export default ArticleList;
