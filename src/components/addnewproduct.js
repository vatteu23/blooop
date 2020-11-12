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
        document.title = "Add New Product";
        //this.props.UPDATE_LOG('HomePage')
    }


    handleAddNewProject = (title,short_description,features,description,price,order,image)=>{
       
       if(title && short_description && features && description && price && order && image){

        const projectID = db.ref('/products').push();
        projectID.set({
            DateCreated: Date.now(),
            title:title,
            short_description:short_description,
            features: features,
            description:description,
            price: price,
            sort:order,
            image:image
        },
        function(error){
            if(error){
                console.log('Unable to save data');
                
            }else{
                alert("Added New Product!!")
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
                            <h2 className="text-left theme-color-hover mb-5">Add New Product</h2>
                            </div>
                            <div className="col-12 text-left">
                                <div className="form-group">
                                    <label htmlFor="product_title">Title</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.product_title} id="product_title" placeholder="Product Title "
                                        onChange={this.updateState} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="product_short_description">Short Description</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.product_short_description} id="product_short_description" placeholder="Product Short Description "
                                        onChange={this.updateState} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="product_features">Features</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.product_features} id="product_features" placeholder="Product Features Use HTML"
                                        onChange={this.updateState} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="product_price">Price</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.product_price} id="product_price" placeholder="Product Price"
                                        onChange={this.updateState} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="product_description">Description</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.product_description} id="product_description" placeholder="Product Description "
                                        onChange={this.updateState} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="product_ordernumber">Order Number</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.product_ordernumber} id="product_ordernumber" placeholder="Order number  "
                                        onChange={this.updateState} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="product_image">Image / Screenshot</label>
                                    <input type="text" className="form-control" 
                                    value={this.state.product_image} id="product_image" placeholder="product Image "
                                        onChange={this.updateState} />
                                </div>

                                <button onClick={() => this.handleAddNewProject(
                                    this.state.product_title,
                                    this.state.product_short_description,
                                    this.state.product_features,
                                    this.state.product_description,
                                    this.state.product_price,
                                    this.state.product_ordernumber,
                                    this.state.product_image)} className="btn btn-primary">SUBMIT</button>

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