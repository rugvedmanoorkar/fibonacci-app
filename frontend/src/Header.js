import React from "react";
import { Link } from "react-router-dom";

import './styles/Header.css'
const Header = () => {
  return (
    
    <div class="navbar">
        <div class="container flex">
             <h1 class="logo"><a href="/home">Fibonacci.</a></h1>
            <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="https://en.wikipedia.org/wiki/Fibonacci_sequence">Information</a></li>
                    <li><a href="/">Docs</a></li>
                </ul>
            </nav>
        </div>
    </div>
  );
};

export default Header;
