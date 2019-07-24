import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";

import Login from "../Screens/Login/Login";
import TrackList from "../Screens/ModuleTracks";
import CreateTrack from "../Screens/ModuleTracks/create";
import ModuleMapping from "../Screens/ModuleTracks/ModuleMapping";
import UserTrackMapping from "../Screens/ModuleTracks/UserMapping";
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
import TrackDetails from "../Screens/ModuleTracks/TrackDetails";
const Sidebar = React.lazy(() => import("./Sidebar"));

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        user.isSignedIn ? (
          <Sidebar>
            <Component {...props} />
          </Sidebar>
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
            <PrivateRoute path="/" component={HomeScreen} user={user} exact />
            <PrivateRoute
              path="/tracks"
              component={TrackList}
              user={user}
              exact
            />
            <PrivateRoute
              path="/tracks/create"
              component={CreateTrack}
              user={user}
              exact
            />
            <PrivateRoute
              path="/track/:id"
              component={TrackDetails}
              user={user}
              exact
            />
            <PrivateRoute
              path="/tracks/map/module/:id"
              component={ModuleMapping}
              user={user}
              exact
            />
            <PrivateRoute
              path="/tracks/map/user"
              component={UserTrackMapping}
              user={user}
              exact
            />
            <PrivateRoute
              path="/simulation/map"
              component={SimulationMapping}
              user={user}
              exact
            />
            <PrivateRoute
              path="/simulation"
              component={SimulationList}
              user={user}
              exact
            />
            <PrivateRoute
              path="/simulation/add/:id"
              component={AddResponse}
              user={user}
              exact
            />
            <PrivateRoute
              path="/simulation/edit/:id"
              component={EditResponse}
              user={user}
              exact
            />
            <PrivateRoute
              path="/questions"
              component={QuestionList}
              user={user}
              exact
            />
            <PrivateRoute
              path="/question/:id"
              component={QuestionDetails}
              user={user}
              exact
            />
            <PrivateRoute
              path="/questions/add"
              component={AddQuestion}
              user={user}
              exact
            />
            <PrivateRoute
              path="/question/edit/:id"
              component={QuestionEdit}
              user={user}
              exact
            />
            <PrivateRoute
              path="/question/map/:id"
              component={MapCategoriesQuestion}
              user={user}
              exact
            />
            <PrivateRoute
              path="/question/map/choices/:id"
              component={MapQuestionChoices}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/dondon/upload"
              component={UploadDonDon}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/dondon"
              component={ListDonDon}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/dondon/edit/:id"
              component={EditDonDon}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/magicphrase/upload"
              component={UploadMagicPhrase}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/magicphrase"
              component={ListMagicPhrase}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/magicphrase/edit/:id"
              component={EditMagicPhrase}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/mtf"
              component={ListMTF}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/mtf/add"
              component={AddMTF}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/mtf/edit/:id"
              component={EditMTF}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/quad"
              component={ListQuad}
              user={user}
              exact
            />
            <PrivateRoute
              path="/games/quad/add"
              component={AddQuad}
              user={user}
              exact
            />

            <PrivateRoute
              path="/games/quad/edit/:id"
              component={EditQuad}
              user={user}
              exact
            />
            <PrivateRoute
              path="/comprehension"
              component={ComprehensionList}
              user={user}
              exact
            />
            <PrivateRoute
              path="/comprehension/detail/:id"
              component={ComprehensionDetail}
              user={user}
              exact
            />
            <PrivateRoute
              path="/comprehension/upload"
              component={ComprehensionUpload}
              user={user}
              exact
            />
            <PrivateRoute
              path="/comprehension/edit/:id"
              component={ComprehensionEdit}
              user={user}
              exact
            />
            <PrivateRoute
              path="/comprehension/map/:id"
              component={MapCategoriesComprehension}
              user={user}
              exact
            />
            <PrivateRoute
              path="/article"
              component={ArticleList}
              user={user}
              exact
            />
            <PrivateRoute
              path="/article/detail/:id"
              component={ArticleDetail}
              user={user}
              exact
            />
            <PrivateRoute
              path="/flashcard"
              component={FlashCardList}
              user={user}
              exact
            />
            <PrivateRoute
              path="/flashcard/add"
              component={FlashCardAdd}
              user={user}
              exact
            />
            <PrivateRoute
              path="/flashcard/edit/:id"
              component={FlashCardEdit}
              user={user}
              exact
            />
            <PrivateRoute
              path="/flashcard/map"
              component={MapFlash}
              user={user}
              exact
            />
          </Switch>
        </React.Fragment>
        <Route
          path="/login"
          render={() => <Login cookies={this.props.cookies} />}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userAuth };
};

export default connect(mapStateToProps)(Routing);
