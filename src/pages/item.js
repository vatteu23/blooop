import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { act } from "@testing-library/react";

import {
  getGroups,
  getGroupsError,
  getGroupsPending,
} from "../js/reducers/groupsReducer";
import fetchGroups from "../js/actioncreators/getGroups";

import {
  getItemByParam,
  getItemByParamError,
  getItemByParamPending,
} from "../js/reducers/itemByParamReducer";

import fetchItemByParam from "../js/actioncreators/getItemByParam";

const mapStateToProps = (state) => ({
  itemError: getItemByParamError(state),
  itemPending: getItemByParamPending(state),
  item: getItemByParam(state),
  groupsError: getGroupsError(state),
  groups: getGroups(state),
  groupsPending: getGroupsPending(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchItemByParam: fetchItemByParam,
      fetchGroups: fetchGroups,
    },
    dispatch
  );

class Item extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
      user: null,
    };
  }

  componentDidMount = () => {
    let param = {
      id: null,
      pagename: null,
    };
    if (this.props.location.id) {
      param.id = this.props.location.id;
      this.props.fetchItemByParam(param);
    } else {
      param.pagename = this.props.match.params.pagename;
      this.props.fetchItemByParam(param);
    }
  };

  getDate = (d) => {
    return new Date(d).toDateString();
  };

  getUser = (uid) => {};

  render() {
    let details = this.props.item;

    return (
      <React.Fragment>
        {this.props.item ? (
          <MetaTags>
            <title>{details.itemDetails.title}</title>
            <meta
              name="description"
              content={details.itemDetails.description}
            />
          </MetaTags>
        ) : null}

        <div className="container pages">
          {this.props.item ? (
            <div className="container">
              <div className="item-card card w-100">
                <div
                  className="item-card-image"
                  style={{
                    backgroundImage: `url(${details.itemDetails.image})`,
                  }}
                ></div>
                <div className="item-card-content">
                  <div className="item-card-title mt-5">
                    <h2>{details.itemDetails.title}</h2>
                  </div>
                  <div className="author-details">
                    <small>
                      {this.getDate(details.itemDetails.createdat)} by{" "}
                      {details.userName}
                    </small>
                  </div>
                  <div className="item-card-description mt-5 text-left">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: details.itemDetails.description,
                      }}
                    ></p>
                  </div>
                  <div className="item-card-youtube-video my-4 text-center">
                    <iframe
                      className="item-iframe"
                      src={details.itemDetails.url}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {details.itemDetails && details.itemDetails.tags ? (
                    <div className="item-tags">
                      {details.itemDetails.tags.map((res, i) => {
                        return <p key={i}>{details.tags[res].title}</p>;
                      })}
                    </div>
                  ) : null}

                  <div className="item-support-us d-flex flex-row justify-content-center mb-3">
                    <a
                      target="_blank"
                      className="btn btn-subscribe"
                      href="https://www.youtube.com/channel/UCqY2-CXl85anDfQjZu0KS5Q?sub_confirmation=1"
                    >
                      SUBSCRIBE ON YOUTUBE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
