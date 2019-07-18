import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import adminPanelApi from "../../../apis/adminPanel";
import { fetchComprehensionDetail } from "../../../actions/comprehensionActions";

export const useFetchComprehensionDetail = id => {
  const user = useSelector(state => state.userAuth);
  const comprehension = useSelector(state => state.comprehension.comprehensionDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComprehensionDetail(id, user.Authorization));
    return (() => {console.log("unmount")})
  }, [user.Authorization, id]);
  return comprehension;
};
