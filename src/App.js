import Header from "./Components/Header/Header.jsx";
import WeatherCard from "./Components/WeatherCard/WeatherCard.jsx";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <WeatherCard />
      </div>
    </div>
  );
}

export default App;
