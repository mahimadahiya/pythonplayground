import React from "react";
import { Steps, Button, Card, Form } from "antd";
import { fetchQuestionDetail, updateQuestion } from "../../../actions";
import Categories from "../../Elements/Categories";
import history from "../../../history";
import { connect } from "react-redux";
import Parameters from "../../Elements/Parameters";
import Tags from "../../Elements/Tags";

const { Step } = Steps;

class MapCategories extends React.Component {
  state = {
    current: 0,
    categories: null,
    parameters: null,
    tags: null,
    loaded: false
  };

  async componentDidMount() {
    if (!this.props.question) {
      await this.props.fetchQuestionDetail(
        this.props.match.params.id,
        this.props.user.Authorization
      );
    }

    const categories = this.props.question.categories.map(category => {
      return category.category_id;
    });

    const parameters = this.props.question.parameters.map(parameter => {
      return parameter.parameter_id;
    });

    const tags = this.props.question.tags.map(tag => {
      return tag.tag_id;
    });

    this.setState({
      categories,
      parameters,
      tags,
      loaded: true
    });
  }

  onChangeCategory = val => {
    this.setState({ categories: val });
  };

  onChangeParameter = val => {
    this.setState({ parameters: val });
  };

  onChangeTags = val => {
    this.setState({ tags: val });
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  onSubmit = async () => {
    console.log(this.state);
    const values = {
      categories: JSON.stringify(this.state.categories),
      parameters: JSON.stringify(this.state.parameters),
      tags: JSON.stringify(this.state.tags)
    };
    await this.props.updateQuestion(
      this.props.match.params.id,
      this.props.user.Authorization,
      values
    );
    history.push("/question/" + this.props.match.params.id);
  };

  renderForm = current => {
    const steps = [
      {
        title: "Categories",
        content: (
          <Categories
            onChange={this.onChangeCategory}
            mode="multiple"
            value={this.state.categories}
          />
        )
      },
      {
        title: "Parameters",
        content: (
          <Parameters
            onChange={this.onChangeParameter}
            mode="multiple"
            value={this.state.parameters}
            categories={this.state.categories}
          />
        )
      },
      {
        title: "Tags",
        content: (
          <Tags
            onChange={this.onChangeTags}
            mode="multiple"
            value={this.state.tags}
            parameters={this.state.parameters}
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
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={this.onSubmit}>
              Submit
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  };

  render() {
    const { current } = this.state;
    return (
      <div>
        <Card
          loading={!this.state.loaded}
          title={<div className="card-title">Map Categories</div>}
        >
          {this.renderForm(current)}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth,
    question: state.question.questionDetail
  };
};

export default connect(
  mapStateToProps,
  { fetchQuestionDetail, updateQuestion }
)(MapCategories);
