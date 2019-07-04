import React from "react";
import { Menu, Icon } from "antd";
import history from "../../../history";

const renderMenus = menuList => {
  return menuList.map(menuItem => {
    return (
      <Menu.Item key={menuItem.key} onClick={menuItem.onClick}>
        {menuItem.label}
      </Menu.Item>
    );
  });
};

const renderSubmenus = (list, collapsed) => {
  const { SubMenu } = Menu;
  return list.map(item => {
    return (
      <SubMenu
        key={item.key}
        title={
          <span>
            <Icon type={item.icon} />
            {!collapsed ? <span>{item.label}</span> : null}
          </span>
        }
      >
        {renderMenus(item.menuList)}
      </SubMenu>
    );
  });
};

const Submenu = props => {
  const { SubMenu } = Menu;
  return (
    <React.Fragment>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        style={{ marginTop: 35 }}
      >
        {renderSubmenus(props.list, props.collapsed)}
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="play-circle" />
              {!props.collapsed ? "Games" : null}
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
          <SubMenu key="sub4-3" title="MTF">
            <Menu.Item
              key="sub4-3-1"
              onClick={() => history.push("/games/mtf")}
            >
              List
            </Menu.Item>
            <Menu.Item
              key="sub4-3-2"
              onClick={() => history.push("/games/mtf/add")}
            >
              Upload
            </Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </React.Fragment>
  );
};

export default Submenu;
