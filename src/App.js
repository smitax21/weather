import Header from "./Components/Header/Header.jsx";
import WeatherCard from "./Components/WeatherCard/WeatherCard.jsx";
import "./App.css";
import { useState, useEffect } from "react";

const APIkey = process.env.REACT_APP_API_KEY;

function App() {
  const [location, setLocation] = useState({
    lat: 53.38,
    lon: -1.47,
  });

  // Current day
  const [weatherCard, changeWeatherCard] = useState({
    date: "",
    picture: "",
    description: "",
    tempMax: "",
    tempMin: "",
    windSpeed: "",
  });
  const [forecastList, changeForecastList] = useState([]);

  const fetchWeather = async (lat, lon) => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}8&lon=${location.lon}&appid=${APIkey}`
    );
    let jsonResponse = await response.json();
    let items = await jsonResponse.list;
    // console.log(jsonResponse);
    // console.log(items);

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

    const item = items[0];
    let unixTimestamp = item.dt;
    let jsdate = new Date(unixTimestamp * 1000);
    const nameDay = days[jsdate.getDay(jsdate)];
    const month = months[jsdate.getMonth(jsdate)];
    const date = jsdate.getDate(jsdate);

    // convert kelvin to celcius
    let kelvinMax = item.main.temp_max;
    let maxTemp = Math.floor(kelvinMax - 273.15);
    let kelvinMin = item.main.temp_min;
    let minTemp = Math.floor(kelvinMin - 273.15);

    //convert icon code to image
    let iconcode = item.weather[0].icon;
    let iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";

    // sets one parsed obejct into the weatherCards stateVariable
    changeWeatherCard({
      date: date + "-" + month + "-" + nameDay,
      // date: jsonResponse.list[0].dt_txt,
      picture: iconURL,
      description: item.weather[0].description,
      tempMax: maxTemp,
      tempMin: minTemp,
      windSpeed: item.wind.speed,
    });

    // let arr = [1, 2, 3, 4];
    // let filteredArr = arr.filter((item, index) => {
    //   return item.dt > 10000;
    // });

    let parsedList = items.map((item, index) => {
      let unixTimestamp = item.dt;
      let jsdate = new Date(unixTimestamp * 1000);
      const nameDay = days[jsdate.getDay(jsdate)];
      const month = months[jsdate.getMonth(jsdate)];
      const date = jsdate.getDate(jsdate);

      // convert kelvin to celcius
      let kelvinMax = item.main.temp_max;
      let maxTemp = Math.floor(kelvinMax - 273.15);
      let kelvinMin = item.main.temp_min;
      let minTemp = Math.floor(kelvinMin - 273.15);

      //convert icon code to image
      let iconcode = item.weather[0].icon;
      let iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
      return {
        date: date + "-" + month + "-" + nameDay,
        // date: jsonResponse.list[0].dt_txt,
        picture: iconURL,
        description: item.weather[0].description,
        tempMax: maxTemp,
        tempMin: minTemp,
        windSpeed: item.wind.speed,
      };
    });
    changeForecastList(parsedList);
  };

  useEffect(() => {
    fetchWeather();
    // handleLocation();
  }, []);

  return (
    <div className="App">
      <Header location={location} />
      <div>
        <WeatherCard weatherCard={weatherCard} items={forecastList} />
      </div>
    </div>
  );
}

export default App;

// Parent needs to make the API calls,
// CHlidren need to receive the calls
// App.js: WIll make the initial call to get the default data:
//    Request to get the current days weather, get the 5 day forecast
//
//    function that will resend the request when the user changes the location
//        Passed down to the
//    Data Needs to be passed down to Weather Card

// to handle location dymanicly
// const handleLocation = async () => {
//   let london = document.getElementById("london").value;
//   let manchester = document.getElementById("manchester").value;
//   if (location === london) {
//     setLocation({
//       lat: 51.51,
//       lon: -0.12,
//     });
//     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${APIkey}`;
//     try {
//       let res = await fetch(url);
//       let data = await res.json();
//       console.log(data.city.coord.name);

//       fetchWeather(location.lat, location.lon);
//     } catch (error) {}
//   } else if (manchester) {
//     setLocation({
//       lat: 53.48,
//       lon: -2.24,
//     });
//     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${APIkey}`;
//     try {
//       let res = await fetch(url);
//       let data = await res.json();
//       console.log(data.city.coord.name);

//       fetchWeather(location.lat, location.lon);
//     } catch (error) {}
//   } else {
//     setLocation({
//       lat: 53.38,
//       lon: -1.47,
//     });

//     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${APIkey}`;
//     try {
//       let res = await fetch(url);
//       let data = await res.json();
//       console.log(data.city.coord.name);

//       fetchWeather(location.lat, location.lon);
//     } catch (error) {}
//     // console.log(location);
//   }
// };
// console.log(location);
