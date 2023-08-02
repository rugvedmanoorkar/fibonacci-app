import "./App.css";
import Fibonacci from "./Fibonacci";
import Header from "./Header";
import Home from "./Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";





function App() {
  return (
    <div className="App">
      
      <Router>
      <Header />
        <div className="container-full">
          <div className="row">
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/fibonacci" element={<Fibonacci />} />
        </Routes>
        </div></div>
      </Router>
      
    </div>
  );
}

export default App;
