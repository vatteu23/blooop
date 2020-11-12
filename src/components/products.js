import React, { useState, useEffect } from "react";

export default function Products() {
  const [data, setData] = useState([]);

  


  return (
    <div className="content container mt-3">
      <div className="about-text d-flex flex-wrap align-content-center">
        <h2 className="gradient-text">Website Design & Development Services</h2>
        <h4 className="theme-color-hover text-left">
          Our team builds the websites by including
         core values of your business and add all the 
         neccesary features to build a stunning website.</h4></div>
    </div>
  );
}