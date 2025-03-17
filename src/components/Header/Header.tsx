import React from 'react';
import { Link } from "react-router";
import "./Header.css";
import Button from "../Button/Button";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <h1>Dashboard Rezerwacji Hotelowych</h1>
          </Link>
          <Link to="/add">
            <Button onClick={() => {}}>Dodaj rezerwację</Button>
          </Link>
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