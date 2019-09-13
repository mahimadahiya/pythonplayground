import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchQuestionList,
  fetchMappedQuestions,
  mapComprehensionQuestions
} from "../../../actions";
import _ from "lodash";
import {
  Row,
  Col,
  Card,
  Table,
  Pagination,
  Icon,
  Button,
  Form,
  Input
} from "antd";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Text",
    dataIndex: "text",
    key: "text"
  }
];

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

const MapComprehensionQuestions = props => {
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [loadingSelectedQuestions, setLoadingSelectedQuestions] = useState(
    true
  );
  const [offset, setOffset] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState();
  const comprehensionDetail = useSelector(
    state => state.comprehension.comprehensionDetail
  );
  const user = useSelector(state => state.userAuth);
  const mappedQuestions = useSelector(
    state => state.comprehension.mappedQuestions
  );
  const dispatch = useDispatch();

  const rowSelection = {
    selectedRowKeys: selectedQuestions
      ? selectedQuestions.map(ques => ques.id)
      : [],
    onChange: (selectedRowKeys, selectedRows) => {
      const newQuestions = selectedRows.map(row => {
        return {
          id: row.id,
          text: row.text
        };
      });
      let questions_list = [...selectedQuestions, ...newQuestions];
      questions_list = _.uniqBy(questions_list, "id");
      setSelectedQuestions(questions_list);
    },
    onSelect: (record, selected) => {
      if (!selected) {
        const questions = selectedQuestions.filter(question => {
          return question.id !== record.id;
        });
        setSelectedQuestions(questions);
      }
    }
  };

  const columnsSelected = [
    {
      key: "id",
      title: "ID",
      render: record => {
        return record.id;
      }
    },
    {
      key: "text",
      title: "Text",
      render: record => {
        return record.text;
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
              const questions = selectedQuestions.filter(question => {
                return question.id !== record.id;
              });
              setSelectedQuestions(questions);
            }}
          />
        </div>
      )
    }
  ];

  let parameters = null;
  let categories = null;
  let tags = null;
  if (comprehensionDetail.parameters.length > 0) {
    parameters = comprehensionDetail.parameters[0].parameter_id;
  }
  if (comprehensionDetail.categories.length > 0) {
    categories = comprehensionDetail.categories[0].category_id;
  }
  if (comprehensionDetail.tags.length > 0) {
    tags = comprehensionDetail.tags[0].tag_id;
  }
  useEffect(() => {
    let filters = {
      questionsparameters__parameter_id: parameters,
      questionscategories__category_id: categories,
      complexity: comprehensionDetail.comprehension.complexity,
      questionstags__tag_id: tags
    };
    clean(filters);
    dispatch(
      fetchQuestionList(user.Authorization, {
        fields: JSON.stringify(filters),
        offset: 0
      })
    );
    dispatch(
      fetchMappedQuestions(
        user.Authorization,
        comprehensionDetail.comprehension.id
      )
    );
  }, [parameters, categories, user, comprehensionDetail, tags, dispatch]);
  if (mappedQuestions && !selectedQuestions) {
    setSelectedQuestions(mappedQuestions);
    setLoadingSelectedQuestions(false);
    setLoadingQuestions(false);
  }
  const questions = useSelector(state => state.question.questionsList),
    questionsCount = useSelector(state => state.question.count);

  const handlePageChange = async pageNumber => {
    setLoadingQuestions(true);
    const offset = pageNumber * 10 - 10;
    let filters = {
      questionsparameters__parameter_id: parameters,
      questionscategories__category_id: categories,
      complexity: comprehensionDetail.comprehension.complexity,
      questionstags__tag_id: tags
    };
    clean(filters);
    dispatch(
      fetchQuestionList(user.Authorization, {
        fields: JSON.stringify(filters),
        offset
      })
    );
    setLoadingQuestions(false);
    setOffset(offset);
  };

  const onSubmit = () => {
    const question_id_list = selectedQuestions.map(question => question.id);
    dispatch(
      mapComprehensionQuestions(user.Authorization, {
        question_id_list: JSON.stringify(question_id_list),
        comprehension_id: comprehensionDetail.comprehension.id
      })
    );
  };

  const onSearch = async e => {
    setLoadingQuestions(true);
    let filters = {
      questionsparameters__parameter_id: parameters,
      questionscategories__category_id: categories,
      complexity: comprehensionDetail.comprehension.complexity,
      questionstags__tag_id: tags
    };
    clean(filters);
    await dispatch(
      fetchQuestionList(user.Authorization, {
        fields: JSON.stringify(filters),
        offset: 0,
        searchText: e.target.value
      })
    );
    setLoadingQuestions(false);
    setOffset(0);
  };

  return (
    <>
      <Form.Item label="Search Question">
        <Input onChange={onSearch} />
      </Form.Item>
      <Row>
        <Col span={12} style={{ padding: 10, paddingLeft: 0 }}>
          <Card
            title="Questions"
            loading={loadingQuestions}
            bodyStyle={{ padding: "0" }}
            headStyle={{ textAlign: "center" }}
          >
            <Table
              rowSelection={rowSelection}
              rowKey={record => record.id}
              columns={columns}
              pagination={false}
              dataSource={questions}
              style={{ marginBottom: 20 }}
            />
            <div style={{ textAlign: "right" }}>
              <Pagination
                style={{ marginBottom: 20, marginRight: 20 }}
                onChange={handlePageChange}
                total={questionsCount}
                current={(offset + 10) / 10}
              />
            </div>
          </Card>
        </Col>

        <Col
          span={12}
          style={{ padding: 10, paddingRight: 0, marginBottom: 10 }}
        >
          <Card
            title="Selected Questions"
            loading={loadingSelectedQuestions}
            bodyStyle={{ padding: "0" }}
            headStyle={{ textAlign: "center" }}
          >
            <Table
              rowKey={record => record.id}
              pagination={false}
              columns={columnsSelected}
              dataSource={selectedQuestions}
            />
          </Card>
        </Col>
      </Row>
      <div style={{ textAlign: "right" }}>
        <Button shape="round" type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default MapComprehensionQuestions;
