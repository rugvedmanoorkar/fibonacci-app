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

  const handleChange = (e) => {
    setNum(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/fibonacci`, {
        num: parseInt(num) 
      });

      const fibNumbersResponse = response.data.fib_numbers;
      if (fibNumbersResponse) {
        setFibNumbers(fibNumbersResponse);
        console.log(fibNumbersResponse)
        navigate(`/fibonacci`, {
          state: { num: parseInt(num), fibNumbers: fibNumbersResponse }
        });
      } else {
        console.error("Invalid response:", response.data);
        toast.error("Invalid response");
      }
    } catch (error) {
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
