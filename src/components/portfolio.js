import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { UPDATE_LOG } from "../js/actions/index";
import CardProject from "./cardproject";
import fetchProjectsAction from "../js/actioncreators/getProjects";
import {getProjectsError, getProjects, getProjectsPending, getProjectsOrderKeys} from "../js/reducers/projectsReducer";

const mapStateToProps = (state) => ({
  error: getProjectsError(state),
  projects: getProjects(state),
  pending: getProjectsPending(state),
  sortedKeys: getProjectsOrderKeys(state)
});


const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchProjects: fetchProjectsAction,
  updateLog : UPDATE_LOG
},dispatch);

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
 
  componentDidMount = () => {
    this.props.fetchProjects();
    document.title = "Portfolio | Uday Vatti";
    this.props.updateLog("PortfolioPage");
  };

  render() {
    return (
      <React.Fragment>
        <div className="content">
          <div className="container mt-4">
            <div className="d-flex flex-row flex-wrap justify-content-center">
            <h2 className="gradient-text align-self-center mr-md-auto mt-3 mb-0">Work and Projects</h2>
            <a className="btn btn-primary ml-md-auto mt-3 align-self-center" 
                href="https://firebasestorage.googleapis.com/v0/b/portfolio-react-f2bc7.appspot.com/o/pdfs%2FResume.pdf?alt=media&token=2e38a77f-9c75-47ca-b3d8-b8db21834f3f"
                target="_blank">
                
                  View Resume</a>
            </div>
            <div className="row mt-5">
              {this.props.projects.projects
                ? this.props.sortedKeys.map((id) => {
                    let data = this.props.projects.projects;
                    return (
                      <div className="col-12 col-sm-6 col-lg-4 my-3" key={id}>
                        <CardProject
                          title={data[id]["title"]}
                          url={data[id]["url"]}
                          backgroundImage={data[id]["image"]}
                          technologies={data[id]["technolgoies"]}
                          startdate={data[id]["startdate"]}
                          enddate={data[id]["enddate"]}
                          role={data[id]["role"]}
                        />
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
