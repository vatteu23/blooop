import React, { Component } from "react";
import { Link } from "react-router-dom";

class CardButton extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="card h-100">
          <div className="card-body">
            <Link to={this.props.Link}>
              <h5 className="card-title">{this.props.Title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {this.props.Description}
              </h6>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CardButton;
