import pyLearningApi from "../apis/pylearning";

import qs from "querystring";
import * as ACTION_TYPE from "./actionTypes";
import history from "../history";
import {
  getOrganizationModules,
  fetchOrganizationBatches,
  fetchOrganizationTracks,
  fetchOrganizations,
  clearModules,
  fetchUsers
} from "./organizationActions";
import { loginUser, logoutUser } from "./authActions";
import {
  fetchQuestionList,
  fetchQuestionDetail,
  updateQuestion,
  createQuestion
} from "./question";
import {
  createSimulationOrgMapping,
  fetchModuleSimulations,
  fetchSimulationList,
  fetchSimulation,
  fetchDefaultModuleSimulations,
  clearSimulations
} from "./simulationActions";

import { fetchDonDonList, fetchDonDonDetails } from "./dondonActions";
import {
  fetchMagicphraseList,
  fetchMagicphraseDetails
} from "./magicPhraseActions";

import { fetchRegions, fetchStates } from "./regionActions";

import { fetchContentComplexityLevel } from "./contentActions";
import { fetchCategories, fetchParameters, fetchTags } from "./categoryActions";
import { addMTF, fetchMTFList, editMTF, fetchMTFDetails } from "./mtfActions";
import {
  addQuad,
  fetchQuadList,
  editQuad,
  fetchQuadDetails
} from "./quadActions";

import {
  fetchComprehensionsList,
  addComprehension,
  updateComprehension,
  fetchComprehensionDetail,
  fetchAllComprehensions,
  fetchMappedQuestions,
  mapComprehensionQuestions
} from "./comprehensionActions";

import {
  fetchFlashCardsList,
  addFlashCard,
  deleteFlashCard,
  fetchFlashDetails,
  editFlashCard,
  fetchModulesFlash,
  fetchMappedCards,
  mapFlashCards
} from "./flashActions";

import {
  fetchArticleList,
  fetchAllArticles,
  fetchArticleDetail,
  updateArticle,
  addArticle,
  setStep
} from "./articleActions";
import {
  fetchOrganizationList,
  fetchOrganizationDetails,
  fetchCourses,
  fetchIndustries,
  createOrganization,
  fetchAllOrganizations
} from "./adminOrganizationActions";
import adminPanelApi from "../apis/adminPanel";

import {
  fetchCategoryList,
  fetchCategoryDetails,
  createCategory,
  deleteCategory,
  fetchParameterList,
  createParameter,
  editParameter,
  deleteParameter,
  fetchParameterDetails,
  createTag,
  deleteTag,
  fetchTagDetails,
  editTag,
  createModule,
  fetchTagList,
  createService
} from "./masterActions";

import {
  mapModuleParameter,
  mapOrganizationService,
  mapServiceModule,
  getAlreadyMappedParameters,
  getAlreadyMappedServices,
  getAlreadyMappedModuleServices
} from "./mappingActions";

import {
  fetchModules,
  createModuleMap,
  fetchAllModules
} from "./moduleActions";

import {
  fetchTraitsList,
  createTrait,
  fetchQuestionBankList,
  fetchTraitsQuestionsList,
  mapTrait,
  fetchOptionsList,
  createOption,
  mapOption
} from "./psychometricActions";

import { fetchAllServices, createServiceMap } from "./serviceActions";

import {
  fetchJargonList,
  createJargon,
  fetchKeywordsList,
  deleteJargon,
  fetchJargonDetails,
  editJargon,
  mapJargon,
  fetchFMCourses,
  fetchJargonClusterList,
  createJargonCluster,
  createKeyword,
  mapKeyword,
  deleteKeyword,
  mapJargonClusterJargons,
  mapJargonCluster
} from "./dictActions";

import { fetchSPOCList, createSPOC } from "./spocActions";

import {
  rolePlayList,
  addRolePlay,
  updateRolePlay,
  deleteRolePLay,
  rolePlayConversationDetails,
  addConversation,
  rolePlayArticleParametersList,
  mapRolePlayParameters,
  rolePlayConversationChangeStatus,
  rolePlayConversationDeleteConversation,
  updateRPConversation,
  fetchRpLayoutList
} from "./rolePLayActions";

import {
  wyrActionList,
  wyrActionDelete,
  createNewWyrAction,
  wyrActionMapParameters,
  wyrActionStatusUpdate,
  updateWyrAction
} from "./wyrActions";

import {
  wyrScenarioList,
  wyrScenarioStatusUpdate,
  wyrScenarioDelete,
  wyrScenarioMapParameters,
  createNewWyrScenario,
  updateWyrScenario
} from "./wyrScenario";

