import React, { Component } from "react";
import {
	Card,
	Form,
	Input,
	Row,
	Col,
	Icon,
	Switch,
	Select,
	message,
	Button,
	Upload
} from "antd";
import MButton from "../../../Elements/MButton";
import { addFlashCard } from "../../../../actions";
import { connect } from "react-redux";
import history from "../../../../history";

class Add extends Component {
	state = {
		entity_type: 1,
		entity_id: null,
		icon_url: null,
		content_data: [
			{
				title: '',
				description: '',
				icon_url: ''
			}
		]
	};

	

	uploadProps = {
		name: "file",
		data: { folder_name: "choice_media/images/" },

		action: "https://pylearning-api.iaugmentor.com/file_upload/",
		headers: {
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMtYXBpLmlhdWdtZW50b3IuY29tL3YxL2F1dGgvc2lnbmluIiwianRpIjoiNmM2OWU2Nzk0NzFmM2RjNmE2OTA1MTc1ZTNlYmU4NTQiLCJleHAiOjE1OTE2OTQzOTEsImlhdCI6MTU2MDEzODU5MSwibmJmIjoxNTYwMTM4NTkxfQ.L1vLFQIhdtW0U1wMlOAkNrjDUOL7zE0Glc2ogRbXhBY",
			key: "TcS99L07QkDezB5n4Qdw"
		},
		accept: ".png,.jpg"
	};

	onUploadChangeContentIcons = (i, info) => {
		if (info.file.status !== "uploading") {
		}
		if (info.file.status === "done") {
			message.success(`${info.file.name} file uploaded successfully`);
			let content_data = [...this.state.content_data];
			content_data[i] = {
				...content_data[i],
				icon_url: info.file.response.url
			};
			this.setState({
				content_data
			});
		} else if (info.file.status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	};

	onUploadChangeIcon = (info) => {
		if (info.file.status !== "uploading") {
		}
		if (info.file.status === "done") {
			message.success(`${info.file.name} file uploaded successfully`);
			this.setState({
				icon_url: info.file.response.url
			});
		} else if (info.file.status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	};

	createContentData = () => {
		return this.state.content_data.map((col, i) => {
			return (
				<div key={i} style={{ marginBottom: 15 }}>
					<Row>
						<Col span={2} style={{ fontSize: 18 }}>
							{this.state.content_data[i].id}
						</Col>
						<Col span={2}>
							<Switch
								unCheckedChildren="Text"
								checkedChildren="Image"
								onChange={value => this.onTypeChange(value, i)}
							/>
						</Col>
						<Col span={18}>
						
									<Upload
										{...this.uploadProps}
										onChange={info => this.onUploadChangeContentIcons(i, info)}
									>
										<Button>
											<Icon type="upload" /> Click to Upload
                  </Button>
									</Upload>
							
						</Col>
						<Col span={2} style={{ paddingLeft: 15 }}>
							<Icon
								type="minus-circle"
								onClick={() => this.onDelete(col.id)}
								theme="twoTone"
								twoToneColor="red"
								style={{ fontSize: 35 }}
							/>
						</Col>
					</Row>
				</div>
			);
		});
	};

	
	

	onEntityTypeChange = value => {
		this.setState({
			entity_type: value === true ? 2 : 1
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<React.Fragment>
				<Card title={<div className="card-title">Add Flash Card</div>}>
					<Form onSubmit={this.onSubmit}>
						<Form.Item label="title">
							{getFieldDecorator("title", {
								rules: [{ required: true, message: "Please enter title" }]
							})(<Input placeholder="Enter title" size="large" />)}
						</Form.Item>
						<Form.Item label="Entity Type">
							<Switch
								unCheckedChildren="BM"
								checkedChildren="FM"
								onChange={this.onEntityTypeChange}
							/>
						</Form.Item>
						{this.state.entity_type === 1 ? (
							<Form.Item label="Parameter ID">
								{getFieldDecorator("entity_id", {
									rules: [{ required: true, message: "Enter Parameter ID" }]
								})(
									<Input
										placeholder="Enter Parameter ID"
										type="number"
										size="large"
									/>
								)}
							</Form.Item>
						) : (
								<Form.Item label="Course ID">
									{getFieldDecorator("entity_id", {
										rules: [{ required: true, message: "Enter Course ID" }]
									})(
										<Input
											placeholder="Enter Course ID"
											type="number"
											size="large"
										/>
									)}
								</Form.Item>
							)}
							<Form.Item label="Upload Icon">
							<Upload
								{...this.uploadProps}
								onChange={this.onUploadChangeIcon}
							>
								<Button>
									<Icon type="upload" /> Click to Upload
                  </Button>
							</Upload>
							</Form.Item>
						<Row>
							<Col span={22}>
								<Form.Item label="Column 1">{this.createColumn1()}</Form.Item>
							</Col>
							<Col span={2}>
								<div onClick={this.onAddChoice} style={{ marginTop: 40 }}>
									<Icon
										type="plus-circle"
										theme="twoTone"
										style={{ marginLeft: 15, fontSize: 35 }}
									/>
								</div>
							</Col>
						</Row>
						<Row>
							<Col span={22}>
								<Form.Item label="Column 2">{this.createColumn2()}</Form.Item>
							</Col>
							<Col span={2}>
								<div onClick={this.onAddChoice2} style={{ marginTop: 40 }}>
									<Icon
										type="plus-circle"
										theme="twoTone"
										style={{ marginLeft: 15, fontSize: 35 }}
									/>
								</div>
							</Col>
						</Row>
						<Form.Item label="Match">{this.createAnswers()}</Form.Item>
						<MButton>Add</MButton>
					</Form>
				</Card>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.userAuth
	};
};

export default connect(
	mapStateToProps,
	{ addMTF }
)(Form.create()(Add));
