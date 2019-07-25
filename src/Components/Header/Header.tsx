import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <div className="header-content">
      <Link to="/">
        <img
          src="https://freighthub.com/wp-content/themes/freighthub/img/logo/logo.png"
          alt="logo"
        />
      </Link>
      <Link className="button" to="/viewShipments">
        View All Shipments
      </Link>
    </div>
  </div>
);

export default Header;
