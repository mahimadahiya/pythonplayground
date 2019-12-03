import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";
import { async } from "q";

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

export const getTechnicalAssesmentList = async (AuthToken, search) => {
  const response = await adminPanelApi(AuthToken).get(
    "/v1/admin/technical/assessment/group/",
    {
      params: {
        search
      }
    }
  );
  return response;
};

export const createNewTechnicalService = async (AuthToken, values) => {
  const response = await adminPanelApi(AuthToken).post(
    "/v1/admin/technical/assessment/group/",
    qs.stringify({
      fields: JSON.stringify(values)
    })
  );
  return response;
};

export const editTechnicalAssesment = async (id, AuthToken, values) => {
  clean(values);
  const response = await adminPanelApi(AuthToken).put(
    `/v1/admin/technical/assessment/group/${id}/`,
    qs.stringify(values)
  );
  return response;
};

export const deleteTechnicalAssesment = async (id, AuthToken) => {
  const response = await adminPanelApi(AuthToken).delete(
    `/v1/admin/technical/assessment/group/${id}/`
  );
  return response;
};

/* organisation assesment starts*/

export const getOrgnizationAssesmentDetails = async (
  organization_assessment_group_id,
  AuthToken,
  search
) => {
  const response = await adminPanelApi(AuthToken).get(
    `/v1/admin/technical/assessment/`,
    {
      params: {
        organization_assessment_group_id,
        search
      }
    }
  );
  return response;
};

export const createNewOrganizationAssesment = async (AuthToken, values) => {
  const response = await adminPanelApi(AuthToken).post(
    "/v1/admin/technical/assessment/",
    qs.stringify({
      fields: JSON.stringify(values)
    })
  );
  return response;
};

export const updateOrganizationAssesment = async (id, AuthToken, values) => {
  const response = await adminPanelApi(AuthToken).get(
    `/v1/admin/technical/assessment/${id}/`,
    qs.stringify(values)
  );
  return response;
};

/* organisation assesment ends*/
