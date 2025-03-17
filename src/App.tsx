import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Drivers from "./pages/Drivers";
import Vehicles from "./pages/Vehicles";
import About from "./pages/About";
import Menu from "./components/Menu";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="app-container flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
