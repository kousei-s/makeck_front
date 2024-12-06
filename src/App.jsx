import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeSelection from "./pages/RecipeSelection";
import React from "react";

import './styles/header.css';
import './styles/RecipeSelection.css';


//親
function App() {
  return(
    
    <div className="App">
     
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/RecipeSelection" element={<RecipeSelection />} />

    </Routes>   </div>
  );
}

export default App