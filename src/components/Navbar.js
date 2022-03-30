import React from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#">
           CERTIFI.EM
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link to='/' className='nav-links'>
                HOME
              </Link>
              </li>
              <li className="nav-item">
              <Link to='/generate' className='nav-links'>
                GENERATE
              </Link>
              </li>
              <li className="nav-item">
              <Link to='/verify' className='nav-links'>
                VERIFY
              </Link>
              </li>
              {/* <li class="nav-item">
              <Link to='/download' className='nav-links'>
                Download
              </Link>
              </li> */}
            </ul>
            {/* <form className="d-flex">
              <button className="btn btn-outline-success" type="submit">
                Login
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
