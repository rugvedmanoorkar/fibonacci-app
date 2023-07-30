import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const Fibonacci = () => {
  const { num } = useParams();
  const location = useLocation();
  const [fibNumbers, setFibNumbers] = useState([]);

  // useEffect(() => {
  //   async function fetchFibonacciNumbers() {
  //     try {
  //       // const response = await fetch(`http://127.0.0.1:8000/fibonacci/${num}`);
  //       // const data = await response.json();
  //       setFibNumbers(data.fib_numbers);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchFibonacciNumbers();
  // }, [num]);

  return (
    <div>
      <h2>Fibonacci Numbers for {location.state.num} = {location.state.fibNumbers}</h2>
      <p>{fibNumbers.join(", ")}</p>
    </div>
  );
};

export default Fibonacci;
