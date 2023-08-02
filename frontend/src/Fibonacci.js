import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./styles/Fibonacci.css";

const Fibonacci = () => {
  const { num } = useParams();
  const location = useLocation();
  const [fibNumbers, setFibNumbers] = useState([]);

  useEffect(() => {
    if (location.state && location.state.fibNumbers) {
      const fibNumbersValue = location.state.fibNumbers;

      if (Array.isArray(fibNumbersValue)) {
        console.log(fibNumbersValue, typeof fibNumbersValue);
        setFibNumbers(fibNumbersValue.join(", "));
      } else if (typeof fibNumbersValue === "string") {
        console.log(fibNumbersValue, typeof fibNumbersValue);
        const splitArray = fibNumbersValue
          .split(",")
          .map((item) => item.trim());
        setFibNumbers(splitArray.join(", "));
      }
    }
  }, [location.state.fibNumbers]);

  return (
    <div className="fibonacci-container">
      <h2>Fibonacci Numbers for {location.state.num} </h2>

      <div className="fibonacci-result">
        {fibNumbers > 0 ? fibNumbers.join(", ") : fibNumbers}
      </div>
    </div>
  );
};

export default Fibonacci;
