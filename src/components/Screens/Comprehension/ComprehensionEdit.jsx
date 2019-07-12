import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card, Row, Col, Input } from "antd";
import Complexity from "../../Elements/Complexity";
import Gender from "../../Elements/Gender";

class ComprehensionEdit extends Component {
	onSubmit = e => {
		e.preventDefault();
	};

	onChangeComplexity = val => {
		console.log(val);
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<>
				<Card title={<div className="card-title">Edit Comprehension</div>}>
					<Form onSubmit={this.onSubmit}>
						<Form.Item label="Name">
							{getFieldDecorator("name", {
								rules: [{ required: true, message: "Name is required" }]
							})(<Input placeholder="Name" />)}
						</Form.Item>
						<Row gutter={48}>
							<Col span={8}>
								<Complexity onChange={this.onChangeComplexity} />
							</Col>
							<Col span={8}>
								<Gender onChange={this.onChangeGender} />
							</Col>
						</Row>
					</Form>
				</Card>
			</>
		);
	}
}

export default connect()(Form.create()(ComprehensionEdit));
