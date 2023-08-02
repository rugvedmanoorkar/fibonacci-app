import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./styles/Fibonacci.css";

const Fibonacci = () => {
  const { num } = useParams();
  const location = useLocation();
  const [fibNumbers, setFibNumbers] = useState([]);

  

  return (
    <div className="fibonacci-container">
      <h2>Fibonacci Numbers for {location.state.num} </h2>
      <p className="fibonacci-result">{fibNumbers.join(", ")}{location.state.fibNumbers}</p>
    </div>
  );
};

export default Fibonacci;
