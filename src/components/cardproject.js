import React, { Component } from "react";
import { Link } from 'react-router-dom';


class CardButton extends Component {
    constructor() {
        super();
        this.state = {

        }
    };

    render() {
        return (
            <React.Fragment>
                <a  target="_blank" href={this.props.url}>
                    <div className="h-100 card card-project" >
                        <div className="card-project-image-background"
                            style={{ backgroundImage: `url(${this.props.backgroundImage})` }}></div>
                        <div className="card-body text-left">
                            <h5 className="mb-0 card-title">{this.props.title}</h5>
                            <p className="card-text">
                                <b>{this.props.role}</b>
                            </p>
                            <small className="">
                                <b>Technologies Used:<br/>{this.props.technologies}</b>
                            </small>

                            <small className="mt-3 d-flex flex-row card-text">
                                <span><i>{this.props.startdate} to {this.props.enddate}</i></span>
                            </small>
                        </div>
                    </div></a>
            </React.Fragment>
        )

    }
};


export default CardButton;