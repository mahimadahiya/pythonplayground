import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Card, Form, message, Select, Tooltip, Spin } from "antd";
import MButton from "../../Elements/MButton";
import {
  mapRolePlayParameters,
  getChapterList,
  rolePlayArticleParametersList,
  deleteRolePlayMappedParameterAndChapter,
  getCourseList
} from "../../../actions";
import "./index.css";

const MapRolePlayChaptersModal = props => {
  const user = useSelector(state => state.userAuth);

  const rp_article_id = props.rpArticleId;

  const [cardLoading, setCardLoading] = useState(false);
  const [loadAgain, setLoadAgain] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [courseId, setCourseId] = useState([]);

  const [mappedChapterDetailList, setMappedChapterDetailList] = useState([]);
  const [parameterSelectDisabled, setParameterSelectDisabled] = useState(true);

  useEffect(() => {
    const fetchAlreadyMappedList = async () => {
      setCardLoading(true);
      try {
        const courseData = await getCourseList(user.Authorization);
        setCourseList(courseData.data.result.fm_course_list);

        const response = await rolePlayArticleParametersList(
          user.Authorization,
          rp_article_id
        );
        setMappedChapterDetailList(response);
        let tempList = [];
        for (let i = 0; i < response.length; i++) {
          tempList.push(response[i].chapter);
        }
        // console.log(response);
        setSelectedChapters(tempList);

        if (courseId.length === 0) {
          const chapterResponseTemp = await getChapterList(user.Authorization);

          setChapters(chapterResponseTemp.data.result.chapter_list);
        } else {
          let tempListForChapterResponse = [];
          let finalListForChapter = [];
          for (let i = 0; i < courseId.length; i++) {
            tempListForChapterResponse[i] = await getChapterList(
              user.Authorization,
              courseId[i]
            );
            // console.log(tempListForChapterResponse[i].data.result);
            for (
              let j = 0;
              j < tempListForChapterResponse[i].data.result.chapter_list.length;
              j++
            ) {
              finalListForChapter.push(
                tempListForChapterResponse[i].data.result.chapter_list[j]
              );
            }
          }

          // console.log(finalListForChapter);
          setChapters(finalListForChapter);
        }

        setCardLoading(false);
      } catch (error) {
        setCardLoading(false);
      }
    };
    fetchAlreadyMappedList();
  }, [user.Authorization, rp_article_id, loadAgain]);

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formValues) => {
      if (!err) {
        const values = {
          rp_article_id: rp_article_id,
          // parameter_id_list: JSON.stringify(parameters)
          chapter_id_list: JSON.stringify(formValues.chapter)
        };

        setCardLoading(true);
        try {
          const response = await mapRolePlayParameters(
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

  const renderChapterOptions = chapters => {
    return chapters.map(chapters => {
      return (
        <Select.Option key={chapters.id} value={chapters.id}>
          {chapters.name}
        </Select.Option>
      );
    });
  };

  const renderCourses = () => {
    return courseList.map((course, i) => {
      return (
        <Select.Option key={i} value={course.id}>
          {course.name}
        </Select.Option>
      );
    });
  };

  const onChapterChange = value => {
    // setChapters(value);
  };

  const onChangeCourse = value => {
    setCourseId(value);
    setLoadAgain(!loadAgain);
    setParameterSelectDisabled(false);
    if (value.length === 0) {
      setParameterSelectDisabled(true);
    }
  };

  const filterCourses = (val, option) => {
    const filteredList = courseId.filter(({ name }) => {
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

  const onDeletingAlreadyMappedChapter = async e => {
    //console.log(e);

    let temp_detail_list = mappedChapterDetailList.find(Item => {
      if (Item.chapter === e) {
        return Item;
      }
    });
    //console.log(temp_detail_list.id);
    try {
      await deleteRolePlayMappedParameterAndChapter(
        user.Authorization,
        temp_detail_list.id
      );
    } catch (error) {}
  };

  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Modal
        title="Map Chapters"
        visible={props.visible}
        onCancel={props.onCancel}
        destroyOnClose={true}
        footer={false}
      >
        <Card
          bodyStyle={{ padding: "0px" }}
          bordered={false}
          //loading={cardLoading}
        >
          <Form onSubmit={onSubmit}>
            {/* <Form.Item label="Modules">
          {getFieldDecorator("module_id", { rules: [{ required: true }] } )(
            <Modules  onChange={moduleChange}  />
            )}
        </Form.Item> */}

            <Form.Item label="Courses">
              {getFieldDecorator("course", {
                rules: [{ required: true }]
              })(
                <Select
                  placeholder="Select courses"
                  mode="multiple"
                  onChange={onChangeCourse}
                  //filterOption={filterCourses}
                >
                  {renderCourses()}
                </Select>
              )}
            </Form.Item>
            <Spin spinning={cardLoading}>
              <Form.Item label="Chapters">
                {getFieldDecorator("chapter", {
                  rules: [{ required: true }],
                  initialValue: selectedChapters
                })(
                  <Select
                    placeholder="Select Chapter"
                    style={{ width: "100%" }}
                    mode="multiple"
                    onDeselect={onDeletingAlreadyMappedChapter}
                    // loading={cardLoading}
                    disabled={parameterSelectDisabled}
                    //onChange={onChapterChange}
                  >
                    {renderChapterOptions(chapters)}
                  </Select>
                )}
              </Form.Item>
            </Spin>

            <MButton>Submit</MButton>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default Form.create()(MapRolePlayChaptersModal);
