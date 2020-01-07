import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import ServiceList from "../Screens/MasterTable/Service/List";
import Login from "../Screens/Login/Login";
import HomeScreen from "../Screens/Dashboard/TrackList";
import SimulationMapping from "../Screens/Simulation/SimulationMapping";
import SimulationList from "../Screens/Simulation/SimulationList";
import QuestionList from "../Screens/Questions/index";
import MapQuestionChoices from "../Screens/Questions/mapChoices";
import UploadDonDon from "../Screens/Games/DonDon/Upload";
import UploadMagicPhrase from "../Screens/Games/MagicPhrase/Upload";
import ListDonDon from "../Screens/Games/DonDon/List";
import ListMagicPhrase from "../Screens/Games/MagicPhrase/List";
import EditDonDon from "../Screens/Games/DonDon/Edit";
import EditMagicPhrase from "../Screens/Games/MagicPhrase/Edit";
import QuestionEdit from "../Screens/Questions/edit";
import AddResponse from "../Screens/Simulation/AddResponse";
import EditResponse from "../Screens/Simulation/EditResponse";
import AddQuestion from "../Screens/Questions/AddQuestion";
import QuestionDetails from "../Screens/Questions/QuestionDetails";
import MapCategoriesQuestion from "../Screens/Questions/MapCategories";
import ComprehensionUpload from "../Screens/Comprehension/ComprehensionUpload";
import MapCategoriesComprehension from "../Screens/Comprehension/MapCategories";
import AddMTF from "../Screens/Games/MTF/Add";
import ListMTF from "../Screens/Games/MTF/List";
import EditMTF from "../Screens/Games/MTF/Edit";
import AddQuad from "../Screens/Games/Quad/Add";
import ListQuad from "../Screens/Games/Quad/List";
import ComprehensionList from "../Screens/Comprehension/ComprehensionList";
import EditQuad from "../Screens/Games/Quad/Edit";
import ComprehensionEdit from "../Screens/Comprehension/ComprehensionEdit";
import FlashCardList from "../Screens/FlashCards/List";
import FlashCardAdd from "../Screens//FlashCards/Add";
import FlashCardEdit from "../Screens//FlashCards/Edit";
import MapFlash from "../Screens/FlashCards/MapFlash";
import ComprehensionDetail from "../Screens/Comprehension/ComprehensionDetails";
import ArticleDetail from "../Screens/Article/ArticleDetail";
import ArticleList from "../Screens/Article/List";
import OrganizationList from "../Screens/MasterTable/Organization/List";
import OrganizationDetails from "../Screens/MasterTable/Organization/OrganizationDetails";
import CategoryList from "../Screens/MasterTable/Category/Category";
import ParameterList from "../Screens/MasterTable/Parameter/Parameter";
import ParameterDetails from "../Screens/MasterTable/Parameter/ParameterDetails";
import TagList from "../Screens/MasterTable/Tag/Tag";
import TagDetails from "../Screens/MasterTable/Tag/TagDetails";
import CategoryDetails from "../Screens/MasterTable/Category/CategoryDetails";
import ModuleParameterMapping from "../Screens/Mapping/ModuleParameterMapping";
import OrganizationServiceMapping from "../Screens/Mapping/OrganizationServiceMapping";
import ServiceModuleMapping from "../Screens/Mapping/ServiceModuleMapping";
import ModuleList from "../Screens/Module/List";
import MapAssessments from "../Screens/Psychometric/MapAssessments";
import TraitsList from "../Screens/Psychometric/TraitsList";
import MapTraits from "../Screens/Psychometric/MapTraits";
import OptionsList from "../Screens/Psychometric/OptionsList";
import ServiceDetails from "../Screens/MasterTable/Service/ServiceDetails";
import ModuleDetails from "../Screens/Module/ModuleDetails";
import KeywordsList from "../Screens/Dictionary/Keywords/List";
import JargonDetails from "../Screens/Dictionary/Jargons/Details";
import JargonHome from "../Screens/Dictionary/Jargons/Home";
import NotAuthorized from "../Screens/Dashboard/NotFound";
import RolePlay from "../Screens/RolePlay";
import RolePlayDetails from "../Screens/RolePlay/RolePlayDetails";

// Would you rather
import WyrActionIndex from "../Screens/WouldYouRather/Actions";
import WyrScenarioIndex from "../Screens/WouldYouRather/Scenarios";
import WyrTreeIndex from "../Screens/WouldYouRather/Tree";
import WyrSeriesIndex from "../Screens/WouldYouRather/Series";
import SceneIndex from "../Screens/WouldYouRather/Tree/SceneIndex";

//technical assesment
import TechnicalAssesmentIndex from "../Screens/TechnicalAssesment/TechnicalAssesmentIndex";
import TechnicalAssesmentDetails from "../Screens/TechnicalAssesment/TechnicalAssesmentDetails";

//Cms
import CmsIndex from "../Screens/Cms/CmsIndex";

const Sidebar = React.lazy(() => import("./Sidebar"));

