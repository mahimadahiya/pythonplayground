import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Card, Form, message, Select } from "antd";
import MButton from "../../../Elements/MButton";
import {
  wyrActionMapParameters,
  wyrActionList,
  fetchFMCourses
} from "../../../../actions";
import "./index";

const ActionMapCourses = props => {
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
        const data = await fetchFMCourses(user.Authorization);
        setCoursesList(data.result.fm_course_list);

        const response = await wyrActionList(
          user.Authorization,
          technical_service_id
        );
        let tempList = [];

        for (let i = 0; i < response.result.wyr_action_list.length; i++) {
          if (response.result.wyr_action_list[i].id === actionId) {
            if (
              response.result.wyr_action_list[i].mapped_fm_course.length > 0
            ) {
              for (
                let j = 0;
                j < response.result.wyr_action_list[i].mapped_fm_course.length;
                j++
              ) {
                tempList.push(
                  response.result.wyr_action_list[i].mapped_fm_course[j]
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
          wyr_action_id: actionId,
          fm_course_id_list: JSON.stringify(formValues.course)
        };

        setCardLoading(true);
        try {
          const response = await wyrActionMapParameters(
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
    console.log(option);
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
                  mode="multiple"
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

export default Form.create()(ActionMapCourses);