import {
  wyrTreeList,
  wyrTreeStatusUpdate,
  wyrTreeDelete,
  wyrTreeCreate,
  wyrTreeUpdate,
  wyrTreeMapParameters,
  getActivityList,
  wyrTreeActivityCreate,
  wyrTreeActivityDelete,
  wyrTreeActivityUpdate,
  getStimulationList,
  getMappingActivityEntityList,
  deleteMappedParameter,
  getCourseList,
  getChapterList,
  getEpisodeActivityListForFm,
  getWyrEpisodeSceneList,
  wyrEpisodeSceneCreate
} from "./wyrTreeAction";

import {
  wyrSeriesList,
  wyrSeriesCreate,
  wyrSeriesDelete,
  wyrSeriesStatusUpdate,
  wyrSeriesMapParameters,
  deleteMappedSeriesParameter,
  wyrSeriesUpdate,
  wyrSeasonsList,
  wyrSeasonCreate,
  wyrSeasonDelete,
  wyrSeasonStatusUpdate,
  wyrSeasonUpdate,
  wyrSeasonsEpisodeList,
  wyrMapSeasonEpisode
} from "./wyrSeriesActions";

import {
  getTechnicalAssesmentList,
  createNewTechnicalService,
  getOrgnizationAssesmentDetails,
  editTechnicalAssesment,
  deleteTechnicalAssesment,
  createNewOrganizationAssesment,
  updateOrganizationAssesment
} from "./technicalAssesmentActions";

export {
  getOrganizationModules,
  fetchOrganizationBatches,
  fetchOrganizationTracks,
  clearModules,
  fetchOrganizations,
  createSimulationOrgMapping,
  fetchModuleSimulations,
  fetchSimulationList,
  fetchSimulation,
  fetchDefaultModuleSimulations,
  clearSimulations,
  fetchUsers,
  fetchQuestionList,
  fetchQuestionDetail,
  updateQuestion,
  createQuestion,
  fetchDonDonList,
  fetchDonDonDetails,
  fetchMagicphraseList,
  fetchMagicphraseDetails,
  fetchRegions,
  fetchStates,
  fetchCategories,
  fetchParameters,
  fetchTags,
  fetchContentComplexityLevel,
  loginUser,
  logoutUser,
  addMTF,
  fetchMTFList,
  editMTF,
  fetchMTFDetails,
  addQuad,
  fetchQuadList,
  editQuad,
  fetchQuadDetails,
  fetchComprehensionsList,
  addComprehension,
  updateComprehension,
  fetchAllComprehensions,
  fetchComprehensionDetail,
  fetchMappedQuestions,
  mapComprehensionQuestions,
  fetchFlashCardsList,
  addFlashCard,
  deleteFlashCard,
  fetchFlashDetails,
  editFlashCard,
  fetchModulesFlash,
  fetchMappedCards,
  mapFlashCards,
  fetchArticleList,
  fetchArticleDetail,
  updateArticle,
  addArticle,
  fetchOrganizationList,
  fetchOrganizationDetails,
  fetchCourses,
  fetchIndustries,
  createOrganization,
  fetchCategoryList,
  fetchCategoryDetails,
  createCategory,
  deleteCategory,
  fetchParameterList,
  createParameter,
  editParameter,
  deleteParameter,
  fetchParameterDetails,
  createTag,
  deleteTag,
  fetchTagDetails,
  editTag,
  fetchTagList,
  setStep,
  fetchModules,
  mapModuleParameter,
  fetchAllOrganizations,
  fetchAllServices,
  mapOrganizationService,
  mapServiceModule,
  fetchTraitsList,
  createTrait,
  fetchQuestionBankList,
  fetchTraitsQuestionsList,
  mapTrait,
  createModule,
  fetchOptionsList,
  createOption,
  createService,
  mapOption,
  createServiceMap,
  createModuleMap,
  fetchJargonList,
  createJargon,
  fetchKeywordsList,
  deleteJargon,
  fetchJargonDetails,
  editJargon,
  mapJargon,
  fetchFMCourses,
  fetchJargonClusterList,
  createJargonCluster,
  createKeyword,
  mapKeyword,
  deleteKeyword,
  mapJargonClusterJargons,
  mapJargonCluster,
  fetchAllArticles,
  fetchSPOCList,
  createSPOC,
  fetchAllModules,
  getAlreadyMappedParameters,
  getAlreadyMappedServices,
  getAlreadyMappedModuleServices,
  // role play
  rolePlayList,
  addRolePlay,
  updateRolePlay,
  deleteRolePLay,
  rolePlayConversationDetails,
  addConversation,
  rolePlayArticleParametersList,
  mapRolePlayParameters,
  rolePlayConversationChangeStatus,
  rolePlayConversationDeleteConversation,
  updateRPConversation,
  fetchRpLayoutList,
  // wyr actions
  wyrActionList,
  wyrActionDelete,
  createNewWyrAction,
  wyrActionMapParameters,
  wyrActionStatusUpdate,
  updateWyrAction,
  // wyr wyrScenario
  wyrScenarioList,
  wyrScenarioStatusUpdate,
  wyrScenarioDelete,
  wyrScenarioMapParameters,
  createNewWyrScenario,
  updateWyrScenario,
  // wyr tree
  wyrTreeList,
  wyrTreeStatusUpdate,
  wyrTreeDelete,
  wyrTreeCreate,
  wyrTreeUpdate,
  wyrTreeMapParameters,
  getActivityList,
  wyrTreeActivityCreate,
  wyrTreeActivityDelete,
  wyrTreeActivityUpdate,
  deleteMappedParameter,
  getCourseList,
  getChapterList,
  getEpisodeActivityListForFm,
  getWyrEpisodeSceneList,
  wyrEpisodeSceneCreate,
  // wyr series
  wyrSeriesList,
  wyrSeriesCreate,
  wyrSeriesDelete,
  wyrSeriesStatusUpdate,
  wyrSeriesMapParameters,
  deleteMappedSeriesParameter,
  wyrSeriesUpdate,
  wyrSeasonsList,
  wyrSeasonCreate,
  wyrSeasonDelete,
  wyrSeasonStatusUpdate,
  wyrSeasonUpdate,
  wyrSeasonsEpisodeList,
  wyrMapSeasonEpisode,
  //technical assesment
  getTechnicalAssesmentList,
  createNewTechnicalService,
  getOrgnizationAssesmentDetails,
  editTechnicalAssesment,
  deleteTechnicalAssesment,
  createNewOrganizationAssesment,
  updateOrganizationAssesment,
  getStimulationList,
  getMappingActivityEntityList
};

