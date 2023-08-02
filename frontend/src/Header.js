import React from "react";
import { Link } from "react-router-dom";

import './styles/Header.css'
const Header = () => {
  return (
    
    <header className="header">
      <nav>
        <ul className="nav-links">
          
          <li><a href="/home">Home</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
