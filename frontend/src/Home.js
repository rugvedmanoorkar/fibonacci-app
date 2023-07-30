import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [num, setNum] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNum(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/fibonacci", {
        num
      });
      const fibNumbers = response.data.fib_numbers.join(", ");
      navigate(`/fibonacci/${num}`, {
        state: { num: num, fibNumbers: fibNumbers }
      });
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <div>
      <h1>Generate Fibonacci numbers </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter value of n:
          <input type="number" onChange={handleChange} required />
        </label>
        <button type="submit"> Generate </button>
      </form>
    </div>
  );
};

export default Home;
