import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { act } from "@testing-library/react";

import {
  getGroups,
  getGroupsError,
  getGroupsPending,
} from "../js/reducers/groupsReducer";
import fetchGroups from "../js/actioncreators/getGroups";

import {
  getItems,
  getItemsError,
  getItemsPending,
} from "../js/reducers/itemsReducer";
import fetchItems from "../js/actioncreators/getItems";

const mapStateToProps = (state) => ({
  itemsError: getItemsError(state),
  items: getItems(state),
  itemsPending: getItemsPending(state),
  groupsError: getGroupsError(state),
  groups: getGroups(state),
  groupsPending: getGroupsPending(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchItems: fetchItems,
      fetchGroups: fetchGroups,
    },
    dispatch
  );

class Reviews extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
      user: null,
    };
  }

  componentDidMount = () => {
    document.title = "Reviews | BLoooP";
    this.props.fetchItems();
    this.props.fetchGroups();
  };

  render() {
    let items = this.props.items.items;
    return (
      <React.Fragment>
        <div className="container pages">
          {items ? (
            <div className="row">
              {Object.keys(items).map((id, index) => {
                return (
                  <div key={id} className="col-6">
                    <div className="review-card card h-100">
                      <img
                        src={items[id].image}
                        className="card-img-top"
                        alt={items[id].title}
                      />
                      <div className="card-body text-center">
                        <h2 className="review-card-title">{items[id].title}</h2>
                        <small>{items[id].createdat}</small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
