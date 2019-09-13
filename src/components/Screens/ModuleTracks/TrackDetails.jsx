import React from "react";
import { List, Card, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrackAssessments } from "../../../actions";
import { useState } from "react";

const renderQuestions = list => {
  return list.map(item => {
    return (
      <div key={item.question_id}>
        <List.Item>
          <b>{item.question_id} : </b>
          {item.question__text}
        </List.Item>
      </div>
    );
  });
};

const TrackDetails = props => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth);
  dispatch(fetchTrackAssessments(user.Authorization, props.match.params.id));
  const pre_assessment = useSelector(state => state.moduleTrack.pre_assessment);
  const monthly_assessment = useSelector(
    state => state.moduleTrack.monthly_assessment
  );
  if (pre_assessment !== "" && monthly_assessment !== "" && loading) {
    setLoading(false);
  }
  return (
    <Card
      loading={loading}
      title={
        <div className="card-title">{`Track ${
          props.match.params.id
        } Details`}</div>
      }
    >
      {!pre_assessment || !monthly_assessment ? (
        <div>No records found</div>
      ) : (
        <Row type="flex" justify="space-between">
          <Col span={10}>
            <List header={<b>Pre Assessment Questions</b>}>
              {renderQuestions(pre_assessment.question_details)}
            </List>
          </Col>
          <Col span={10}>
            <List header={<b>Monthly Assessment Questions</b>}>
              {renderQuestions(monthly_assessment.question_details)}
            </List>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default TrackDetails;
