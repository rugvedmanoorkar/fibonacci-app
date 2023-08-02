import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import './styles/Home.css'

const Home = () => {
  const [num, setNum] = useState("");
  const [fibNumbers, setFibNumbers] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNum(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/fibonacci", {
        num: parseInt(num) // Parse the input string to an integer
      });

      const fibNumbersResponse = response.data.fib_numbers;
      if (fibNumbersResponse) {
        setFibNumbers(fibNumbersResponse);
        navigate(`/fibonacci`, {
          state: { num: parseInt(num), fibNumbers: fibNumbersResponse }
        });
      } else {
        console.error("Invalid response:", response.data);
      }
    } catch (error) {
      console.error("Error", error);
      // Add error handling here, e.g., show an error message to the user
    }
  };
  return (
    <div>
      <div className="wrapper">
        <div className="container" id="form">
          <h1>Generate Fibonacci numbers </h1>

          <form onSubmit={handleSubmit}>
            <label>
              Enter value of n:
              
            </label>
            <input type="number" onChange={handleChange} required min="1" />
            <button type="submit"> Generate </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
