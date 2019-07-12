import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "antd";
import Complexity from "../../Elements/Complexity";

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
				<Form onSubmit={this.onSubmit}>
					<Complexity onChange={this.onChangeComplexity} value="" />
				</Form>
			</>
		);
	}
}

export default connect()(ComprehensionEdit);
