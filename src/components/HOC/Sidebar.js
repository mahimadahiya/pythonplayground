import React from "react";
import { Layout, Menu, Icon, Breadcrumb, Button } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends React.Component {
  state = {
    paths: []
  };

  componentWillMount() {
    const path = window.location.href;
    console.log(path);
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
      ? this.state.paths.map(path => {
          const i = path.lastIndexOf("/");
          const pathName = path.substring(i + 1);
          return (
            <Breadcrumb.Item>
              <Link to={path}>{pathName}</Link>
            </Breadcrumb.Item>
          );
        })
      : null;
  };

  render() {
    // console.log("sidebar", window.location);
    // console.log("state", this.state);
    return (
      <Layout>
        <Header className="header">
          <div>
            <img src={logo} alt="logo" />
          </div>
          <span style={{ marginLeft: "auto" }}>
            <Icon
              type="user"
              style={{ width: 20, height: 20, color: "black" }}
            />
            <Button type="link" size="large">
              Logout
            </Button>
          </span>
        </Header>
        <Layout style={{ height: "93.5vh" }}>
          <Sider theme="dark" width="300px">
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
                // style={{ backgroundColor: "#000c17" }}
                title={
                  <span>
                    <Icon type="user" />
                    Tracks
                  </span>
                }
              >
                <Menu.Item key="1">List</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              {this.renderPaths()}
              {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item><Link to="" style={{ textTransform: 'capitalize'}}>{window.location.pathname.substring(1)}</Link></Breadcrumb.Item> */}

            <Content
              style={{
                background: "rgba(255,255,255,0.2)",
                // margin: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"

                // minWidth: 800
              }}
            >
              {this.state.heading ? (
                <div
                  className="text-center bg-white"
                  style={{
                    width: "90%",
                    padding: "10px",
                    margin: "35px 0"
                  }}
                >
                  <h2>{this.state.heading}</h2>
                </div>
              ) : null}

              <div
                style={{
                  minWidth: "90%",
                  padding: "10px 10px 0px 10px",
                  maxHeight: "80%"
                }}
                className="overflow"
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

export default SideBar;
