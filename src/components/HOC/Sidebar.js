import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";

export default class Sidebar extends Component {
  state = { activeItem: "gamepad" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted pointing vertical style={{ height: "100vh" }}>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="messages"
          active={activeItem === "messages"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="friends"
          active={activeItem === "friends"}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}
