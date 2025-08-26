import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SkillExchangeApp from "./Pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SkillExchangeApp />} />
      </Routes>
    </Router>
  );
}

export default App;
