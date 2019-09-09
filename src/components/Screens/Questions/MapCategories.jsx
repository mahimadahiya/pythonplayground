import React from "react";
import { Steps, Button, Card, Form, message } from "antd";
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
    categories: [],
    parameters: [],
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
    let categories = [];
    categories.push(val);
    this.setState({ categories });
  };

  onChangeParameter = val => {
    let parameters = [];
    parameters.push(val);
    this.setState({ parameters });
  };

  onChangeTags = val => {
    let tags = [];
    tags.push(val);
    this.setState({ tags });
  };
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  onSubmit = () => {
    this.props.form.validateFields(async (err, formProps) => {
      if (!err) {
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
        message.success("Mapped successfully");
        history.push("/question/" + this.props.match.params.id);
      } else {
        message.error("Please fill the required fields");
      }
    });
  };

  renderForm = current => {
    const { getFieldDecorator } = this.props.form;
    const steps = [
      {
        title: "Categories",
        content: (
          <Form.Item label="Categories">
            {getFieldDecorator("category", {
              rules: [{ required: true }],
              initialValue: this.state.categories
            })(<Categories onChange={this.onChangeCategory} />)}
          </Form.Item>
        )
      },
      {
        title: "Parameters",
        content: (
          <Form.Item label="Parameters">
            {getFieldDecorator("parameter", {
              rules: [{ required: true }],
              initialValue: this.state.parameters
            })(
              <Parameters
                onChange={this.onChangeParameter}
                categories={this.state.categories}
              />
            )}
          </Form.Item>
        )
      },
      {
        title: "Tags",
        content: (
          <Form.Item label="Tags">
            {getFieldDecorator("tag", {
              rules: [{ required: true }],
              initialValue: this.state.tags
            })(
              <Tags
                onChange={this.onChangeTags}
                parameters={this.state.parameters}
              />
            )}
          </Form.Item>
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
        <Form onSubmit={this.onSubmit}>
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
)(Form.create()(MapCategories));
