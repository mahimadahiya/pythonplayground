import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCourses } from "../../actions";
import { Select, Form } from "antd";

const Courses = props => {
  const user = useSelector(state => state.userAuth);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCourses(user.Authorization);
      setCourses(data);
    };
    fetchData();
  }, [user]);
  return (
    <div>
      <Form.Item label="Course">
        {props.form.getFieldDecorator("course", {
          rules: [{ required: true, message: "Course is required" }],
          initialValue: props.value
        })(
          <Select
            placeholder="Select a course"
            mode={props.mode}
            onChange={props.onChange}
          >
            {courses.length > 0 &&
              courses.map(course => (
                <Select.Option key={course.id} value={course.id}>
                  {course.name}
                </Select.Option>
              ))}
          </Select>
        )}
      </Form.Item>
    </div>
  );
};

export default Form.create()(Courses);
