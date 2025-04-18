import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
          Welcome to Medicare Mobile Clinic
          At Medicare Mobile Clinic, we bring quality healthcare directly to your doorstep. Our mission is to provide accessible, reliable, and compassionate medical services to communities in need. Equipped with modern technology and staffed by experienced healthcare professionals, we deliver primary care, diagnostics, and preventive services wherever you are.
          </p>
          <p>We are all in 2025!</p>
        
          <p>
          Bringing healthcare to your doorstep.
          At Medicare Mobile Clinic, we make medical care simple, accessible, and compassionate. Our mobile units are fully equipped and staffed by caring professionals—ready to deliver checkups, screenings, and treatments wherever you are. Quality care, on the move.
          At Medicare Mobile Clinic, we believe healthcare should have no boundaries. With mobility, innovation, and heart, we’re redefining how care reaches people—one community at a time.
          </p>
          
          <p>HEALTH IS WEALTH!</p>
        </div>
      </div>
    </>
  );
};

export default Biography;