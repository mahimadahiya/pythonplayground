import React, { useState, useEffect } from "react";
import { Steps, Button, Card, Form, message } from "antd";
import { updateArticle, fetchArticleDetail } from "../../../actions";
import Categories from "../../Elements/Categories";
import history from "../../../history";
import { useSelector } from "react-redux";
import Parameters from "../../Elements/Parameters";
import Tags from "../../Elements/Tags";

const { Step } = Steps;

const MapCategoriesArticle = props => {
  const [current, setCurrent] = useState(0);
  const [categories, setCategories] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [tags, setTags] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(null);

  const user = useSelector(state => state.userAuth);

  useEffect(() => {
    if (props.id) {
      const fetchDetail = async () => {
        const data = await fetchArticleDetail(props.id, user.Authorization);
        console.log(data);
        let { categories, parameters, tags } = data;

        categories = categories.map(category => {
          return category.category_id;
        });

        parameters = parameters.map(parameter => {
          return parameter.parameter_id;
        });

        tags = tags.map(tag => {
          return tag.tag_id;
        });

        setCategories(categories);
        setParameters(parameters);
        setTags(tags);
        setLoaded(true);
      };
      fetchDetail();
    } else {
      setErr(true);
    }
  }, []);

  if (err) {
    return <div>No Article Id found</div>;
  }

  // async componentDidMount() {
  //   if (!this.props.comprehensionDetail) {
  //     await this.props.fetchComprehensionDetail(
  //       this.props.match.params.id,
  //       this.props.user.Authorization
  //     );
  //   }

  //   let { categories, parameters, tags } = this.props.comprehensionDetail;

  //   categories = categories.map(category => {
  //     return category.category_id;
  //   });

  //   parameters = parameters.map(parameter => {
  //     return parameter.parameter_id;
  //   });

  //   tags = tags.map(tag => {
  //     return tag.tag_id;
  //   });

  //   this.setState({
  //     categories,
  //     parameters,
  //     tags,
  //     loaded: true
  //   });
  // }

  const onChangeCategory = val => {
    let categories = [];
    categories.push(val);
    setCategories(categories);
  };

  const onChangeParameter = val => {
    let parameters = [];
    parameters.push(val);
    setParameters(parameters);
  };

  const onChangeTags = val => {
    let tags = [];
    tags.push(val);
    setTags(tags);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onSubmit = async () => {
    const values = {
      categories: JSON.stringify(categories),
      parameters: JSON.stringify(parameters),
      tags: JSON.stringify(tags)
    };
    const response = await updateArticle(props.id, user.Authorization, values);
    if (response.status === 200) {
      message.success("Article updated successfully");
    }
  };

  const renderForm = current => {
    const steps = [
      {
        title: "Categories",
        content: <Categories onChange={onChangeCategory} value={categories} />
      },
      {
        title: "Parameters",
        content: (
          <Parameters
            onChange={onChangeParameter}
            value={parameters}
            categories={categories}
          />
        )
      },
      {
        title: "Tags",
        content: (
          <Tags
            onChange={onChangeTags}
            mode="multiple"
            value={tags}
            parameters={parameters}
          />
        )
      }
    ];

    return (
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <Form>
          <div>{steps[current].content}</div>
        </Form>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={onSubmit}>
              Submit
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Card
        loading={!loaded}
        title={<div className="card-title">Map Categories</div>}
      >
        {renderForm(current)}
      </Card>
    </div>
  );
};

export default MapCategoriesArticle;