// >>>>>>>>>>>>>>>>>>>>>>>>>REFACTOR BELOW>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// USER

export const setUserAuthValue = formValues => {
  return {
    type: ACTION_TYPE.SET_USER_AUTH,
    payload: formValues
  };
};

// MODULE TRACKS

export const fetchModuleTracks = authToken => async dispatch => {
  const response = await pyLearningApi(authToken).get("/react/track/list");
  if (response.status === 200) {
    dispatch({ type: ACTION_TYPE.FETCH_MODULE_TRACKS, payload: response.data });
  } else {
    dispatch({ type: ACTION_TYPE.FETCH_MODULE_TRACKS_ERROR });
  }
};

export const fetchModuleTrack = (authToken, id) => async dispatch => {
  const response = await pyLearningApi(authToken).get(
    `/react/track/list?track_id=${id}`
  );
  if (response.status === 200)
    dispatch({ type: ACTION_TYPE.FETCH_MODULE_TRACK, payload: response.data });
  else dispatch({ type: ACTION_TYPE.FETCH_MODULE_TRACK_ERROR });
};

export const createModuleTrack = (authToken, formValues) => async dispatch => {
  const response = await pyLearningApi(authToken).post(
    "/react/track/create/",
    qs.stringify(formValues)
  );
  if (response.status === 200) {
    dispatch({ type: ACTION_TYPE.CREATE_MODULE_TRACK, payload: response.data });
    const id = response.data.result.track_id;
    history.push(`/tracks/map/module/${id}`);
  } else dispatch({ type: ACTION_TYPE.CREATE_MODULE_TRACK_ERROR });
};

export const fetchTrackAssessments = (authToken, id) => async dispatch => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/track/assessment/list",
    {
      params: {
        track_id: id
      }
    }
  );
  dispatch({
    type: ACTION_TYPE.FETCH_TRACK_ASSESSMENTS,
    payload: response.data.result
  });
};

export const createModuleTrackMapping = (
  authToken,
  formValues
) => async dispatch => {
  const response = await pyLearningApi(authToken).post(
    "/react/track/module/map/",
    qs.stringify(formValues)
  );
  if (response.status === 200) {
    dispatch({
      type: ACTION_TYPE.CREATE_MODULE_TRACK_MAPPING,
      payload: response.data
    });
    history.push("/tracks");
  } else dispatch({ type: ACTION_TYPE.CREATE_MODULE_TRACK_MAPPING_ERROR });
};

export const createUserTrackMapping = (
  authToken,
  formValues
) => async dispatch => {
  const response = await pyLearningApi(authToken).post(
    "/react/user/track/mapping/",
    qs.stringify(formValues)
  );
  if (response.status === 200) {
    dispatch({
      type: ACTION_TYPE.CREATE_USER_TRACK_MAPPING,
      payload: response.data
    });
    history.push("/tracks");
  } else dispatch({ type: ACTION_TYPE.CREATE_USER_TRACK_MAPPING_ERROR });
};

// ENTITY MANAGEMENT
