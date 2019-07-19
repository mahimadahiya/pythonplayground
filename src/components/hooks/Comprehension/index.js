import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchComprehensionDetail,
  fetchMappedQuestions
} from "../../../actions/comprehensionActions";

export const useFetchComprehensionDetail = id => {
  const user = useSelector(state => state.userAuth);
  const comprehension = useSelector(
    state => state.comprehension.comprehensionDetail
  );
  const mappedQuestions = useSelector(
    state => state.comprehension.mappedQuestions
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComprehensionDetail(id, user.Authorization));
    if (comprehension) {
      dispatch(
        fetchMappedQuestions(user.Authorization, comprehension.comprehension.id)
      );
    }
  }, [dispatch, id, user, comprehension]);
  return { comprehension, mappedQuestions };
};
