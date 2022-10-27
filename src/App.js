import Header from "./Components/Header/Header.jsx";
import WeatherCard from "./Components/WeatherCard/WeatherCard.jsx";
import "./App.css";
import { useState, useEffect } from "react";

const APIkey = process.env.REACT_APP_API_KEY;

function App() {
  const [location, setLocation] = useState({
    lat: "",
    lon: "",
  });

  const [weatherCards, createCards] = useState({
    date: "",
    picture: "",
    description: "",
    tempMax: "",
    tempMin: "",
    windSpeed: "",
  });

  const fetchWeather = async () => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=53.38&lon=-1.47&appid=${APIkey}`
    );
    let jsonResponse = await response.json();
    console.log(jsonResponse);

    // convert the date
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let unixTimestamp = jsonResponse.list[0].dt;
    let jsdate = new Date(unixTimestamp * 1000);
    const nameDay = days[jsdate.getDay(jsdate)];
    const month = months[jsdate.getMonth(jsdate)];
    const date = jsdate.getDate(jsdate);

    // convert kelvin to celcius
    let kelvinMax = jsonResponse.list[0].main.temp_max;
    let maxTemp = Math.floor(kelvinMax - 273.15);
    let kelvinMin = jsonResponse.list[0].main.temp_min;
    let minTemp = Math.floor(kelvinMin - 273.15);

    //convert icon code to image
    let iconcode = jsonResponse.list[0].weather[0].icon;
    let iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";

    createCards({
      date: date + "-" + month + "-" + nameDay,
      picture: iconURL,
      description: jsonResponse.list[0].weather[0].description,
      tempMax: maxTemp,
      tempMin: minTemp,
      windSpeed: jsonResponse.list[0].wind.speed,
    });
  };

  const getDatafor7days = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  // to handle location dymanicly
  const handleLocation = async () => {
    let london = document.getElementById("london").value;
    let sheffield = document.getElementById("sheffield").value;
    let manchester = document.getElementById("manchester").value;
    if (location === london) {
      let lat = 51.51;
      let lon = -0.12;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
      try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);

        getDatafor7days(lat, lon);
      } catch (error) {}
    } else if (manchester) {
      let lat = 53.48;
      let lon = -2.24;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
      try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);

        getDatafor7days(lat, lon);
      } catch (error) {}
    } else if (sheffield) {
      let lat = 53.38;
      let lon = -1.47;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
      try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);

        getDatafor7days(lat, lon);
      } catch (error) {}
    }
  };

  useEffect(() => {
    fetchWeather();
    getDatafor7days();
    handleLocation();
  }, []);

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
      <Header location={location} />
      <div>
        <WeatherCard weatherCards={weatherCards} />
      </div>
    </div>
  );
}

export default App;
