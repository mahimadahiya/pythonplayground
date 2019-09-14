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
        {item.subMenu
          ? renderSubmenus(item.subMenu, collapsed)
          : renderMenus(item.menuList)}
      </SubMenu>
    );
  });
};

const Submenu = props => {
  return (
    <React.Fragment>
      <Menu
        theme="dark"
        defaultSelectedKeys={[history.location.pathname]}
        mode="inline"
        style={{ marginTop: 35 }}
      >
        {renderSubmenus(props.list, props.collapsed)}
        
        
      </Menu>
    </React.Fragment>
  );
};

export default Submenu;
