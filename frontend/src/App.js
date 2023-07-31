import "./App.css";
import Fibonacci from "./Fibonacci";
import Home from "./Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/fibonacci" element={<Fibonacci />} />
        </Routes>
      </Router>
      ,
    </div>
  );
}

export default App;
