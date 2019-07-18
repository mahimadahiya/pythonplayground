import React from "react";
import { Steps, Button, Card, Form, Modal } from "antd";
import {
  updateComprehension,
  fetchComprehensionDetail
} from "../../../actions";
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
    tags: [],
    loaded: false,
    addQuestionModal: false
  };

  async componentDidMount() {
    if (!this.props.comprehensionDetail) {
      await this.props.fetchComprehensionDetail(
        this.props.match.params.id,
        this.props.user.Authorization
      );
    }

    let { categories, parameters, tags } = this.props.comprehensionDetail;

    categories = categories.map(category => {
      return category.category_id;
    });

    parameters = parameters.map(parameter => {
      return parameter.parameter_id;
    });

    tags = tags.map(tag => {
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
    const values = {
      categories: JSON.stringify(this.state.categories),
      parameters: JSON.stringify(this.state.parameters),
      tags: JSON.stringify(this.state.tags)
    };
    await this.props.updateComprehension(
      this.props.match.params.id,
      this.props.user.Authorization,
      values
    );
    history.push("/comprehension");
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
            <div>
              <Button type="primary" onClick={this.onSubmit}>
                Submit
              </Button>
            </div>
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
    comprehensionDetail: state.comprehension.comprehensionDetail
  };
};

export default connect(
  mapStateToProps,
  { updateComprehension, fetchComprehensionDetail }
)(MapCategories);
