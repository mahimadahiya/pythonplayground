import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getTechnicalAssesmentList } from "../../../actions";

const TechnicalAssesmentIndex = () => {
  const user = useSelector(state => state.userAuth);
  const AuthToken = user.Authorization;

  useEffect(() => {
    const callTechAssListApi = async () => {
      const response = await getTechnicalAssesmentList(AuthToken);
      console.log(response.data.result);
    };
    callTechAssListApi();
  }, []);

  return <div>Tech Assesment</div>;
};

export default TechnicalAssesmentIndex;
