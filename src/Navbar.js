import React from 'react';

const Navbar = ({ value, handleChange }) => {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-md-2 mr-0" href="#">Algolia Challenge</a>
          <input
            className="form-control form-control-dark w-100"
            type="text"
            placeholder="Search"
            value={value}
            onChange={handleChange}
            aria-label="Search"/>
        </nav>
  )
}

export default Navbar
