import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Card, Form, message, Select } from "antd";
import MButton from "../../../Elements/MButton";
import {
  getCourseList,
  wyrTreeList,
  wyrTreeMapParameters
} from "../../../../actions";
import "./index";

const EpisodeMapCourse = props => {
  const user = useSelector(state => state.userAuth);

  const actionId = props.actionId;
  const technical_service_id = props.selectedTechnicalId;

  const [cardLoading, setCardLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    const fetchAlreadyMappedList = async () => {
      setCardLoading(true);
      try {
        const courseData = await getCourseList(user.Authorization);
        // console.log(courseData.data.result.fm_course_list);
        setCoursesList(courseData.data.result.fm_course_list);

        const response = await wyrTreeList(
          user.Authorization,
          technical_service_id
        );
        let tempList = [];
        // console.log(response.data.result.wyr_episode_list);

        for (let i = 0; i < response.data.result.wyr_episode_list.length; i++) {
          if (response.data.result.wyr_episode_list[i].id === actionId) {
            if (
              response.data.result.wyr_episode_list[i].mapped_fm_course.length >
              0
            ) {
              for (
                let j = 0;
                j <
                response.data.result.wyr_episode_list[i].mapped_fm_course
                  .length;
                j++
              ) {
                tempList.push(
                  response.data.result.wyr_episode_list[i].mapped_fm_course[j]
                    .fm_course_id
                );
              }
            }
          }
        }
        setSelectedCourses(tempList);
        setCardLoading(false);
      } catch (error) {
        setCardLoading(false);
      }
    };
    fetchAlreadyMappedList();
  }, [user.Authorization, actionId, technical_service_id]);

  // console.log(selectedCourses);

  const renderCourses = () => {
    return coursesList.map((course, i) => {
      return (
        <Select.Option key={i} value={course.id}>
          {course.name}
        </Select.Option>
      );
    });
  };

  const onChangeCourse = values => {
    setCourses(values);
  };

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          wyr_tree_id: actionId,
          fm_course_list: JSON.stringify(formValues.course)
        };
        // console.log(values);

        setCardLoading(true);
        try {
          const response = await wyrTreeMapParameters(
            user.Authorization,
            values
          );
          props.onValuesSubmit();
          if (response.status === 200) {
            message.success("Mapped successfully");
          }
          props.setLoadAgain(!props.loadAgain);
          setCardLoading(false);
        } catch (error) {
          setCardLoading(false);
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
      <Modal
        title="Map Courses"
        visible={props.visible}
        onCancel={props.onCancel}
        destroyOnClose={true}
        footer={false}
      >
        <Card
          bodyStyle={{ padding: "0px" }}
          bordered={false}
          loading={cardLoading}
        >
          <Form onSubmit={onSubmit}>
            <Form.Item label="Courses">
              {getFieldDecorator("course", {
                rules: [{ required: true }],
                initialValue: selectedCourses
              })(
                <Select
                  placeholder="Select courses"
                  mode="default"
                  onChange={onChangeCourse}
                  filterOption={filterCourses}
                >
                  {renderCourses()}
                </Select>
              )}
            </Form.Item>

            <MButton>Submit</MButton>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default Form.create()(EpisodeMapCourse);
