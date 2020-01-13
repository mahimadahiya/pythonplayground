import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Card, Form, message, Select } from "antd";
import MButton from "../../Elements/MButton";
import {
  mapRolePlayParameters,
  getChapterList,
  rolePlayArticleParametersList,
  deleteRolePlayMappedParameterAndChapter
} from "../../../actions";
import "./index.css";

const MapRolePlayChaptersModal = props => {
  const user = useSelector(state => state.userAuth);

  const rp_article_id = props.rpArticleId;

  const [cardLoading, setCardLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState([]);

  const [mappedChapterDetailList, setMappedChapterDetailList] = useState([]);

  useEffect(() => {
    const fetchAlreadyMappedList = async () => {
      setCardLoading(true);
      try {
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

        const chapterResponse = await getChapterList(user.Authorization);
        //  console.log(chapterResponse.data.result);
        setChapters(chapterResponse.data.result.chapter_list);
        setCardLoading(false);
      } catch (error) {
        setCardLoading(false);
      }
    };
    fetchAlreadyMappedList();
  }, [user.Authorization, rp_article_id]);

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

  const onChapterChange = value => {
    // setChapters(value);
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
          loading={cardLoading}
        >
          <Form onSubmit={onSubmit}>
            {/* <Form.Item label="Modules">
          {getFieldDecorator("module_id", { rules: [{ required: true }] } )(
            <Modules  onChange={moduleChange}  />
            )}
        </Form.Item> */}
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
                  //onChange={onChapterChange}
                >
                  {renderChapterOptions(chapters)}
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

export default Form.create()(MapRolePlayChaptersModal);
