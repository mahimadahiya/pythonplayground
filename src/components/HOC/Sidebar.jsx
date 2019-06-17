import React from "react";
import { Layout, Menu, Icon, Button, Dropdown } from "antd";
import { withCookies } from "react-cookie";
import logo from "../../assets/logo.png";
import history from "../../history";
import { connect } from "react-redux";
import { logoutUser } from "../../actions";
import Breadcrumbs from "./Breadcrumbs";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends React.Component {
  state = {
    paths: []
  };

  componentWillMount() {
    const path = window.location.href;
    this.addPath(path);
  }

  addPath = path => {
    this.setState({
      paths: [...this.state.paths, path]
    });
  };

  removePath = path => {
    const index = this.state.paths.indexOf(path);
    const newPaths = this.state.paths.slice(0, index);

    this.setState({
      paths: newPaths,
      heading: null
    });
  };

  setHeading = text => {
    this.setState({ heading: text });
  };

  logout = () => {
    const { cookies } = this.props;
    cookies.remove("Authorization", { path: "/" });
    cookies.remove("isSignedIn", { path: "/" });
    cookies.remove("userId", { path: "/" });
    cookies.remove("userEmail", { path: "/" });
    cookies.remove("userName", { path: "/" });
    this.props.logoutUser();
  };

  userMenu = (
    <Menu>
      <Menu.Item key="0" style={{ textAlign: "center" }}>
        <Icon type="logout" /> Logout
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Layout>
        <Header
          className="header shadow-header"
          style={{ zIndex: 1, position: "fixed", width: "100%" }}
        >
          <div style={{ minWidth: "250px" }}>
            <img src={logo} alt="logo" />
          </div>
          {this.state.heading ? (
            <span style={{ fontSize: "24px", fontWeight: "bolder" }}>
              {this.state.heading}
            </span>
          ) : null}
          <span>
            <span style={{ marginRight: 10, fontSize: "16px" }}>
              <Dropdown overlay={this.userMenu} trigger={["click"]}>
                <Button icon="user" size="large" type="link">
                  {this.props.user} <Icon type="down" />
                </Button>
              </Dropdown>
            </span>
          </span>
        </Header>
        <Layout style={{ height: "100vh" }}>
          <Sider theme="dark" width="300px" style={{ paddingTop: "60px" }}>
            <Menu
              className="menu"
              mode="inline"
              theme="dark"
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="fork" />
                    Tracks
                  </span>
                }
              >
                <Menu.Item key="sub1-1" onClick={() => history.push("/tracks")}>
                  List
                </Menu.Item>
                <Menu.Item
                  key="sub1-2"
                  onClick={() => history.push("/tracks/map/user")}
                >
                  Map User
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="question-circle" />
                    Questions
                  </span>
                }
              >
                <Menu.Item
                  key="sub2-1"
                  onClick={() => history.push("/questions")}
                >
                  List
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="smile" />
                    Simulation
                  </span>
                }
              >
                <Menu.Item
                  key="sub3-2"
                  onClick={() => history.push("/simulation")}
                >
                  List
                </Menu.Item>
                <Menu.Item
                  key="sub3-1"
                  onClick={() => history.push("/simulation/map")}
                >
                  Map
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="play-circle" />
                    Games
                  </span>
                }
              >
                <SubMenu key="sub4-1" title="Don Don">
                  <Menu.Item
                    key="sub4-1-1"
                    onClick={() => history.push("/games/dondon")}
                  >
                    List
                  </Menu.Item>
                  <Menu.Item
                    key="sub4-1-2"
                    onClick={() => history.push("/games/dondon/upload")}
                  >
                    Upload
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub4-2" title="Magic Phrase">
                  <Menu.Item
                    key="sub4-2-1"
                    onClick={() => history.push("/games/magicphrase")}
                  >
                    List
                  </Menu.Item>
                  <Menu.Item
                    key="sub4-2-2"
                    onClick={() => history.push("/games/magicphrase/upload")}
                  >
                    Upload
                  </Menu.Item>
                </SubMenu>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <div style={{ margin: "25px 0 15px 15px" }}>
              <Breadcrumbs />
            </div>
            <Content>
              <div
                style={{
                  margin: "40px 15px 40px 15px"
                }}
                className="overflow shadow"
              >
                {/* Sending Heading Prop to children to render heading on header */}

                {React.cloneElement(this.props.children, {
                  heading: this.setHeading
                })}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userAuth.userName
  };
};

export default withCookies(
  connect(
    mapStateToProps,
    { logoutUser }
  )(SideBar)
);
