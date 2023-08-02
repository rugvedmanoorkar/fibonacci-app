import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles/Home.css'

const Home = () => {
  const [num, setNum] = useState("");
  const [fibNumbers, setFibNumbers] = useState([]);
  const navigate = useNavigate();

  // Function to handle changes in the input field
  const handleChange = (e) => {
    setNum(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server to calculate Fibonacci numbers
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/fibonacci`, {
        num: parseInt(num) 
      });

      const fibNumbersResponse = response.data.fib_numbers;
      if (fibNumbersResponse) {
        // If valid response received, update the state with Fibonacci numbers
        setFibNumbers(fibNumbersResponse);
        console.log(fibNumbersResponse)
        // Navigate to the 'Fibonacci' component with the calculated Fibonacci numbers
        navigate(`/fibonacci`, {
          state: { num: parseInt(num), fibNumbers: fibNumbersResponse }
        });
      } else {
        // If the response is invalid, display an error message and use toastify for notifications
        console.error("Invalid response:", response.data);
        toast.error("Invalid response");
      }
    } catch (error) {
      // Handle errors that may occur during the request and display an error message
      console.error("Error", error);
      toast.error("Error occurred");
    }
  };
  
  return (
    <div>
      <div className="home-wrapper">
        <div className="home-container" id="form">
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
      <ToastContainer />
    </div>
  );
};

export default Home;
