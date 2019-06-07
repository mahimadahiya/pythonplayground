import React from "react";
import { Layout, Menu, Icon, Breadcrumb, Button } from "antd";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";
import logo from "../../assets/logo.png";
import history from "../../history";
import { connect } from "react-redux";
import { logoutUser } from "../../actions";

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

  renderPaths = () => {
    return this.state.paths.length > 0
      ? this.state.paths.map((path, index) => {
          const i = path.lastIndexOf("/");
          const pathName = path.substring(i + 1);
          return (
            <Breadcrumb.Item key={`${path}${index}`}>
              <Link to={path}>{pathName}</Link>
            </Breadcrumb.Item>
          );
        })
      : null;
  };

  logout = () => {
    // console.log(this.props);
    const { cookies } = this.props;
    cookies.remove("Authorization", { path: "/" });
    cookies.remove("isSignedIn", { path: "/" });
    cookies.remove("userId", { path: "/" });
    cookies.remove("userEmail", { path: "/" });
    cookies.remove("userName", { path: "/" });
    this.props.logoutUser();
  };

  render() {
    return (
      <Layout>
        <Header className="header shadow-header" style={{ zIndex: 1 }}>
          <div>
            <img src={logo} alt="logo" />
          </div>
          {this.state.heading ? (
            <span>
              <h1>{this.state.heading}</h1>
            </span>
          ) : null}
          {/* <span>{this.props.user}</span> */}
          <span onClick={this.logout}>
            <Icon
              type="user"
              // style={{ width: 20, height: 20, color: "black" }}
            />
            <Button type="link" size="large">
              Logout
            </Button>
          </span>
        </Header>
        <Layout style={{ height: "100vh" }}>
          <Sider theme="dark" width="300px" style={{ paddingTop: "20px" }}>
            <Menu
              className="menu"
              mode="inline"
              theme="dark"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    Tracks
                  </span>
                }
              >
                <Menu.Item key="1" onClick={() => history.push("/tracks")}>
                  List
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => history.push("/tracks/map/user")}
                >
                  Map User
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                // style={{ backgroundColor: "#000c17" }}
                title={
                  <span>
                    <Icon type="user" />
                    Questions
                  </span>
                }
              >
                <Menu.Item key="1" onClick={() => history.push("/tracks")}>
                  List
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                // style={{ backgroundColor: "#000c17" }}
                title={<span>Organization</span>}
              >
                <Menu.Item
                  key="1"
                  onClick={() => history.push("/organization/map")}
                >
                  Map
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Breadcrumb style={{ margin: "25px 15px 25px" }}>
              {this.renderPaths()}
              <Breadcrumb.Item key="1">Home</Breadcrumb.Item>
              <Breadcrumb.Item key="2">List</Breadcrumb.Item>
              <Breadcrumb.Item key="3">
                <Link to="" style={{ textTransform: "capitalize" }}>
                  {window.location.pathname.substring(1)}
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Content>
              <div
                style={{
                  margin: "0px 15px 40px 15px"
                }}
                className="overflow shadow"
              >
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
