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
      paths: newPaths
    });
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
            <Button type="link" size="large">
              Logout
            </Button>
          </span>
        </Header>
        <Layout style={{ height: "93.5vh" }}>
          <Sider>
            <Menu
              className="menu"
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    subnav 1
                  </span>
                }
              >
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="laptop" />
                    subnav 2
                  </span>
                }
              >
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="notification" />
                    subnav 3
                  </span>
                }
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
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
                background: "#fff",
                margin: 0,
                minHeight: 280
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default SideBar;
