import React from "react";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";

class iAugTable extends React.Component {
  renderTableHeader = () => {
    return this.props.tableData.tableHeaders.map((headerName, i) => {
      return <Table.HeaderCell key={i}>{headerName}</Table.HeaderCell>;
    });
  };

  renderTableRow = () => {

    
    return (
      <Table.Row>
        <Table.Cell collapsing>
          <Checkbox slider />
        </Table.Cell>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>September 14, 2013</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
    );
  };

  render() {
    return (
      <div className="ui container">
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>{this.renderTableHeader()}</Table.Row>
          </Table.Header>

          <Table.Body>{this.renderTableRow()}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default iAugTable;
