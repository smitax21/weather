import Header from "./Components/Header/Header.jsx";
import WeatherCard from "./Components/WeatherCard/WeatherCard.jsx";
import "./App.css";
import { useState, useEffect } from "react";

const APIkey = process.env.REACT_APP_API_KEY;

function App() {
  const [location, setLocation] = useState({
    city: "",
    lat: "",
    lon: "",
  });

  const getDatafor7days = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  // to handle location dymanicly
  // const handleLocation = async () => {
  //   let london = document.getElementById("london").value;
  //   let sheffield = document.getElementById("sheffield").value;
  //   let manchester = document.getElementById("manchester").value;
  //   if (location === london) {
  //     let lat = 51.51;
  //     let lon = -0.12;
  //     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
  //     try {
  //       let res = await fetch(url);
  //       let data = await res.json();
  //       console.log(data);

  //       getDatafor7days(lat, lon);
  //     } catch (error) {}
  //   } else if (manchester) {
  //     let lat = 53.48;
  //     let lon = -2.24;
  //     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
  //     try {
  //       let res = await fetch(url);
  //       let data = await res.json();
  //       console.log(data);

  //       getDatafor7days(lat, lon);
  //     } catch (error) {}
  //   } else if (sheffield) {
  //     let lat = 53.38;
  //     let lon = -1.47;
  //     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
  //     try {
  //       let res = await fetch(url);
  //       let data = await res.json();
  //       console.log(data);

  //       getDatafor7days(lat, lon);
  //     } catch (error) {}
  // }
  // };

  // Parent needs to make the API calls,
  // CHlidren need to receive the calls
  // App.js: WIll make the initial call to get the default data:
  //    Request to get the current days weather, get the 5 day forecast
  //
  //    function that will resend the request when the user changes the location
  //        Passed down to the
  //    Data Needs to be passed down to Weather Card
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
