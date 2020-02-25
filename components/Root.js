import React from 'react';
import { Nav } from 'react-bootstrap';

const Root = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <ul className="navbar-nav bg-gradient-dark sidebar sidebar-dark">
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
          <div className="sidebar-brand-icon"><i className="fad fa-terminal" /></div>
          <div className="sidebar-brand-text mx-3">Data-Vis Playground</div>
        </a>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Sakura</div>
        <li className="nav-item active">
          <Nav.Link href="/sakura">
            <i className="fad fa-flower-tulip" />
            <span className="sidebar-nav-link-title">Sakura Period Analysis</span>
          </Nav.Link>
        </li>
      </ul>
      <div style={{ width: '100%' }}>
        {children}
      </div>
    </div>
  )
}

export default Root;
