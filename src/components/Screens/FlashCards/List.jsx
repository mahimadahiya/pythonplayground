import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  Card,
  Pagination,
  Row,
  Button,
  Divider,
  Popconfirm
} from "antd";
import { fetchFlashCardsList, deleteFlashCard } from "../../../actions";
import history from "../../../history";
import Filters from "../../Elements/Helper/Filters";

class FlashCardsList extends React.Component {
  state = {
    loading: true,
    searchText: "",
    flashcardmapping__entity_type: null,
    flashcardmapping__entity_id: null,
    offset: 0
  };

  componentWillMount = async () => {
    if (this.props.list.length === 0) {
      await this.props.fetchFlashCardsList(this.props.user.Authorization, {
        offset: 0,
        fields: {}
      });
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
    }
  };

  onEdit = record => {
    history.push("/flashcard/edit/" + record.id);
  };

  tableColumnName = () => {
    const column = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: "60%",
        render: text => {
          return <div style={{ minHeight: "60px" }}>{text}</div>;
        }
      },
      {
        title: "Actions",
        key: "action",
        width: 360,
        render: record => (
          <span>
            <Link to={`/flashcard/edit/${record.id}`}>Edit</Link>
            <Divider type="vertical" />
            <Popconfirm
              title="Delete"
              onConfirm={() => this.onDelete(record.id)}
            >
              <Button type="link">Delete</Button>
            </Popconfirm>
          </span>
        )
      }
    ];
    return column;
  };

  onDelete = async id => {
    this.setState({ loading: true });
    await this.props.deleteFlashCard(this.props.user.Authorization, {
      flash_card_id: id
    });
    await this.props.fetchFlashCardsList(this.props.user.Authorization, {
      offset: this.state.offset,
      fields: {
        flashcardmapping__entity_id: this.state.flashcardmapping__entity_id,
        flashcardmapping__entity_type: this.state.flashcardmapping__entity_type
      }
    });
    this.setState({ loading: false });
  };

  handlePageChange = async pageNumber => {
    const offset = pageNumber * 10 - 10;
    this.setState({ loading: true });
    const fields = {
      flashcardmapping__entity_id: this.state.flashcardmapping__entity_id,
      flashcardmapping__entity_type: this.state.flashcardmapping__entity_type
    };
    await this.props.fetchFlashCardsList(this.props.user.Authorization, {
      offset,
      searchText: this.state.searchText,
      fields
    });
    this.setState({ loading: false, offset });
  };

  onSearch = e => {
    this.setState(
      {
        searchText: e.target.value,
        loading: true
      },
      () => {
        setTimeout(async () => {
          const fields = {
            flashcardmapping__entity_id: this.state.flashcardmapping__entity_id,
            flashcardmapping__entity_type: this.state
              .flashcardmapping__entity_type
          };
          await this.props.fetchFlashCardsList(this.props.user.Authorization, {
            offset: 0,
            searchText: this.state.searchText,
            fields
          });
          this.setState({ loading: false });
        }, 1000);
      }
    );
  };

  clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }

  onEntityChange = value => {
    this.setState({
      flashcardmapping__entity_type: value
    });
  };

  onEntityIDChange = e => {
    this.setState({
      flashcardmapping__entity_id: e.target.value
    });
  };

  onFilterClick = async () => {
    const fields = {
      flashcardmapping__entity_id: this.state.flashcardmapping__entity_id,
      flashcardmapping__entity_type: this.state.flashcardmapping__entity_type
    };
    await this.props.fetchFlashCardsList(this.props.user.Authorization, {
      searchText: this.state.searchText,
      fields,
      offset: 0
    });

    this.setState({ loading: false });
  };

  fields = [
    {
      key: 1,
      type: "input",
      label: "Search by Name or ID",
      placeholder: "Search by Name or ID",
      onChange: this.onSearch
    },
    {
      key: 2,
      type: "select",
      label: "Entity Type",
      placeholder: "Filter by Entity Type",
      onChange: this.onEntityChange,
      options: [
        { value: null, label: "All" },
        { value: 1, label: "BM" },
        { value: 2, label: "FM" }
      ]
    },
    {
      key: 3,
      type: "input",
      label: "Entity ID",
      placeholder: "Entity ID",
      onChange: this.onEntityIDChange
    }
  ];

  render() {
    const columnName = this.tableColumnName();
    return (
      <div>
        <Card title={<div className="card-title">Filters</div>}>
          <Row>
            <Filters fields={this.fields} />
          </Row>

          <div style={{ textAlign: "right" }}>
            <Button
              onClick={this.onFilterClick}
              type="primary"
              shape="round"
              size="large"
              style={{ marginTop: 10, marginRight: 10 }}
            >
              Filter
            </Button>
          </div>
        </Card>
        <Card
          style={{ marginTop: 20 }}
          title={<div className="card-title">Flash Cards List</div>}
        >
          <Row>
            <Table
              loading={this.state.loading}
              dataSource={this.props.list}
              columns={columnName}
              rowKey={row => row.id}
              pagination={false}
            />
          </Row>
          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <Pagination
              onChange={this.handlePageChange}
              total={this.props.count}
              current={(this.state.offset + 10) / 10}
            />
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.flashcard.list,
    count: state.flashcard.count,
    user: state.userAuth
  };
};

export default connect(
  mapStateToProps,
  { fetchFlashCardsList, deleteFlashCard }
)(FlashCardsList);
