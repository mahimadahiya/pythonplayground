import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestionList, fetchMappedQuestions } from "../../../actions";
import _ from "lodash";
import { Row, Col, Card, Table, Pagination, Icon } from "antd";

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
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const comprehensionDetail = useSelector(
    state => state.comprehension.comprehensionDetail
  );
  const user = useSelector(state => state.userAuth);
  const mappedQuestions = useSelector(
    state => state.comprehension.mappedQuestions
  );
  const dispatch = useDispatch();

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const newQuestions = selectedRows.map(row => {
        return {
          id: row.id,
          text: row.text
        };
      });
      let questions_list = [...selectedQuestions, ...newQuestions];
      questions_list = _.uniqBy(questions_list, "id");
      console.log(questions_list);
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
  if (comprehensionDetail.parameters.length > 0) {
    parameters = comprehensionDetail.parameters[0].parameter_id;
  }
  if (comprehensionDetail.categories.length > 0) {
    categories = comprehensionDetail.categories[0].category_id;
  }
  useEffect(() => {
    let filters = {
      questionsparameters__parameter_id: parameters,
      questionscategories__category_id: categories
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
  }, []);
  if (mappedQuestions.length > 0 && selectedQuestions.length === 0) {
    setSelectedQuestions(mappedQuestions);
    setLoadingSelectedQuestions(false);
  }
  const questions = useSelector(state => state.question.questionsList),
    questionsCount = useSelector(state => state.question.count);
  if (questions.length > 0 && loadingQuestions) setLoadingQuestions(false);
  console.log(selectedQuestions);

  const handlePageChange = async pageNumber => {
    setLoadingQuestions(true);
    const offset = pageNumber * 10 - 10;
    await dispatch(
      fetchQuestionList(user.Authorization, {
        fields: JSON.stringify({
          questionsparameters__parameter_id: parameters,
          questionscategories__category_id: categories
        }),
        offset
      })
    );
    setLoadingQuestions(false);
    setOffset(offset);
  };

  return (
    <>
      <Row>
        <Col span={16} style={{ padding: 10, paddingLeft: 0 }}>
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
            <Pagination
              onChange={handlePageChange}
              total={questionsCount}
              current={(offset + 10) / 10}
            />
          </Card>
        </Col>

        <Col
          span={8}
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
    </>
  );
};

export default MapComprehensionQuestions;
