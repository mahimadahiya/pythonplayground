import React from "react";
import { Form, Select } from "antd";

const Gender = props => {
	return (
		<>
			<Form.Item label="Gender">
				<Select
					placeholder="Select a gender"
					onChange={props.onChange}
					value={props.value}
				>
					<Select.Option value="m">Male</Select.Option>
					<Select.Option value="f">Female</Select.Option>
				</Select>
			</Form.Item>
		</>
	);
};

export default Gender;
