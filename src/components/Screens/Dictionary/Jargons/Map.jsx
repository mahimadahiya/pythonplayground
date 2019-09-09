import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Select, message } from "antd";
import Parameters from "../../../Elements/Parameters";
import MButton from "../../../Elements/MButton";
import { mapJargon, fetchFMCourses } from "../../../../actions";

const MapJargon = props => {
  const [type, setType] = useState("parameter");
  const [parameters, setParameters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const user = useSelector(state => state.userAuth);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await fetchFMCourses(user.Authorization);
      setCoursesList(data.result.fm_course_list);
    };
    fetchCourses();
  }, [user.Authorization]);

  const renderCourses = () => {
    return coursesList.map(course => {
      return (
        <Select.Option key={course.id} value={course.id}>
          {course.name}
        </Select.Option>
      );
    });
  };

  const onSelect = value => {
    setType(value);
  };

  const onChangeParameter = values => {
    setParameters(values);
  };

  const onChangeCourse = values => {
    setCourses(values);
  };

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async err => {
      if (!err) {
        let data = {
          jargon_id: props.id
        };
        if (type === "parameter") {
          data = { ...data, parameter_list: JSON.stringify(parameters) };
        } else {
          data = { ...data, fm_course_list: JSON.stringify(courses) };
        }

        try {
          await mapJargon(user.Authorization, data);
          message.success("Mapped successfully");
          props.onCloseMapModal();
        } catch (err) {
          console.log(err);
          message.error("Something went wrong");
        }
      }
    });
  };

  const filterCourses = (val, option) => {
    const filteredList = courses.filter(({ name }) => {
      if (name.toLowerCase().includes(val) || option.key.includes(val)) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < filteredList.length; i++) {
      if (filteredList[i].id.toString() === option.key) return true;
    }
    return false;
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Item label="Map to">
          <Select defaultValue="parameter" onChange={onSelect}>
            <Select.Option key="parameter">Parameter</Select.Option>
            <Select.Option key="course">Course</Select.Option>
          </Select>
        </Form.Item>
        {type === "parameter" ? (
          <Form.Item label="Parameter">
            {getFieldDecorator("parameter", { rules: [{ required: true }] })(
              <Parameters
                onChange={onChangeParameter}
                categories={[]}
                mode="multiple"
              />
            )}
          </Form.Item>
        ) : (
          <Form.Item label="Courses">
            {getFieldDecorator("course", { rules: [{ required: true }] })(
              <Select
                mode="multiple"
                onChange={onChangeCourse}
                filterOption={filterCourses}
              >
                {renderCourses()}
              </Select>
            )}
          </Form.Item>
        )}
        <MButton>Map</MButton>
      </Form>
    </div>
  );
};

export default Form.create()(MapJargon);
