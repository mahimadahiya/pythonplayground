import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComprehensionDetail } from "../../../actions/comprehensionActions";

export const useFetchComprehensionDetail = id => {
  const user = useSelector(state => state.userAuth);
  const comprehension = useSelector(
    state => state.comprehension.comprehensionDetail
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComprehensionDetail(id, user.Authorization));
    return () => {
      console.log("unmount");
    };
  }, [dispatch, id, user]);
  return comprehension;
};
