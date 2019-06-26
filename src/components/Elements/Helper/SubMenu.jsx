import React from "react";
import { Menu, Icon } from "antd";

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

const SubMenu = props => {
  return (
    <React.Fragment>
      {renderSubmenus(props.list, props.collapsed)}
    </React.Fragment>
  );
};

export default SubMenu;
