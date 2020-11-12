import React, { Component } from "react";
import { connect } from "react-redux";
import { UPDATE_LOG } from "../js/actions/index";
import { Link } from "react-router-dom";
import CardButton from "./cardbutton";
import { db } from "../firebase";
import {
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryLabel,
} from "victory";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    UPDATE_LOG: (PageName) => {
      dispatch(UPDATE_LOG(PageName));
    },
  };
};
class Report extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
      user: null,
    };
  }

  componentDidMount = () => {
    document.title = "Uday K Vatti | Web Developer";
    //this.props.UPDATE_LOG('HomePage');
    this.getData();
  };

  getStats = () => {
    let data = this.state.pagevisits;
    let databymonth, databyweek, databyday, title;
    databymonth = this.getDataByMonth(data);
    let tempGraphData = [],
      graphData = [];
    if (Object.keys(databymonth).length < 2) {
      databyweek = this.getDataByWeek(data);
      if (Object.keys(databyweek).length < 3) {
        databyday = this.getDataByDay(data);
        tempGraphData = databyday;
        title = "Website Visits By Day";
      } else {
        tempGraphData = databyweek;
        title = "Website Visits By Week";
      }
    } else {
      tempGraphData = databymonth;
      title = "Website Visits By Month";
    }

    Object.keys(tempGraphData).map((val) => {
      let temp = {};
      temp["x"] = val;
      temp["y"] = tempGraphData[val].length;
      graphData.push(temp);
    });
    this.setState({ visitsData: graphData, visitsTitle: title });
  };
  getDataByWeek = (data) => {
    let d;
    let byweek = {};
    Object.keys(data).map((index) => {
      d = new Date(data[index]["DateVisited"]);
      let weekNumber = this.getWeek(d);
      d = Math.floor(d.getTime() / (1000 * 60 * 60 * 24 * 7));
      byweek[weekNumber] = byweek[weekNumber] || [];
      byweek[weekNumber].push(data[index]);
    });

    return byweek;
  };

  getDataByMonth = (data) => {
    let d;
    let bymonth = {};
    Object.keys(data).map((index) => {
      d = new Date(data[index]["DateVisited"]);
      let monthyear = d.getMonth() + 1 + "-" + d.getFullYear();
      d = (d.getFullYear() - 1970) * 12 + d.getMonth();
      bymonth[monthyear] = bymonth[monthyear] || [];
      bymonth[monthyear].push(data[index]);
    });

    return bymonth;
  };

  getDataByDay = (data) => {
    let byday = {};
    Object.keys(data).map((index) => {
      let d = new Date(data[index]["DateVisited"]);
      var label = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
      d = Math.floor(d.getTime() / (1000 * 60 * 60 * 24));
      byday[label] = byday[label] || [];
      byday[label].push(data[index]);
    });

    return byday;
  };

  getWeek = (date) => {
    if (!(date instanceof Date)) date = new Date();

    // ISO week date weeks start on Monday, so correct the day number
    var nDay = (date.getDay() + 6) % 7;

    // ISO 8601 states that week 1 is the week with the first Thursday of that year
    // Set the target date to the Thursday in the target week
    date.setDate(date.getDate() - nDay + 3);

    // Store the millisecond value of the target date
    var n1stThursday = date.valueOf();

    // Set the target to the first Thursday of the year
    // First, set the target to January 1st
    date.setMonth(0, 1);

    // Not a Thursday? Correct the date to the next Thursday
    if (date.getDay() !== 4) {
      date.setMonth(0, 1 + ((4 - date.getDay() + 7) % 7));
    }

    // The week number is the number of weeks between the first Thursday of the year
    // and the Thursday in the target week (604800000 = 7 * 24 * 3600 * 1000)
    return 1 + Math.ceil((n1stThursday - date) / 604800000);
  };

  getViewsByPage = (data, PageName) => {

    let rows = Object.keys(data).filter((row, index) => { return data[row]["Page"] === PageName; })
    return rows.length;

  }

  getData = () => {
    let dref = db.ref("/pagevisitlogs");

    dref.orderByChild("title").once("value", (snapshot) => {
      if (snapshot) {
        this.setState({ pagevisits: snapshot.val() });
        let homepageviews = this.getViewsByPage(snapshot.val(), "HomePage");
        let portfolioviews = this.getViewsByPage(snapshot.val(), "PortfolioPage");
        let aboutviews = this.getViewsByPage(snapshot.val(), "AboutPage");
        let contactviews = this.getViewsByPage(snapshot.val(), "ContactPage")
        this.setState({
          homepageviews: homepageviews, portfolioviews: portfolioviews,
          aboutviews: aboutviews, contactviews: contactviews
        })
        this.getStats();
      }
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="content">
          <div className="container pages">
            <h2 className="gradient-text">Website Stats</h2>
            <div className="row ">
              <div className="col-12 flex-wrap justify-content-center mb-5 d-flex flex-row">
              <div className="card mx-2 report-card mb-2" style={{width: '175px'}}>
                  <div className="card-body ">
                    <h5 className="card-title report-views-title gradient-text">{this.state.homepageviews}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Home Views</h6>
                  </div>
                </div>
                <div className="card mx-2 report-card mb-2" style={{width: '175px'}}>
                  <div className="card-body">
                    <h5 className="card-title report-views-title gradient-text">{this.state.portfolioviews}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Portfolio Views</h6>
                  </div>
                </div>
                <div className="card mx-2 report-card mb-2" style={{width: '175px'}}>
                  <div className="card-body">
                    <h5 className="card-title report-views-title gradient-text">{this.state.aboutviews}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">About Views</h6>
                  </div>
                </div>
                <div className="card mx-2 report-card mb-2" style={{width: '175px'}}>
                  <div className="card-body">
                    <h5 className="card-title report-views-title gradient-text">{this.state.contactviews}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Contact Views</h6>
                  </div>
                </div>
              </div>
              <div className="col-12 justify-content-center col-md-8">
                {this.state.visitsData ? (
                  <div>
                    <VictoryChart
                      height={250}
                      animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 },
                      }}
                    >
                      <VictoryLabel
                        className="mb-3"
                        text={this.state.visitsTitle}
                        x={105}
                        y={12}
                        style={{ paddingTop: "20px" }}
                        textAnchor="middle"
                      />
                      <VictoryLine
                        style={{
                          data: { stroke: "#7d7d7d", background: "white" },
                        }}
                        data={this.state.visitsData}
                        labels={({ datum }) => datum.y}
                      />
                    </VictoryChart>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);
