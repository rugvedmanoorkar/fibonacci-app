import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./styles/Fibonacci.css";

const Fibonacci = () => {
  const { num } = useParams();
  const location = useLocation();
  const [fibNumbers, setFibNumbers] = useState([]);

  useEffect(() => {
    // Check if 'fibNumbers' exists in the location state
    if (location.state && location.state.fibNumbers) {
      const fibNumbersValue = location.state.fibNumbers;
      // Get the value of 'fibNumbers' from the location state
      if (Array.isArray(fibNumbersValue)) {
        console.log(fibNumbersValue, typeof fibNumbersValue);
        // If 'fibNumbersValue' is an array, join the elements with a comma and set it in the state
        setFibNumbers(fibNumbersValue.join(", "));
      } else if (typeof fibNumbersValue === "string") { // If 'fibNumbersValue' is a string, split it by comma, trim each element, and join with a comma
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
