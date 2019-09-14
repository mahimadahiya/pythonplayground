import React, { useEffect, useState, forwardRef } from "react";
import { useSelector } from "react-redux";
import { fetchCourses } from "../../actions";
import { Select } from "antd";

const Courses = forwardRef((props, ref) => {
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
    <Select
      placeholder="Select a course"
      mode={props.mode}
      allowClear
      onChange={props.onChange}
    >
      {courses.length > 0 &&
        courses.map(course => (
          <Select.Option key={course.id} value={course.id}>
            {course.name}
          </Select.Option>
        ))}
    </Select>
  );
});

export default Courses;
