import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
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

class Deals extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
      user: null,
      pageStart: 0,
      pageEnd: 6,
      pageLength: 6,
    };
  }

  componentDidMount = () => {
    document.title = "Reviews | BLoooP";
    this.props.fetchItems();
    this.props.fetchGroups();
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.items.items != nextProps.items.items) {
      this.setState({ itemsCount: Object.keys(nextProps.items.items).length });
      return true;
    } else if (this.state != nextState) {
      return true;
    } else {
      return false;
    }
  }

  getDate = (d) => {
    return new Date(d).toDateString();
  };

  pagePreviousClicked = () => {
    if (this.state.pageStart > 0) {
      this.setState({
        pageStart: this.state.pageStart - this.state.pageLength,
        pageEnd: this.state.pageEnd - this.state.pageLength,
      });
    }
  };

  pageNextClicked = () => {
    if (this.state.itemsCount > this.state.pageEnd) {
      this.setState({
        pageStart: this.state.pageStart + this.state.pageLength,
        pageEnd: this.state.pageEnd + this.state.pageLength,
      });
    }
  };

  render() {
    let items = this.props.items.items;
    let sorted = [];
    if (items)
      sorted = Object.keys(items).sort((a, b) => {
        return new Date(items[b].createdat) - new Date(items[a].createdat);
      });
    return (
      <React.Fragment>
        <div className="container pages">
          {items ? (
            <MetaTags>
              <title>Reviews | BLoooP</title>
              <meta
                name="description"
                content="I make quality videos about useful and quirky tech."
              />
            </MetaTags>
          ) : null}
          {items ? (
            <div className="row">
              {sorted
                .slice(this.state.pageStart, this.state.pageEnd)
                .map((id, index) => {
                  return (
                    <div key={id} className="col-12 col-md-6 mb-4">
                      <Link
                        to={{
                          pathname: `review/${items[id].pagename}`,
                          id: `${id}`,
                        }}
                      >
                        <div className="review-card card h-100">
                          <div
                            className="review-card-image"
                            style={{
                              backgroundImage: `url(${items[id].image})`,
                            }}
                          ></div>
                          <div className="card-body text-center">
                            <h2 className="review-card-title">
                              {items[id].title}
                            </h2>
                            <small className="text-muted">
                              {this.getDate(items[id].createdat)}
                            </small>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}

              <div className="col-12 d-flex">
                {this.state.pageStart > 0 ? (
                  <button
                    className="btn btn-primary btn-paging"
                    onClick={() => this.pagePreviousClicked()}
                  >
                    PREVIOUS
                  </button>
                ) : null}
                {this.state.pageEnd < this.state.itemsCount ? (
                  <button
                    className="btn btn-primary btn-paging ml-auto"
                    onClick={() => this.pageNextClicked()}
                  >
                    NEXT
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deals);
