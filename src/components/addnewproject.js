import React, { Component } from "react";
import {db, fbStorage} from '../firebase';
import FileUploader from "react-firebase-file-uploader";
import {Link} from 'react-router-dom';
import CardButton from './cardbutton';


class AddNewProject extends Component {
    constructor() {
        super();
        this.state = {
          loading: true,
          authenticated: false,
          user: null
        }
      };

    componentDidMount = () => {
        document.title = "Add New Project";
        //this.props.UPDATE_LOG('HomePage')
    }


    handleAddNewProject = (title,description,url,technolgoies,role,startdate,enddate,order,image)=>{
       
       if(title && description && url && technolgoies && role && startdate && enddate && order && image){

        const projectID = db.ref('/projects').push();
        projectID.set({
            DateCreated: Date.now(),
            title:title,
            description:description,
            url:url,
            technolgoies:technolgoies,
            role:role,
            startdate:startdate,
            enddate:enddate,
            sort:order,
            image:image
        },
        function(error){
            if(error){
                console.log('Unable to save data');
                
            }else{
                alert("Added New Project!!")
            }
        }
        );

       }else{
           console.log('update fields')
       }
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleProgress = progress => {
      this.setState({ progress: progress });
    }
  
    handleUploadError = error => {
      this.setState({ isUploading: false });
      alert(error);
    };
  
    handleUploadSuccess = filename => {
      this.setState({ avatar: filename, progress: 100, isUploading: false });
      fbStorage.ref("images").child(filename).getDownloadURL().then(url => this.setState({ avatarURL: url, project_image : url }));
    };
  
    updateState = (e) => {
        this.setState({ [e.target.id] : e.target.value  })
    }

    render() {
        return (
            <React.Fragment>
                <div className="content">
                    <div className="container pages">
                        
                        <div className="row">
                            <div className="col-12">
                            <h2 className="text-left theme-color-hover mb-5">Add New Project</h2>
                            </div>
                            <div className="col-12 text-left">
                                <div className="form-group">
                                    <label htmlFor="project_title">Title</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.project_title} id="project_title" placeholder="Project Title "
                                        onChange={this.updateState} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="project_description">Description</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.project_description} id="project_description" placeholder="Project Description "
                                        onChange={this.updateState} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="project_link">Website URL/ Project URL</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.project_link} id="project_link" placeholder="URL "
                                        onChange={this.updateState} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="project_technology">Technologies Used</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.project_technology} id="project_technology" placeholder="Technologies Used "
                                        onChange={this.updateState} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="project_role">Role</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.project_role} id="project_role" placeholder="Role "
                                        onChange={this.updateState} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="project_startdate">Start Date</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.project_startdate} id="project_startdate" placeholder="Start Date "
                                        onChange={this.updateState} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="project_enddate">End Date</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.project_enddate} id="project_enddate" placeholder="End Date "
                                        onChange={this.updateState} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="project_ordernumber">Order Number</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.project_ordernumber} id="project_ordernumber" placeholder="Order number  "
                                        onChange={this.updateState} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="project_image">Image / Screenshot</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.project_image} id="project_image" placeholder="Project Image "
                                        onChange={this.updateState} />
                                </div>

                                <button onClick={() => this.handleAddNewProject(
                                    this.state.project_title,
                                    this.state.project_description,
                                    this.state.project_link,
                                    this.state.project_technology,
                                    this.state.project_role,
                                    this.state.project_startdate,
                                    this.state.project_enddate,
                                    this.state.project_ordernumber,
                                    this.state.project_image)} className="btn btn-primary">SUBMIT</button>

                            </div>
                        
                            <div className="col-12 mt-5">
                                <h5>Upload Image here</h5>

                                {this.state.isUploading &&

                                    <div className="progress-bar" role="progressbar" style={{ width: this.state.progress + '%' }} aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100">{this.state.progress}</div>

                                }
                                {this.state.avatarURL &&
                                    <div className="uploaded image">
                                        <label>Image:</label>
                                        <a target="_blank" rel="noopener  noreferrer" href={this.state.avatarURL}><img alt="new" className="img img-fluid" src={this.state.avatarURL} /></a>
                                    </div>
                                }
                                <FileUploader
                                    accept="image/*"
                                    name="avatar"
                                    storageRef={fbStorage.ref("images")}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                />
                            </div>

                        
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )

    }




};


export default AddNewProject;