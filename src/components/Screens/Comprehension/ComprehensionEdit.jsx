import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card, Row, Col } from "antd";
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
		return (
			<>
				<Card title={<div className="card-title">Edit Comprehension</div>}>
					<Form onSubmit={this.onSubmit}>
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

export default connect()(ComprehensionEdit);
