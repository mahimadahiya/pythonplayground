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
          key: "/tracks",
          onClick: () => history.push("/tracks"),
          label: "List"
        },
        {
          key: "/tracks/map/user",
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
          key: "/questions",
          onClick: () => history.push("/questions"),
          label: "List"
        }
      ]
    },
    {
      key: "simulation",
      icon: "smile",
      label: "Simulation",
      menuList: [
        {
          key: "/simulation",
          onClick: () => history.push("/simulation"),
          label: "List"
        },
        {
          key: "/simulation/map",
          onClick: () => history.push("/simulation/map"),
          label: "Map Simulation"
        }
      ]
    },
    {
      key: "comprehension",
      icon: "unordered-list",
      label: "Comprehension",
      menuList: [
        {
          key: "/comprehension",
          label: "List",
          onClick: () => history.push("/comprehension")
        },
        {
          key: "/comprehension/upload",
          label: "Upload",
          onClick: () => history.push("/comprehension/upload")
        }
      ]
    },
    {
      key: "article",
      icon: "file-text",
      label: "Article",
      menuList: [
        {
          key: "/article",
          label: "List",
          onClick: () => history.push("/article")
        }
      ]
    },
    {
      key: "organizations",
      icon: "bank",
      label: "Organizations",
      menuList: [
        {
          key: "/organization",
          label: "List",
          onClick: () => history.push("/organization")
        }
      ]
    },
    {
      key: "master",
      icon: "table",
      label: "Master Table",
      menuList: [
        {
          key: "/categories",
          label: "Category",
          onClick: () => history.push("/categories")
        },
        {
          key: "/parameters",
          label: "Parameter",
          onClick: () => history.push("/parameters")
        },
        {
          key: "/tags",
          label: "Tags",
          onClick: () => history.push("/tags")
        },
        {
          key: "/modules",
          label: "Modules",
          onClick: () => history.push("/modules")
        }
      ]
    },
    {
      key: "flashcards",
      icon: "credit-card",
      label: "Flash Cards",
      menuList: [
        {
          key: "/flashcard",
          label: "List",
          onClick: () => history.push("/flashcard")
        },
        {
          key: "/flashcard/add",
          label: "Add",
          onClick: () => history.push("/flashcard/add")
        },
        {
          key: "/flashcard/map",
          label: "Map",
          onClick: () => history.push("/flashcard/map")
        }
      ]
    },
    {
      key: "psychometric",
      icon: "appstore",
      label: "Psychometric",
      menuList: [
        {
          key: "/traits",
          label: "Traits",
          onClick: () => history.push("/traits")
        },
        {
          key: "/map/traits",
          label: "Map Traits",
          onClick: () => history.push("/map/traits")
        },
        {
          key: "/map/assessments",
          label: "Map Assessments",
          onClick: () => history.push("/map/assessments")
        }
      ]
    },
    {
      key: "mapping",
      icon: "heat-map",
      label: "Mapping",
      menuList: [
        {
          key: "/map/module-parameter",
          label: "Module-Parameter Mapping",
          onClick: () => history.push("/map/module-parameter")
        },
        {
          key: "/map/organization-service",
          label: "Organization-Service Mapping",
          onClick: () => history.push("/map/organization-service")
        },
        {
          key: "/map/service-module",
          label: "Service-Module Mapping",
          onClick: () => history.push("/map/service-module")
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
