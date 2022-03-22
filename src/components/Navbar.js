import React from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" href="#">
            certifi.em
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
              <Link to='/' className='nav-links'>
                Home
              </Link>
              </li>
              <li class="nav-item">
              <Link to='/generate' className='nav-links'>
                Generate
              </Link>
              </li>
              <li class="nav-item">
              <Link to='/verify' className='nav-links'>
                Verify
              </Link>
              </li>
              <li class="nav-item">
              <Link to='/download' className='nav-links'>
                Download
              </Link>
              </li>
            </ul>
            <form class="d-flex">
              <button class="btn btn-outline-success" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