const PrivateRoute = ({ component: Component, user, accessGroup, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        user.isSignedIn ? (
          accessGroup.includes(parseInt(user.groupId)) ? (
            <Sidebar>
              <Component {...props} />
            </Sidebar>
          ) : (
            <Redirect to={{ pathname: "/na" }} />
          )
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

class Routing extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <React.Fragment>
          <Switch>
            <PrivateRoute
              path="/wyr/series"
              component={WyrSeriesIndex}
              user={user}
              exact
              accessGroup={[1]}
            />
            <PrivateRoute
              path="/wyr/scenario"
              component={WyrScenarioIndex}
              user={user}
              exact
              accessGroup={[1]}
            />
            {/* 
            <PrivateRoute
              path="/wyr/actions"
              component={WyrActionIndex}
              user={user}
              exact
              accessGroup={[1]}
            />
            */}
            <PrivateRoute
              path="/wyr/episode"
              component={WyrTreeIndex}
              user={user}
              exact
              accessGroup={[1]}
            />
            <PrivateRoute
              path="/wyr/scene/EpId/:id/:techId"
              component={SceneIndex}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/techAss"
              component={TechnicalAssesmentIndex}
              user={user}
              exact
              accessGroup={[1]}
            />
            {/* 
            <PrivateRoute
              path="/cms"
              component={CmsIndex}
              user={user}
              exact
              accessGroup={[1]}
            />
            */}
            <PrivateRoute
              path="/role-play"
              component={RolePlay}
              user={user}
              exact
              accessGroup={[1]}
            />
            <PrivateRoute
              path="/role-play/details/:id"
              component={RolePlayDetails}
              user={user}
              exact
              accessGroup={[1]}
            />
            <PrivateRoute
              path="/"
              component={HomeScreen}
              user={user}
              exact
              accessGroup={[1, 10]}
            />
            <PrivateRoute
              path="/simulation/map"
              component={SimulationMapping}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/simulation"
              component={SimulationList}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/simulation/add/:id"
              component={AddResponse}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/simulation/edit/:id"
              component={EditResponse}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/questions"
              component={QuestionList}
              user={user}
              accessGroup={[1, 10]}
              exact
            />
            <PrivateRoute
              path="/question/:id"
              component={QuestionDetails}
              user={user}
              accessGroup={[1, 10]}
              exact
            />
            <PrivateRoute
              path="/questions/add"
              component={AddQuestion}
              user={user}
              accessGroup={[1, 10]}
              exact
            />
            <PrivateRoute
              path="/question/edit/:id"
              component={QuestionEdit}
              user={user}
              accessGroup={[1, 10]}
              exact
            />
            <PrivateRoute
              path="/question/map/:id"
              component={MapCategoriesQuestion}
              user={user}
              accessGroup={[1, 10]}
              exact
            />
            <PrivateRoute
              path="/question/map/choices/:id"
              component={MapQuestionChoices}
              user={user}
              accessGroup={[1, 10]}
              exact
            />
            <PrivateRoute
              path="/games/dondon/upload"
              component={UploadDonDon}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/games/dondon"
              component={ListDonDon}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/games/dondon/edit/:id"
              component={EditDonDon}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/games/magicphrase/upload"
              component={UploadMagicPhrase}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/games/magicphrase"
              component={ListMagicPhrase}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/games/magicphrase/edit/:id"
              component={EditMagicPhrase}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/games/mtf"
              component={ListMTF}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/games/mtf/add"
              component={AddMTF}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/games/mtf/edit/:id"
              component={EditMTF}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/games/quad"
              component={ListQuad}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/games/quad/add"
              component={AddQuad}
              user={user}
              accessGroup={[1]}
              exact
            />

            <PrivateRoute
              path="/games/quad/edit/:id"
              component={EditQuad}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/comprehension"
              component={ComprehensionList}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/comprehension/detail/:id"
              component={ComprehensionDetail}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/comprehension/upload"
              component={ComprehensionUpload}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/comprehension/edit/:id"
              component={ComprehensionEdit}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/comprehension/map/:id"
              component={MapCategoriesComprehension}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/article"
              component={ArticleList}
              user={user}
              accessGroup={[1, 10]}
              exact
            />
            <PrivateRoute
              path="/article/detail/:id"
              component={ArticleDetail}
              user={user}
              accessGroup={[1, 10]}
              exact
            />
            <PrivateRoute
              path="/flashcard"
              component={FlashCardList}
              user={user}
              accessGroup={[1, 10]}
              exact
            />
            <PrivateRoute
              path="/flashcard/add"
              component={FlashCardAdd}
              user={user}
              accessGroup={[1, 10]}
              exact
            />
            <PrivateRoute
              path="/flashcard/edit/:id"
              component={FlashCardEdit}
              user={user}
              accessGroup={[1, 10]}
              exact
            />
            <PrivateRoute
              path="/flashcard/map"
              component={MapFlash}
              user={user}
              accessGroup={[1, 10]}
              exact
            />
            <PrivateRoute
              path="/organization"
              component={OrganizationList}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/categories"
              component={CategoryList}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/category/:id"
              component={CategoryDetails}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/parameters"
              component={ParameterList}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/modules"
              component={ModuleList}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/modules/:id"
              component={ModuleDetails}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/services"
              component={ServiceList}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/services/:id"
              component={ServiceDetails}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/parameter/:id"
              component={ParameterDetails}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/tags"
              component={TagList}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/tag/:id"
              component={TagDetails}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/organization/detail/:id"
              component={OrganizationDetails}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/map/traits"
              component={MapTraits}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/map/assessments"
              component={MapAssessments}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/traits"
              component={TraitsList}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/options"
              component={OptionsList}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/map/module-parameter"
              component={ModuleParameterMapping}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/map/organization-service"
              component={OrganizationServiceMapping}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/map/service-module"
              component={ServiceModuleMapping}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/jargons"
              component={JargonHome}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/jargons/:id"
              component={JargonDetails}
              user={user}
              accessGroup={[1]}
              exact
            />
            <PrivateRoute
              path="/keywords"
              component={KeywordsList}
              user={user}
              accessGroup={[1]}
              exact
            />
          </Switch>
        </React.Fragment>
        <Route
          path="/login"
          render={() => <Login cookies={this.props.cookies} />}
        />
        <Route path="/na" render={() => <NotAuthorized />} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userAuth };
};

export default connect(mapStateToProps)(Routing);
