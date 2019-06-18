import React from "react";
import { Layout, Menu, Icon, Button, Dropdown } from "antd";
import { withCookies } from "react-cookie";
import logo from "../../assets/logo.png";
import logoMini from "../../assets/logo-mini.png";
import history from "../../history";
import { connect } from "react-redux";
import { logoutUser } from "../../actions";
import Breadcrumbs from "./Breadcrumbs";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends React.Component {
  state = {
    collapsed: false,
    logo: logo
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

  onCollapse = collapsed => {
    this.setState({
      logo: !this.state.collapsed ? logoMini : logo,
      collapsed: !this.state.collapsed
    });
  };

  userMenu = (
    <Menu>
      <Menu.Item key="0" style={{ textAlign: "center" }} onClick={this.logout}>
        <Icon type="logout" /> Logout
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Layout>
        <Sider
          collapsible
          trigger={null}
          width="250px"
          collapsedWidth={80}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
        >
          <div style={{ padding: "15px", textAlign: "center" }}>
            <img src={this.state.logo} alt="logo" width="auto" height="40px" />
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            style={{ marginTop: 35 }}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="fork" />
                  {!this.state.collapsed ? "Tracks" : null}
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
                  {!this.state.collapsed ? "Questions" : null}
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
                  {!this.state.collapsed ? "Simulation" : null}
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
                  {!this.state.collapsed ? "Games" : null}
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
        <Layout style={{ marginLeft: this.state.collapsed ? 80 : 250 }}>
          <Header
            style={{
              background: "#fff",
              padding: 0,
              zIndex: 1
            }}
            className="header-shadow"
          >
            <div className="header">
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.onCollapse}
              />
              {this.state.heading ? (
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bolder",
                    textAlign: "center",
                    flex: 1
                  }}
                >
                  {this.state.heading}
                </div>
              ) : null}
              <span style={{ textAlign: "right" }}>
                <span style={{ fontSize: "16px" }}>
                  <Dropdown overlay={this.userMenu} trigger={["click"]}>
                    <Button
                      icon="user"
                      size="large"
                      type="link"
                      style={{ color: "rgba(0, 0, 0, 0.65)" }}
                    >
                      {this.props.user} <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              </span>
            </div>
          </Header>
          <div style={{ margin: "20px 0 5px 15px" }}>
            <Breadcrumbs />
          </div>
          <Content>
            <div
              style={{
                margin: "10px 15px 30px 15px"
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
