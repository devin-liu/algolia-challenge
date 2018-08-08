import React from 'react';

const Sidebar = ({ children }) => {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        {children}
      </div>
    </nav>
  )
}

export default Sidebar
