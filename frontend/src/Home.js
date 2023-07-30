import React, { useState } from "react";

const Home = () => {
  const [num, setNum] = useState("");

  const handleChange = (e) => {
    setNum(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        console.log(num)
    }
    catch(error){
        console.error(error);
    }
  }
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
