import React from "react";
import { Layout, Menu, Icon, Button, Dropdown } from "antd";
import { withCookies } from "react-cookie";
import logo from "../../assets/logo.png";
import logoMini from "../../assets/logo-mini.png";
import history from "../../history";
import { connect } from "react-redux";
import { logoutUser } from "../../actions";
import Breadcrumbs from "./Breadcrumbs";
import Submenu from "../Elements/Helper/Submenu";

const { Header, Content, Sider } = Layout;

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

  list = [
    {
      key: "sub1",
      icon: "fork",
      label: "Tracks",
      menuList: [
        {
          key: "sub1-1",
          onClick: () => history.push("/tracks"),
          label: "List"
        },
        {
          key: "sub1-2",
          onClick: () => history.push("/tracks/map/user"),
          label: "Map User"
        }
      ]
    },
    {
      key: "sub2",
      icon: "question-circle",
      label: "Questions",
      menuList: [
        {
          key: "sub2-1",
          onClick: () => history.push("/questions"),
          label: "List"
        }
      ]
    },
    {
      key: "sub3",
      icon: "smile",
      label: "Simulation",
      menuList: [
        {
          key: "sub3-1",
          onClick: () => history.push("/simulation"),
          label: "List"
        },
        {
          key: "sub3-2",
          onClick: () => history.push("/simulation/map"),
          label: "Map Simulation"
        }
      ]
    },
    {
      key: "sub4",
      icon: "unordered-list",
      label: "Comprehension",
      menuList: [
        {
          key: "sub4-1",
          label: "List",
          onClick: () => history.push("/comprehension")
        },
        {
          key: "sub4-2",
          label: "Upload",
          onClick: () => history.push("/comprehension/upload")
        }
      ]
    }
  ];

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

          <Submenu collapsed={this.state.collapsed} list={this.list} />
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

              {this.props.children}
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
