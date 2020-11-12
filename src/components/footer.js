import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithubSquare, FaEnvelope } from "react-icons/fa";


const Footer = () => {
  return (
    <React.Fragment>
      <div className="footer mt-5">
        <div className="container">
          <div className="row ">
           
            <div className="col-12 text-center my-auto">
            <i className="theme-color-hover">
            I Create Beautiful Web Solutions. Get In Touch

            </i>
                  <a
                    href="https://www.linkedin.com/in/vattiu/"
                    className="ml-4 social"
                    target="_blank"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://github.com/vatteu23"
                    className="ml-4 social"
                    target="_blank"
                  >
                    <FaGithubSquare />
                  </a>
                  <a
                    href="mailto:vuday23@gmail.com?subject=Getting in touch"
                    className="ml-4 social"
                    target="_blank"
                  >
                    <FaEnvelope />
                  </a>
            </div>
            <div className="col-12">
              
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;