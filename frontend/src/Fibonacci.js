import React,{ useEffect, useState } from 'react'

const Fibonacci = () => {

    const [fibNumbers, setFibNumbers] = useState([]);

  return (
    <div>
      <h2>Fibonacci Numbers for n = {"1, 2, 3"}</h2>
      <p>{fibNumbers.join(', ')}</p>
    </div>
  )
}

export default Fibonacci