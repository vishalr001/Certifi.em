import React from 'react';
import './HeroSection.css';

function HeroSection (){
  return(
    <div className='hero-container'>
      <video src='/videos/video-3.mp4' autoPlay loop muted />
      {/* <img src='/images/img-home.jpg' /> */}
      <h2>
        CERTIFICATE ON BLOCKCHAIN
      </h2>
      <p>Create, Access, Authenticate Certificates</p>
    </div>
  );
}

export default HeroSection;