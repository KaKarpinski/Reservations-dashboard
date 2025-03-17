import React from 'react';
import { NavLink } from "react-router";
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <NavLink to="/">
            <h1>Dashboard Rezerwacji Hotelowych</h1>
          </NavLink>
        </div>
        <div className="header-actions">
          <div className="date-display">
            {new Date().toLocaleDateString("pl-PL", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 